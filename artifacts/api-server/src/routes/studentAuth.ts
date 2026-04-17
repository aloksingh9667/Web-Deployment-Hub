import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, studentsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { signStudentToken, requireStudentAuth } from "../lib/studentAuth.js";
import type { Request } from "express";
import type { StudentJwtPayload } from "../lib/studentAuth.js";
import { z } from "zod";

const router = Router();

const RegisterBody = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6),
  rollNumber: z.string().min(3),
  course: z.string().min(2),
  courseCode: z.string().min(2),
  enrollmentYear: z.string().min(4),
});

const LoginBody = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function generateRollNumber(course: string, year: string): string {
  const code = course.replace(/[^A-Z]/gi, "").toUpperCase().slice(0, 3);
  const ts = Date.now().toString().slice(-5);
  return `${code}${year.slice(-2)}${ts}`;
}

router.post("/register", async (req, res) => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body", details: parsed.error.issues });
    return;
  }
  const { name, email, phone, password, rollNumber, course, courseCode, enrollmentYear } = parsed.data;
  try {
    const [existing] = await db.select().from(studentsTable).where(eq(studentsTable.email, email)).limit(1);
    if (existing) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const [student] = await db.insert(studentsTable).values({
      name,
      email,
      phone,
      passwordHash,
      rollNumber,
      course,
      courseCode,
      enrollmentYear,
    }).returning();
    const token = signStudentToken({ studentId: student.id, email: student.email, rollNumber: student.rollNumber });
    res.status(201).json({
      token,
      student: { id: student.id, name: student.name, email: student.email, rollNumber: student.rollNumber, course: student.course },
    });
  } catch (err) {
    req.log.error({ err }, "Student register error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const { email, password } = parsed.data;
  try {
    const [student] = await db.select().from(studentsTable).where(eq(studentsTable.email, email)).limit(1);
    if (!student) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    if (student.status === "inactive" || student.status === "suspended") {
      res.status(403).json({ error: "Account is not active. Please contact administration." });
      return;
    }
    const valid = await bcrypt.compare(password, student.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    const token = signStudentToken({ studentId: student.id, email: student.email, rollNumber: student.rollNumber });
    res.json({
      token,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        rollNumber: student.rollNumber,
        course: student.course,
        courseCode: student.courseCode,
        enrollmentYear: student.enrollmentYear,
        semester: student.semester,
        status: student.status,
      },
    });
  } catch (err) {
    req.log.error({ err }, "Student login error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/me", requireStudentAuth, async (req, res) => {
  const student = (req as Request & { student?: StudentJwtPayload }).student!;
  try {
    const [user] = await db.select().from(studentsTable).where(eq(studentsTable.id, student.studentId)).limit(1);
    if (!user) {
      res.status(401).json({ error: "Student not found" });
      return;
    }
    const { passwordHash: _, ...safe } = user;
    res.json(safe);
  } catch (err) {
    req.log.error({ err }, "Student me error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, adminsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { AdminLoginBody } from "@workspace/api-zod";
import { signToken, requireAuth } from "../lib/auth.js";
import type { Request } from "express";
import type { JwtPayload } from "../lib/auth.js";

const router = Router();

router.post("/login", async (req, res) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const { username, password } = parsed.data;
  try {
    const [admin] = await db.select().from(adminsTable).where(eq(adminsTable.username, username)).limit(1);
    if (!admin) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }
    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }
    const token = signToken({ adminId: admin.id, username: admin.username, role: admin.role });
    res.json({
      token,
      user: { id: admin.id, username: admin.username, role: admin.role, name: admin.name },
    });
  } catch (err) {
    req.log.error({ err }, "Login error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", (_req, res) => {
  res.json({ message: "Logged out successfully" });
});

router.get("/me", requireAuth, async (req, res) => {
  const admin = (req as Request & { admin?: JwtPayload }).admin!;
  try {
    const [user] = await db.select().from(adminsTable).where(eq(adminsTable.id, admin.adminId)).limit(1);
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    res.json({ id: user.id, username: user.username, role: user.role, name: user.name });
  } catch (err) {
    req.log.error({ err }, "Get me error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

import bcrypt from "bcryptjs";
import { db, adminsTable, applicationsTable, contactsTable, careersTable } from "@workspace/db";
import { eq, count } from "drizzle-orm";
import { logger } from "./logger.js";

export async function seedDatabase() {
  try {
    const existingAdmins = await db.select().from(adminsTable).limit(1);
    if (existingAdmins.length === 0) {
      const passwordHash = await bcrypt.hash("admin123", 10);
      await db.insert(adminsTable).values([
        { username: "admin", passwordHash, name: "Administrator", role: "admin" },
        { username: "admissions", passwordHash: await bcrypt.hash("admissions123", 10), name: "Admissions Officer", role: "admissions_officer" },
      ]);
      logger.info("Created default admin users");
    }

    const existingApps = await db.select({ cnt: count() }).from(applicationsTable);
    if (Number(existingApps[0]?.cnt ?? 0) === 0) {
      await db.insert(applicationsTable).values([
        { name: "Rahul Sharma", email: "rahul@example.com", phone: "9876543210", course: "BBA", classType: "regular", status: "pending", message: "Interested in management studies" },
        { name: "Priya Gupta", email: "priya@example.com", phone: "9812345678", course: "BCA", classType: "regular", status: "reviewing", message: "Looking forward to IT career" },
        { name: "Amit Kumar", email: "amit@example.com", phone: "9765432101", course: "MBA", classType: "weekend", status: "accepted" },
        { name: "Sunita Singh", email: "sunita@example.com", phone: "9823456789", course: "B.Com", classType: "regular", status: "pending" },
        { name: "Deepak Patel", email: "deepak@example.com", phone: "9898989898", course: "BJMC", classType: "regular", status: "rejected" },
      ]);
      logger.info("Seeded sample applications");
    }

    const existingContacts = await db.select({ cnt: count() }).from(contactsTable);
    if (Number(existingContacts[0]?.cnt ?? 0) === 0) {
      await db.insert(contactsTable).values([
        { name: "Vikram Mehta", email: "vikram@example.com", phone: "9811234567", message: "Please share details about BBA program", course: "BBA", status: "new" },
        { name: "Kavya Joshi", email: "kavya@example.com", phone: "9877654321", message: "What is the fee structure for MCA?", course: "MCA", status: "read" },
        { name: "Rohan Tiwari", email: "rohan@example.com", phone: "9865432198", message: "How to apply for scholarship?", status: "replied" },
      ]);
      logger.info("Seeded sample contacts");
    }

    const existingCareers = await db.select({ cnt: count() }).from(careersTable);
    if (Number(existingCareers[0]?.cnt ?? 0) === 0) {
      await db.insert(careersTable).values([
        { name: "Dr. Neha Verma", email: "neha@example.com", phone: "9871234567", position: "Assistant Professor - Management", status: "reviewing" },
        { name: "Prof. Rajesh Kumar", email: "rajesh@example.com", phone: "9845678901", position: "Associate Professor - Computer Science", status: "pending" },
      ]);
      logger.info("Seeded sample career applications");
    }
  } catch (err) {
    logger.error({ err }, "Seed error");
  }
}

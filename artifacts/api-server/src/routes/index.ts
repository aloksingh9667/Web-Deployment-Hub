import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import applicationsRouter from "./applications.js";
import contactsRouter from "./contacts.js";
import careersRouter from "./careers.js";
import statsRouter from "./stats.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/applications", applicationsRouter);
router.use("/contacts", contactsRouter);
router.use("/careers", careersRouter);
router.use("/stats", statsRouter);

export default router;

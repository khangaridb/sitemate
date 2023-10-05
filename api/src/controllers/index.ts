import express from "express";

import issueRoutes from "./issue";

const router = express.Router();

router.use("/issue", issueRoutes);

export default router;

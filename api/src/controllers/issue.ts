import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import { issueService } from "../services";

const router = Router();

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
  const result = await issueService.createIssue({ ...req.body });

  return res.json({ result });
});

router.get("/:id", async (req: Request, res: Response) => {});

router.post("/update/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("ID", id);

  const result = await issueService.updateIssue(id, { ...req.body });

  return res.json({ result });
});

router.post("/remove/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  await issueService.removeIssue(id);

  return res.json({ result: true });
});

export default router;

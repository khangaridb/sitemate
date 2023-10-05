import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import { issueService } from "../services";

const router = Router();

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
  const result = await issueService.createIssue({ ...req.body });

  return res.json({ result });
});

router.get("/list", async (req: Request, res: Response) => {
  const { text } = req.query;

  const result = await issueService.getIssues(text as string);

  return res.json({ result });
});

router.post("/update/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await issueService.updateIssue(id, { ...req.body });

  return res.json({ result });
});

router.post("/remove/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  await issueService.removeIssue(id);

  return res.json({ result: "success" });
});

export default router;

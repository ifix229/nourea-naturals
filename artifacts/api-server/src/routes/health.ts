import { Router, type Request, type Response } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

const router = Router();

router.get("/healthz", (_req: Request, res: Response) => {
  try {
    const data = HealthCheckResponse.parse({ status: "ok" });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ status: "error" });
  }
});

export default router;

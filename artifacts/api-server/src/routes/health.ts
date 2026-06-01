import { Router, type Request, type Response } from "express";
import { z } from "zod";

const HealthCheckResponse = z.object({
  status: z.string(),
});

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

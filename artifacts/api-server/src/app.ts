import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import pinoHttpImport from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

// FIX: CJS/ESM compatibility for pino-http
const pinoHttp = (pinoHttpImport as any).default || pinoHttpImport;

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// optional health route (safe for deploy checks)
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

export default app;

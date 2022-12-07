import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { renderPage } from "vite-plugin-ssr";
import express, { NextFunction } from "express";
import compression from "compression";
import bodyParser from "body-parser";

import { router as apiRouter } from "./routes/api";
import { authenticatePbAdmin } from "./fx/authenticatePbAdmin";

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;

declare global {
  namespace Express {
    export interface Request {
      pbAdminToken: string;
    }
  }
}

startServer();

async function startServer() {
  const app = express();

  const jsonParser = bodyParser.json();

  app.use(compression());

  if (isProduction) {
    const sirv = require("sirv");
    app.use(sirv(`${root}/dist/client`));
  } else {
    const vite = require("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  const pbAdminToken = await authenticatePbAdmin();
  const pbAdminTokenInjector = (req: any, _: any, next: NextFunction) => {
    (req as any).pbAdminToken = pbAdminToken;
    next();
  };

  app.use("/api", jsonParser, pbAdminTokenInjector, apiRouter);

  app.use(express.static("public"));

  app.get("*", async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    const { body, statusCode, contentType, earlyHints } = httpResponse;
    if (res.writeEarlyHints)
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    res.status(statusCode).type(contentType).send(body);
  });

  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

import express, { Express } from "express";
import cors from "cors";
import { ENV, connectDB } from "@config";
import bodyParser from "body-parser";
import { globalErrorHandler } from "./middlewares/errorHandler.middleware";
import path from "path";
import router from "@routes";

const app: Express = express();

const port = ENV.PORT ?? 3000;

const startServer = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: `http://localhost:4200`,
      credentials: true,
    })
  );

  app.use("/public", express.static(path.join(__dirname, "public")));

  app.use("/api", router);

  app.use(globalErrorHandler);

  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server started at http://localhost:${port}`);
  });
};

startServer();

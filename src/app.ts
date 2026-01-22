import logger from "#config/logger.ts";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
const app = express();
app.use(helmet());
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.status(200).send("Hello to univault");
});

app.get("/healthy", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default app;

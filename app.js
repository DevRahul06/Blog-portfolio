import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";

import {errorMiddleware} from "./middlewares/erros.js"
import messageRouter from "./router/messageRouts.js"
import userRouter from "./router/userRouts.js"
import timelineRoute from "./router/timelineRoute.js"
import toolsApplications from "./router/ToolsApplicationRoute.js"


const app = express();
dotenv.config({ path: "./config/config.env" });

console.log(process.env.PORT);

app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRoute);
app.use("/api/v1/toolapplication", toolsApplications);



dbConnection();
app.use(errorMiddleware)

export default app;

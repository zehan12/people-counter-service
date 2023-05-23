import express, { Application, Request, Response } from "express";
import peopleRouter from "./routes/people";
import { runAnalytics } from "./opencv"

const app: Application = express();

runAnalytics();

app.use("/api/people",peopleRouter);

app.get("/",(req:Request, res:Response) => {
    res.end("backend");
})

export default app;
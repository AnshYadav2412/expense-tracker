import express from "express";
import cors from "cors";
import path from "path";
import connectDb from "./config/db.js";
import authRouter from "./routes/authRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello there");
});

connectDb();

app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

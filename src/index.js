 import express from "express";
import connectDatabase from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import newsRoute from "./routes/news.route.js";
import swaggerRoute from "./routes/swagger.route.cjs";

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDatabase()
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/", swaggerRoute);


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

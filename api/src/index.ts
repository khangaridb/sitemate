import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./mongoose";
import routes from "./controllers";

dotenv.config();
const { PORT, NODE_ENV } = process.env;

const app = express();

connectDb();

app.use(cors());

// Initializing body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initializing routes
app.use("/api", routes);

if (NODE_ENV !== "test") {
  app.listen(PORT ?? 5000, async () => {
    console.log(`server is running on  port ${PORT}`);
  });
}

export default app;

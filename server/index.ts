import express from "express";
import cors from "cors";
import usersRouter from "./routes/users";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

app.use(usersRouter);
// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

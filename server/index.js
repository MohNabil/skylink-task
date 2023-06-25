import express from "express";
import cors from "cors";
import usersRouter from "./routes/users";
import productsRouter from "./routes/products";
import "dotenv/config";
const app = express();
app.use(express.json());
app.use(cors());
// Middleware to authenticate API calls
export const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        next();
    }
    else {
        res.status(401).send("Unauthorized");
    }
};
app.use(usersRouter);
app.use(productsRouter);
// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});

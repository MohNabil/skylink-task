import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct, upload, } from "../controllers/products";
import multer from "multer";
const uploadImage = multer({ dest: "uploads/" });
const productsRouter = express.Router();
// Middleware to authenticate API calls
export const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (token && token === "Bearer mysecrettoken") {
        next();
    }
    else {
        res.status(401).send("Unauthorized");
    }
};
productsRouter.get("/products", authenticate, getAllProducts);
productsRouter.get("/products/:id", authenticate, getProductById);
productsRouter.delete("/products/:id", authenticate, deleteProduct);
productsRouter.put("/products/:id", authenticate, updateProduct);
productsRouter.post("/products", authenticate, addProduct);
productsRouter.post("/upload", authenticate, uploadImage.single("thumbnail"), upload);
export default productsRouter;

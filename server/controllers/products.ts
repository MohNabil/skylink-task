import { RequestHandler, Request, Response } from "express";
import { productSchema } from "../models/products";

// Example data for products
export let products = [
  {
    brand: "Apple",
    category: "smartphones",
    description: "An apple mobile which is nothing like apple",
    discountPercentage: 12.96,
    id: 1,
    price: 549,
    rating: 4.69,
    stock: 94,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    title: "iPhone 9",
  },
];
// Route to get all products
export const getAllProducts: RequestHandler = (req, res) => {
  res.json(products);
};

// Route to get a product by ID
export const getProductById: RequestHandler = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
};

// Route to delete a product by ID
export const deleteProduct: RequestHandler = (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.send("Product deleted");
};

// Route to update a product by ID
export const updateProduct: RequestHandler = (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    try {
      const {
        title,
        price,
        description,
        stock,
        rating,
        discountPercentage,
        thumbnail,
        brand,
        category,
      } = productSchema.parse(req.body);
      products[productIndex] = {
        id,
        title,
        price,
        description,
        stock,
        rating,
        discountPercentage,
        thumbnail,
        brand,
        category,
      };
      res.json(products[productIndex]);
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(404).send("Product not found");
  }
};

// Route to add a new product
export const addProduct: RequestHandler = (req, res) => {
  try {
    const {
      title,
      price,
      description,
      stock,
      rating,
      discountPercentage,
      thumbnail,
      brand,
      category,
    } = productSchema.parse(req.body);
    const id = products.length + 1;
    const product = {
      id,
      title,
      price,
      description,
      stock,
      rating,
      discountPercentage,
      thumbnail,
      brand,
      category,
    };
    products.push(product);
    res.json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Route to upload an image and return the URL
export const upload = (req: Request, res: Response) => {
  const url = `/uploads/${req?.file?.filename}`;
  res.json({ url });
};

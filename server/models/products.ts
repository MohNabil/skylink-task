import * as zod from "zod";
// Schema for validating product data
export const productSchema = zod.object({
  title: zod.string(),
  price: zod.number(),
  brand: zod.string(),
  category: zod.string(),
  description: zod.string(),
  discountPercentage: zod.number(),
  rating: zod.number(),
  stock: zod.number(),
  thumbnail: zod.string(),
  id: zod.number(),
});

export interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
  images: string[];
  brand: string;
  discountPercentage: number;
}

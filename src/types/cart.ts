import type  { Product } from "../api/api";

export type CartItem = {
    product: Product;
    quantity: number;
}
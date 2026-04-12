import { useContext,useState} from "react";
import { createContext } from "react";
import type { ReactNode } from "react";
import type { Product } from "../api/api";
import type { CartItem } from "../types/cart";

type CartContextType = {
     cartItems: CartItem[]
     addToCart: (product: Product) => void
     removeFromCart: (productId: number) => void
     increaseQuantity: (productId: number) => void
     decreaseQuantity: (productId: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

type CartProviderProps = {
    children: ReactNode;
  };


   function CartProvider({ children }: CartProviderProps){
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function addToCart(product: Product) {
        setCartItems((prev) => {
          const item = prev.find((cartItem) => cartItem.product.id === product.id)
      
          if (item) {
            return prev.map((existingItem) =>
              existingItem.product.id === product.id
                ? { ...existingItem, quantity: existingItem.quantity + 1 }
                : existingItem
            )
          }
      
          return [...prev, { product, quantity: 1 }]
        })
      }
      
     function removeFromCart(productId: number){
        setCartItems((prev) =>{
            return prev.filter((cartItem) => cartItem.product.id !== productId)
        })
        
     }

     function increaseQuantity(productId: number){
         setCartItems((prev) =>{
          return prev.map((existingItem) => existingItem.product.id === productId
          ?{...existingItem, quantity: existingItem.quantity + 1}
          :existingItem
        )
         })
     }

     function decreaseQuantity (productId: number){
        setCartItems((prev) =>{
         return prev
         .map((existingItem) => existingItem.product.id === productId
         ?{...existingItem, quantity: existingItem.quantity - 1}
         :existingItem)
         .filter((existingItem) => existingItem.quantity > 0)
        })
    }

    return(
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity}}>
        { children }
        </CartContext.Provider>
    )
}

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}


export {CartProvider, CartContext, useCart}
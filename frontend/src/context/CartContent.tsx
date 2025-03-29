import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

// This interface and context file helps management of cart
// included addtions, subtractions, and checkout (Which currently only clears cart until payment options are set up)
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookId === item.bookId);
      const updatedCart = prevCart.map((c) =>
        c.bookId === item.bookId
          ? {
              // Remember to update the subtotal and quantity of items already in the cart
              ...c,
              quantity: c.quantity + item.quantity,
              subTotal: c.subTotal + item.subTotal,
            }
          : c
      );
      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  //   Removes item by taking the current cart and filtering out the book we're deleting. Reassigns new list of cart objects
  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookId !== bookId));
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CarProvider");
  }
  return context;
};

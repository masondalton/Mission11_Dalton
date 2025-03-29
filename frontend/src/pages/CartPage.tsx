import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContent";
import { CartItem } from "../types/CartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart
    .reduce((sum, item: CartItem) => sum + item.subTotal, 0)
    .toFixed(2);

  // Added basic styling for the cart page to make it readable by bootstrap
  // Calcualted total based on subtotal that inclused quantity*price
  // Calls cart functions to remove, clear cart
  return (
    <div className="shadow p-5">
      <h2>Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li
                key={item.bookId}
                className="d-flex justify-content-between align-items-center p-2"
              >
                <span>
                  (Quantity: {item.quantity}) {item.title}: $
                  {item.price.toFixed(2)} for a total
                  <strong> ${item.subTotal.toFixed(2)}</strong>
                </span>
                <button
                  onClick={() => removeFromCart(item.bookId)}
                  className="btn btn-outline-danger ms-3"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: ${total} </h3>
      <button onClick={() => clearCart()} className="btn btn-outline-dark">
        Checkout
      </button>
      <br />
      <br />
      <button onClick={() => navigate("/")} className="btn btn-outline-success">
        Continue Shopping
      </button>
    </div>
  );
}

export default CartPage;

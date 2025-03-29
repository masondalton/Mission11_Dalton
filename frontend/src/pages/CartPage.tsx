import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContent";
import { CartItem } from "../types/CartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookId} className="">
                ({item.quantity}) {item.title}: ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: </h3>
      <button>Checkout</button>
      <br />
      <br />
      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );
}

export default CartPage;

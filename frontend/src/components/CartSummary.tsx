import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContent";

function CartSummary() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.subTotal, 0);
  const totalQuant = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    // Styling for the cart summary icon at the top right of the page
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "20px",
        background: "#f8f9fa",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2",
        fontSize: "16px",
      }}
      onClick={() => navigate("/cart")}
    >
      {/* Some basic presentation of the data in the cart */}
      🛒
      <strong>${totalAmount.toFixed(2)}&nbsp; </strong>
      Books: {totalQuant}
    </div>
  );
}

export default CartSummary;

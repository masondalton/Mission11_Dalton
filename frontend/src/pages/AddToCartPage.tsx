import { useNavigate, useParams } from "react-router-dom";
import WelcomeHead from "../components/WelcomeHead";
import { useCart } from "../context/CartContent";
import { CartItem } from "../types/CartItem";
import { useState } from "react";

function AddToCartPage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddTocart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || "No Book found",
      quantity,
      price: Number(price) || 0,
      subTotal: Number(price) * quantity,
    };
    addToCart(newItem);
    navigate("/cart");
  };

  return (
    <>
      <WelcomeHead />
      <h2>Add {title} to Cart?</h2>
      <div>
        <input
          type="number"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(x) => setQuantity(Number(x.target.value))}
          className="form-control mb-2"
        />
        <button onClick={handleAddTocart} className="me-2">
          Add to Cart
        </button>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </>
  );
}

export default AddToCartPage;

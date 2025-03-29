import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BookPage from "./pages/BookPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddToCartPage from "./pages/AddToCartPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContent";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BookPage />} />
          <Route
            path="/AddToCartPage/:title/:bookId/:price"
            element={<AddToCartPage />}
          />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

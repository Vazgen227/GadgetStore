import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export function Header() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((accumulator, items) => {
    return accumulator + items.quantity;
  }, 0);

  return (
    <header className="app-header">
      <Link to="/">
        <div>
          <h1>Élégance</h1>
          <p className="subtitle">Fragrance Boutique</p>
        </div>
      </Link>

      <Link to="/cart" className="cart-link">
        {totalItems}
      </Link>
    </header>
  );
}

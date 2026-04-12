import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  // Calculate totals
  const totalItems = cartItems.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);

  const totalPrice = cartItems.reduce((accumulator, item) => {
    return accumulator + item.product.price * item.quantity;
  }, 0);

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <p>Your sanctuary awaits</p>
          <p className="cart-empty-subtitle">Your cart is empty</p>
          <Link to="/" className="btn-continue">
            Explore Fragrances
          </Link>
        </div>
      </main>
    );
  }

  // Cart with items
  return (
    <main className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>
        
        <div className="cart-items">
          {cartItems.map((cartItem) => (
            <article key={cartItem.product.id} className="cart-item">
              {/* Product Image */}
              <div className="cart-item-image">
                <img src={cartItem.product.image} alt={cartItem.product.title} />
              </div>

              {/* Product Details */}
              <div className="cart-item-details">
                <h3 className="cart-item-title">{cartItem.product.title}</h3>
                <p className="cart-item-price">${cartItem.product.price}</p>
                <p className="cart-item-quantity">Quantity: {cartItem.quantity}</p>
              </div>

              {/* Quantity Controls */}
              <div className="cart-item-actions">
                <button
                  onClick={() => decreaseQuantity(cartItem.product.id)}
                  className="btn-quantity"
                  aria-label="Decrease quantity"
                >
                  <span>−</span>
                </button>

                <span className="quantity-display">{cartItem.quantity}</span>

                <button
                  onClick={() => increaseQuantity(cartItem.product.id)}
                  className="btn-quantity"
                  aria-label="Increase quantity"
                >
                  <span>+</span>
                </button>

                <button
                  onClick={() => removeFromCart(cartItem.product.id)}
                  className="btn-remove"
                  aria-label="Remove item"
                >
                  <span>Remove</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <div className="cart-summary-row">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="cart-summary-row cart-summary-total">
            <span>Total:</span>
            <span className="total-price">${totalPrice.toFixed(2)}</span>
          </div>
          
          <Link to="/" className="btn-continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default CartPage;

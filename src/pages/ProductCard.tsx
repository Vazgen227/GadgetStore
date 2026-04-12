import type { Product } from "../api/api";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">{product.price}</p>
        </div>
      </Link>
      
      <button 
        onClick={() => addToCart(product)}
        className="product-button"
      >
        Add to Cart
      </button>

    </article>
  );
}

export default ProductCard;
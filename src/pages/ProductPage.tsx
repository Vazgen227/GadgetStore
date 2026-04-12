import { useParams } from "react-router-dom";
import { getProductById } from "../api/api";
import { useState, useEffect } from "react";
import type { Product } from "../api/api";
import { useCart } from "../context/CartContext";

function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const selectedId = Number(id);
      setLoading(true);
      setError("");
      try {
        const selectedProduct = await getProductById(selectedId);
        setProduct(selectedProduct);
      } catch {
        setError("Error loading product");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading-container">Loading</div>;

  if (error) return <div className="error-container">{error}</div>;

  if (!product) return <div className="error-container">Product not found</div>;

  return (
    <main className="product-page">
      <div className="product-page-grid">

        {/* Image */}
        <div className="product-page-image">
          <img src={product.image} alt={product.title} />
        </div>

        {/* Info */}
        <div className="product-page-info">
          <p className="product-page-brand">{product.brand}</p>
          <h1 className="product-page-title">{product.title}</h1>
          <p className="product-page-category">{product.category}</p>
          <p className="product-page-price">${product.price}</p>

          <p className="product-page-description">{product.description}</p>

          {/* Fragrance Notes */}
          <div className="product-notes">
            <div className="note-group">
              <h3>Top Notes</h3>
              <ul>
                {product.notes.top.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
            <div className="note-group">
              <h3>Middle Notes</h3>
              <ul>
                {product.notes.middle.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
            <div className="note-group">
              <h3>Base Notes</h3>
              <ul>
                {product.notes.base.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          </div>

          <button
            className="product-page-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>

      </div>
    </main>
  );
}

export default ProductPage;
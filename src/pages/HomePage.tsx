import { useState, useEffect } from "react";
import { getProducts } from "../api/api";
import type { Product } from "../api/api";
import ProductCard from "./ProductCard";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchValue, setSearchValue] = useState<string>("");

  const categories = ["all", "Men's Fragrance", "Women's Fragrance", "Unisex Fragrance"];

  const categoryFilteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const visibleProducts =
    searchValue === ""
      ? categoryFilteredProducts
      : categoryFilteredProducts.filter((product) =>
          product.title.toLowerCase().includes(searchValue.toLowerCase())
        );

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts();
        setProducts(data.products);
      } catch {
        setError("Error loading products");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) return <div className="loading-container">Loading</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <main>
      <div className="products-container">

        {/* Page Title */}
        <div className="page-title">
          <h2>Our Collection</h2>
          <p>Handpicked luxury fragrances from the world's finest perfume houses</p>
        </div>

        {/* Filters + Search */}
        <div className="filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category === "all" ? "All" : category}
            </button>
          ))}

          <div className="search-wrapper">
            <input
              value={searchValue}
              type="text"
              placeholder="Search fragrances..."
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        {visibleProducts.length === 0 ? (
          <div className="loading-container" style={{ minHeight: "40vh" }}>
            No fragrances found
          </div>
        ) : (
          <div className="products-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default HomePage;
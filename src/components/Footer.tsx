import { Link } from "react-router-dom";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <h2>Élégance</h2>
          <p className="footer-tagline">Fragrance Boutique</p>
          <p>
            Curated luxury fragrances from the world's most prestigious perfume
            houses. Discover your signature scent.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">All Fragrances</Link></li>
            <li><Link to="/?category=men">Men's</Link></li>
            <li><Link to="/?category=women">Women's</Link></li>
            <li><Link to="/?category=unisex">Unisex</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div className="footer-col">
          <h4>Information</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:hello@elegance.com">hello@elegance.com</a></li>
            <li><a href="#">Live Chat</a></li>
            <li><a href="#">+1 (800) 555-0190</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {year} Élégance Fragrance Boutique. All rights reserved.</p>
        <div className="footer-socials">
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="Pinterest">Pinterest</a>
          <a href="#" aria-label="TikTok">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
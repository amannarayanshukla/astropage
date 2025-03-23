import { Slide } from "react-awesome-reveal";
import "./ProductCard.css";
import productImage from "../../assets/images/session-placeholder.png";
import { createImageUrl } from "../../utils";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Slide direction="up" delay={400} triggerOnce>
      <div className="product-card">
        <Link to={`/products/${product._id}`}>
          <img
            src={
              product.images.length > 0 &&
              product.images[0] !== "uploads/no-image.jpg"
                ? createImageUrl(product.images[0])
                : productImage
            }
            alt={product.name}
            className="product-card-image"
          />
          <h4 className="product-card-name">{product.name}</h4>
          <p className="product-card-variant">{product.variant}</p>
          <p className="product-card-price">${product.price}</p>
          <button className="product-card-btn">Add to cart</button>
        </Link>
      </div>
    </Slide>
  );
};

export default ProductCard;

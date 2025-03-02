/* eslint-disable react/prop-types */
import { Slide } from 'react-awesome-reveal';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Slide direction="up" delay={400} triggerOnce>
      <div className="product-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />
        <h4 className="product-card-name">{product.name}</h4>
        <p className="product-card-variant">{product.variant}</p>
        <p className="product-card-price">${product.price}</p>
        <button className="product-card-btn">Add to cart</button>
      </div>
    </Slide>
  );
};

export default ProductCard;

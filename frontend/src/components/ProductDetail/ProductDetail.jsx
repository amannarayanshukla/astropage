import { Slide } from 'react-awesome-reveal';
import ReactStars from 'react-rating-stars-component';
import breadCrumbArrowImage from '../../assets/svg/arrow-right.svg';
import Accordion from '../Accordion/Accordion';
import ImageGallery from '../ImageGallery/ImageGallery';
import './ProductDetail.css';
import { useState } from 'react';

const ProductDetail = ({
  name,
  price,
  description,
  rating,
  numberOfReviews,
  images = [], // Default empty array if not provided
  variants = [], // Default empty array if not provided
  shippingInfo, // TODO: Text that will be provided later or should be added in product
  details, // TODO: Text that will be provided later or should be added in product
  returnsInfo, // TODO: Text that will be provided later or should be added in product
}) => {
  const [activeVariant, setActiveVariant] = useState('');
  const accordionItems = [
    {
      title: 'Details',
      content: details,
    },
    {
      title: 'Shipping',
      content: shippingInfo,
    },
    {
      title: 'Returns',
      content: returnsInfo,
    },
  ];
  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-content">
          <div className="product-detail-left">
            <Slide direction="up" delay={100} triggerOnce>
              <ol className="breadcrumb">
                <li>
                  <a href="/products" className="breadcrumb-link">
                    Our Products
                  </a>
                </li>
                <li>
                  <img src={breadCrumbArrowImage} alt="" />
                </li>
                <li className="breadcrumb-link-item">{name}</li>
              </ol>
            </Slide>
            <Slide direction="bottom" delay={150} triggerOnce>
              <div className="product-detail-images">
                <ImageGallery images={images} />
              </div>
            </Slide>
            <Slide direction="up" delay={200} triggerOnce>
              <h1 className="product-detail-name">{name}</h1>
            </Slide>
            <Slide direction="up" delay={300} triggerOnce>
              <div className="product-detail-info">
                <p className="product-detail-price">${price}</p>
                <div className="product-detail-reviews">
                  <div className="product-detail-stars">
                    {' '}
                    <ReactStars
                      count={5}
                      value={rating}
                      size={18}
                      activeColor="#edff00"
                      isHalf={true}
                      edit={false}
                    />
                  </div>
                  <div className="product-detail-count">
                    <span>({rating} stars)</span> •{' '}
                    <span>({numberOfReviews} reviews)</span>
                  </div>
                </div>
              </div>
            </Slide>
            <Slide direction="up" delay={400} triggerOnce>
              <p className="product-detail-desc">{description}</p>
            </Slide>

            {variants.length > 0 && (
              <div className="product-detail-variants">
                <Slide direction="up" delay={500} triggerOnce>
                  <h5 className="product-detail-variant-title">Variants</h5>
                  <div className="product-detail-variants-actions">
                    {variants.map((variant, index) => (
                      <button
                        key={index}
                        className={`product-detail-variants-action ${
                          activeVariant === variant ? 'active' : ''
                        }`}
                        disabled={variant.disabled}
                        onClick={() => {
                          if (activeVariant === variant) {
                            setActiveVariant('');
                          } else {
                            setActiveVariant(variant);
                          }
                        }}
                      >
                        {variant}
                      </button>
                    ))}
                  </div>
                </Slide>
              </div>
            )}

            <div className="product-detail-actions">
              <Slide direction="up" delay={600} triggerOnce>
                <button className="product-detail-cart-btn">Add to cart</button>
              </Slide>
              <Slide direction="up" delay={600} triggerOnce>
                <button className="product-detail-buy-btn">Buy now</button>
              </Slide>
            </div>

            <Slide direction="up" delay={700} triggerOnce>
              <p className="product-detail-free">Free shipping over $50</p>
            </Slide>
            <div className="product-detail-accordion">
              <Accordion items={accordionItems} />
            </div>
          </div>
          <div className="product-detail-right">
            <Slide direction="up" delay={600} triggerOnce>
              <ImageGallery images={images} />
            </Slide>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

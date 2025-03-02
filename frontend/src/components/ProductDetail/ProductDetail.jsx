import './ProductDetail.css';
import breadCrumbArrowImage from '../../assets/svg/arrow-right.svg';
import avatarImage from '../../assets/images/avatar-placeholder.png';
import productImage from '../../assets/images/session-placeholder.png';
import ImageGallery from '../ImageGallery/ImageGallery';
import starImage from '../../assets/svg/star.svg';
import Accordion from '../Accordion/Accordion';
import { Slide } from 'react-awesome-reveal';

const imagesArray = [
  productImage,
  avatarImage,
  productImage,
  avatarImage,
  productImage,
  avatarImage,
];

const accordionItems = [
  {
    title: 'Details',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
  },
  {
    title: 'Shipping',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
  },
  {
    title: 'Returns',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
  },
];

const ProductDetail = () => {
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
                <li className="breadcrumb-link-item">Product Name</li>
              </ol>
            </Slide>
            <Slide direction="bottom" delay={150} triggerOnce>
              <div className="product-detail-images">
                <ImageGallery images={imagesArray} />
              </div>
            </Slide>
            <Slide direction="up" delay={200} triggerOnce>
              <h1 className="product-detail-name">Product name</h1>
            </Slide>
            <Slide direction="up" delay={300} triggerOnce>
              <div className="product-detail-info">
                <p className="product-detail-price">$125</p>
                <div className="product-detail-reviews">
                  <div className="product-detail-stars">
                    <img src={starImage} alt="" />
                    <img src={starImage} alt="" />
                    <img src={starImage} alt="" />
                    <img src={starImage} alt="" />
                    <img src={starImage} alt="" />
                  </div>
                  <div className="product-detail-count">
                    <span>(3.5 stars)</span> • <span>(3.5 stars)</span>
                  </div>
                </div>
              </div>
            </Slide>
            <Slide direction="up" delay={400} triggerOnce>
              <p className="product-detail-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                commodo diam libero vitae erat.
              </p>
            </Slide>

            <div className="product-detail-variants">
              <Slide direction="up" delay={500} triggerOnce>
                <h5 className="product-detail-variant-title">Variant</h5>
                <div className="product-detail-variants-actions">
                  <button className="product-detail-variants-action active">
                    Option one
                  </button>
                  <button className="product-detail-variants-action">
                    Option Two
                  </button>
                  <button className="product-detail-variants-action" disabled>
                    Option Three
                  </button>
                </div>
              </Slide>
            </div>

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
              <ImageGallery images={imagesArray} />
            </Slide>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

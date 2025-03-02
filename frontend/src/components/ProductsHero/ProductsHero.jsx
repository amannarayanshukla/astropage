import './ProductsHero.css';
import tarotImage from '../../assets/svg/tarot.svg';
import eventShapeLeft from '../../assets/svg/event-shape-left.svg';
import eventShapeRight from '../../assets/svg/event-shape-right.svg';
import { Slide } from 'react-awesome-reveal';

const ProductsHero = () => {
  return (
    <section className="products-hero">
      <div className="container">
        <div className="products-hero-content">
          <img
            src={tarotImage}
            alt=""
            className="products-hero-tarot floating"
          />
          <div className="products-hero-inner">
            <Slide direction="up" delay={200} triggerOnce>
              <h1 className="products-hero-title">Our Products</h1>
            </Slide>
            <Slide direction="up" delay={300} triggerOnce>
              <p className="products-hero-text">
                Lorem ipsum dolor sit vet, ipsum dolor sit vet ipsum dolor sit
                vetipsum dolor sit vetipsum dolor sit vet
              </p>
            </Slide>
          </div>
          <div className="products-hero-shape-wrapper">
            <img
              src={eventShapeRight}
              alt=""
              className="products-hero-shape-top floating"
            />
            <img
              src={eventShapeLeft}
              alt=""
              className="products-hero-shape-bottom floating"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsHero;

import ProductCard from '../ProductCard/ProductCard';
import './ProductsListing.css';
import productImage from '../../assets/images/session-placeholder.png';

const products = [
  {
    id: 1,
    name: 'Healing Crystals',
    variant: 'Amethyst',
    price: 125,
    image: productImage,
  },
  {
    id: 2,
    name: 'Meditation Cushion',
    variant: 'Blue Zen',
    price: 89,
    image: productImage,
  },
  {
    id: 3,
    name: 'Essential Oil Set',
    variant: 'Lavender & Peppermint',
    price: 45,
    image: productImage,
  },
  {
    id: 4,
    name: 'Yoga Mat',
    variant: 'Eco-friendly',
    price: 99,
    image: productImage,
  },
  {
    id: 5,
    name: 'Aroma Diffuser',
    variant: 'Wood Grain',
    price: 75,
    image: productImage,
  },
  {
    id: 6,
    name: 'Chakra Bracelet',
    variant: 'Multi-stone',
    price: 35,
    image: productImage,
  },
  {
    id: 7,
    name: 'Incense Sticks',
    variant: 'Sandalwood',
    price: 20,
    image: productImage,
  },
  {
    id: 8,
    name: 'Tibetan Singing Bowl',
    variant: 'Handcrafted',
    price: 150,
    image: productImage,
  },
  {
    id: 9,
    name: 'Herbal Tea Pack',
    variant: 'Organic',
    price: 40,
    image: productImage,
  },
  {
    id: 10,
    name: 'Guided Journal',
    variant: 'Mindfulness Edition',
    price: 30,
    image: productImage,
  },
  {
    id: 11,
    name: 'Sleep Mask',
    variant: 'Silk',
    price: 25,
    image: productImage,
  },
  {
    id: 12,
    name: 'Sound Therapy Chimes',
    variant: 'Deep Relaxation',
    price: 110,
    image: productImage,
  },
  {
    id: 13,
    name: 'Scented Candles',
    variant: 'Lavender & Rose',
    price: 50,
    image: productImage,
  },
  {
    id: 14,
    name: 'Meditation App Subscription',
    variant: '1-Year Access',
    price: 60,
    image: productImage,
  },
  {
    id: 15,
    name: 'Himalayan Salt Lamp',
    variant: 'Natural Shape',
    price: 70,
    image: productImage,
  },
  {
    id: 16,
    name: 'Massage Roller',
    variant: 'Wooden',
    price: 55,
    image: productImage,
  },
];

const ProductsListing = () => {
  return (
    <section className="products-listing">
      <div className="container">
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsListing;

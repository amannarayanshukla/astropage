import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ProductsHero from '../components/ProductsHero/ProductsHero';
import ProductsListing from '../components/ProductsListing/ProductsListing';

const Products = () => {
  return (
    <div className="products-wrapper">
      <Header />
      <ProductsHero />
      <ProductsListing />
      <Footer />
    </div>
  );
};

export default Products;

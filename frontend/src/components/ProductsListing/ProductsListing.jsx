/* eslint-disable react/prop-types */
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsListing.css";

const ProductsListing = (props) => {
  const { products } = props;
  console.log(products);
  return (
    <section className="products-listing">
      <div className="container">
        <div className="products-grid">
          {products?.data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsListing;

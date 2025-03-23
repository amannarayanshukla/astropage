import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ProductsHero from "../components/ProductsHero/ProductsHero";
import ProductsListing from "../components/ProductsListing/ProductsListing";
import apiClient from "../services/api/apiClient";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await apiClient("/products", "GET", null, false);
    return response;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      if (response.success) {
        setProducts(response);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-wrapper">
      <Header />
      <ProductsHero />
      <ProductsListing products={products} />
      <Footer />
    </div>
  );
};

export default Products;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import Footer from "../components/Footer/Footer";
import apiClient from "../services/api/apiClient";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient(`/products/${id}`, "GET");
        if (response.success) {
          setProduct(response.data);
        } else {
          setError("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("An error occurred while fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-wrapper">
      <ProductDetail
        name={product.name}
        price={product.price}
        description={product.description}
        rating={product.rating}
        numberOfReviews={product.numberOfReviews}
        images={product.images}
        variants={product.variant}
        shippingInfo={product.shipping}
        details={product.details}
        returnsInfo={product.returns}
      />
      <Footer />
    </div>
  );
};

export default Product;

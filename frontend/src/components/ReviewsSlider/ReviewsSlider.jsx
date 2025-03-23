import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ReviewsSlider.css";

import ReviewCard from "../ReviewCard/ReviewCard";
import apiClient from "../../services/api/apiClient";
import { useEffect, useState } from "react";

const ReviewsSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await apiClient("/reviews", "GET", null, false);
      if (response.success) {
        setReviews(response.data);
      }
      return response;
    } catch (error) {
      console.log(error);
      setError("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!reviews) return <div>Reviews not found</div>;
  return (
    <section className="reviews-slider container">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 3000 }}
        speed={700}
      >
        {reviews.map((review) => {
          return (
            <SwiperSlide key={review._id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default ReviewsSlider;

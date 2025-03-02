import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ReviewsSlider.css';

import ReviewCard from '../ReviewCard/ReviewCard';

const ReviewsSlider = () => {
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
        <SwiperSlide>
          <ReviewCard />
        </SwiperSlide>
        <SwiperSlide>
          <ReviewCard />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default ReviewsSlider;

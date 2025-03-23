import './ReviewCard.css';
import { Slide } from 'react-awesome-reveal';
import { createImageUrl } from '../../utils';
import ReactStars from 'react-rating-stars-component';

const ReviewCard = ({ review }) => {
  const starLength = Number(review.rating);
  console.log(starLength);
  return (
    <div className="review-card">
      <Slide direction="up" delay={100} triggerOnce>
        <div className="review-card-stars">
          <ReactStars
            count={5}
            value={review.rating}
            size={30}
            color="#cccccc"
            activeColor="#FFC107"
            isHalf={true}
            edit={false}
          />
        </div>
      </Slide>
      <Slide direction="up" delay={200} triggerOnce>
        <p className="review-card-text">{review?.description}</p>
      </Slide>
      <Slide direction="up" delay={200} triggerOnce>
        <div className="review-card-info">
          <div className="review-card-author">
            <img src={createImageUrl(review?.image)} alt="user_logo" />
            <div>
              <h6 className="review-card-name">{review?.userName}</h6>
              <p className="review-card-designation">
                {review?.designation}, {review?.company}
              </p>
            </div>
          </div>
          <div className="review-card-logo">
            <img src={createImageUrl(review.logo)} alt="company_logo" />
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default ReviewCard;

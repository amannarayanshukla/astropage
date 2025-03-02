import './ReviewCard.css';
import starImage from '../../assets/svg/star.svg';
import userImage from '../../assets/images/avatar-placeholder.png';
import logoImage from '../../assets/svg/logo-placeholder.svg';
import { Slide } from 'react-awesome-reveal';

const ReviewCard = () => {
  return (
    <div className="review-card">
      <Slide direction="up" delay={100} triggerOnce>
        <div className="review-card-stars">
          <img src={starImage} alt="" />
          <img src={starImage} alt="" />
          <img src={starImage} alt="" />
          <img src={starImage} alt="" />
          <img src={starImage} alt="" />
        </div>
      </Slide>
      <Slide direction="up" delay={200} triggerOnce>
        <p className="review-card-text">
          &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse varius enim in eros elementum tristique. Duis cursus, mi
          quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero
          vitae erat.&quot;
        </p>
      </Slide>
      <Slide direction="up" delay={200} triggerOnce>
        <div className="review-card-info">
          <div className="review-card-author">
            <img src={userImage} alt="" />
            <div>
              <h6 className="review-card-name">Marko Vukotic</h6>
              <p className="review-card-designation">CEO, M33</p>
            </div>
          </div>
          <div className="review-card-logo">
            <img src={logoImage} alt="" />
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default ReviewCard;

import InfiniteVerticalScroll from '../InfiniteVerticalScroll/InfiniteVerticalScroll';
import './SocialPosts.css';
import sunImage from '../../assets/svg/sun.svg';
import virgoImage from '../../assets/svg/virgo.svg';
import { Slide } from 'react-awesome-reveal';

const SocialPosts = () => {
  return (
    <div className="social-posts">
      <div className="container">
        <div className="social-posts-content">
          <div className="social-posts-info">
            <img
              src={sunImage}
              alt=""
              className="social-posts-image-top floating"
            />
            <Slide direction="up" delay={100} triggerOnce>
              <h2 className="social-posts-title">
                Check us out on Instagram and Youtube
              </h2>
            </Slide>
            <Slide direction="up" delay={200} triggerOnce>
              <p className="social-posts-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                commodo diam libero vitae erat.
              </p>
            </Slide>
            <Slide direction="up" delay={300} triggerOnce>
              <a href="#" className="social-posts-btn">
                Learn More
              </a>
            </Slide>
            <img
              src={virgoImage}
              alt=""
              className="social-posts-image-bottom floating"
            />
          </div>
          <div className="social-posts-scroller">
            <InfiniteVerticalScroll />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPosts;

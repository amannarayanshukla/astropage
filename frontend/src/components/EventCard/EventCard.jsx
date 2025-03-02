/* eslint-disable react/prop-types */
import './EventCard.css';
import { motion, useTransform } from 'framer-motion';

const EventCard = ({ event, progress, range, targetScale, openModal }) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div className="event-card-container">
      <motion.div
        className="event-card"
        style={{
          top: '80px',
          scale,
          transformOrigin: 'top',
        }}
      >
        <div className="event-card-info">
          <h6 className="event-card-tagline">{event.tagline}</h6>
          <h3 className="event-card-title">{event.title}</h3>
          <p className="event-card-text">{event.text}</p>
          <button onClick={openModal} className="event-card-btn">
            Learn More
          </button>
        </div>
        <div className="event-card-image">
          <img src={event.image} alt={event.title} />
        </div>
      </motion.div>
    </div>
  );
};

export default EventCard;

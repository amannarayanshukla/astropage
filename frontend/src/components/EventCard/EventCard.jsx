import "./EventCard.css";
import { motion, useTransform } from "framer-motion";
import EventPlaceholderImage from "../../assets/images/event-placeholder.png";
import { createImageUrl } from "../../utils";

const EventCard = ({ event, progress, range, targetScale, openModal }) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div className="event-card-container">
      <motion.div
        className="event-card"
        style={{
          top: "80px",
          scale,
          transformOrigin: "top",
        }}
      >
        <div className="event-card-info">
          {event?.tagLines.map((tag) => (
            <h6 className="event-card-tagline" key={tag}>
              {tag}
            </h6>
          ))}
          <h3 className="event-card-title">{event?.title}</h3>
          {event?.description.map((desc) => (
            <p className="event-card-text" key={desc}>
              {desc}
            </p>
          ))}
          <button onClick={() => openModal(event)} className="event-card-btn">
            Learn More
          </button>
        </div>
        <div className="event-card-image">
          <img
            src={
              event?.image !== null
                ? createImageUrl(event?.image)
                : EventPlaceholderImage
            }
            alt={event?.title}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default EventCard;

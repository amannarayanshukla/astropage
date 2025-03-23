import { createImageUrl } from "../../utils";
import "./EventCardMobile.css";
import EventPlaceholderImage from "../../assets/images/event-placeholder.png";

const EventCardMobile = ({ event, openModal }) => {
  return (
    <div className="event-card-mobile">
      <div className="event-card-mobile-info">
        {event?.tagLines.map((tag) => (
          <h6 className="event-card-mobile-tagline" key={tag}>
            {tag}
          </h6>
        ))}

        <h3 className="event-card-mobile-title">{event.title}</h3>
        {event.description.map((desc) => (
          <p className="event-card-mobile-text" key={desc}>
            {desc}
          </p>
        ))}
        <button
          onClick={() => openModal(event)}
          className="event-card-mobile-btn"
        >
          Learn More
        </button>
      </div>
      <div className="event-card-mobile-image">
        <img
          src={
            event.image !== null
              ? createImageUrl(event.image)
              : EventPlaceholderImage
          }
          alt={event.title}
        />
      </div>
    </div>
  );
};

export default EventCardMobile;

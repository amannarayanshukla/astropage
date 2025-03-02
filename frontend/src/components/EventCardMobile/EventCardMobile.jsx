/* eslint-disable react/prop-types */
import './EventCardMobile.css';

const EventCardMobile = ({ event, openModal }) => {
  return (
    <div className="event-card-mobile">
      <div className="event-card-mobile-info">
        <h6 className="event-card-mobile-tagline">{event.tagline}</h6>
        <h3 className="event-card-mobile-title">{event.title}</h3>
        <p className="event-card-mobile-text">{event.text}</p>
        <button onClick={openModal} className="event-card-mobile-btn">
          Learn More
        </button>
      </div>
      <div className="event-card-mobile-image">
        <img src={event.image} alt={event.title} />
      </div>
    </div>
  );
};

export default EventCardMobile;

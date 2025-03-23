import { useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Slide } from "react-awesome-reveal";
import eventShapeLeft from "../../assets/svg/event-shape-left.svg";
import eventShapeRight from "../../assets/svg/event-shape-right.svg";
import apiClient from "../../services/api/apiClient";
import EventCard from "../EventCard/EventCard";
import EventCardMobile from "../EventCardMobile/EventCardMobile";
import EventModal from "../EventModal/EventModal";
import "./Event.css";

const Event = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState({});

  function openModal(event) {
    setActiveEvent(event);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient("/events", "GET", null, false);
        if (response.success) {
          setEvents(response.data); // Make sure to access response.data
        }
      } catch (error) {
        console.error("Error fetching Events:", error);
      }
    };
    fetchEvents();
  }, []);

  const genericText = {
    title: "Our Training Events",
    description:
      "Discover our comprehensive training programs designed to help you achieve your fitness goals. From beginner to advanced levels, we offer personalized attention and expert guidance.",
    emptyStateMessage:
      "No Events available at the moment. Please check back later.",
    loadingMessage: "Loading available Events...",
    errorMessage: "Unable to load Eventss. Please try again later.",
  };
  return (
    <>
      <section className="event">
        <div className="container">
          <div className="event-content">
            <img
              src={eventShapeLeft}
              alt=""
              className="event-shape-left floating"
            />
            <Slide direction="up" delay={200} triggerOnce>
              <h2 className="event-title">{genericText.title}</h2>
            </Slide>
            <Slide direction="up" delay={300} triggerOnce>
              <p className="event-text">{genericText.description}</p>
            </Slide>
            <img
              src={eventShapeRight}
              alt=""
              className="event-shape-right floating"
            />
          </div>
          <div className="event-cloud" ref={container}>
            <div className="event-cards">
              {events.map((event) => {
                // Adjust the start of the transform so that it begins earlier
                const lowerBound = Math.max(0, event.id * 0.25 - 0.1);
                const targetScale = 1 - (events.length - event.id) * 0.1;
                return (
                  <EventCard
                    key={event.id}
                    event={event}
                    progress={scrollYProgress}
                    range={[lowerBound, 1]}
                    targetScale={targetScale}
                    openModal={openModal}
                  />
                );
              })}
            </div>
          </div>
          <div className="event-mobile">
            {events.map((event) => {
              return (
                <EventCardMobile
                  openModal={openModal}
                  key={event.id}
                  event={event}
                />
              );
            })}
          </div>
        </div>
      </section>
      {modalIsOpen && (
        <EventModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          event={activeEvent}
        />
      )}
    </>
  );
};

export default Event;

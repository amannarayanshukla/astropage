import EventCard from '../EventCard/EventCard';
import './Event.css';
import eventShapeLeft from '../../assets/svg/event-shape-left.svg';
import eventShapeRight from '../../assets/svg/event-shape-right.svg';
import eventImage from '../../assets/images//event-placeholder.png';
import { useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import { Slide } from 'react-awesome-reveal';
import EventCardMobile from '../EventCardMobile/EventCardMobile';
import EventModal from '../EventModal/EventModal';

const events = [
  {
    id: 1,
    tagline: 'Explore the Universe',
    title: 'Overnight Stargazing at Horizon Astronomical Society',
    text: 'Join us for an unforgettable night under the stars, exploring the wonders of the cosmos.',
    image: eventImage,
    link: '#',
  },
  {
    id: 2,
    tagline: 'Celestial Wonders',
    title: 'Lunar Eclipse Viewing Party',
    text: 'Experience the breathtaking beauty of a lunar eclipse with fellow astronomy enthusiasts.',
    image: eventImage,
    link: '#',
  },
  {
    id: 3,
    tagline: 'Discover the Night',
    title: 'Meteor Shower Magic',
    text: 'Watch as the sky lights up with a spectacular meteor shower this summer night.',
    image: eventImage,
    link: '#',
  },
  {
    id: 4,
    tagline: 'Astronomy Night',
    title: 'Star Gazing at the Observatory',
    text: 'Enjoy an evening of stargazing and deep space exploration at our local observatory.',
    image: eventImage,
    link: '#',
  },
];

const Event = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

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
              <h2 className="event-title">Upcoming Events</h2>
            </Slide>
            <Slide direction="up" delay={300} triggerOnce>
              <p className="event-text">
                Lorem ipsum dolor site vetLorem ipsum dolor site vetLorem ipsum
                dolor site vetLorem ipsum dolor site vetLorem ipsum dolor site
                vetLorem ipsum dolor site vetLorem ipsum dolor site vetLorem
              </p>
            </Slide>
            <img
              src={eventShapeRight}
              alt=""
              className="event-shape-right floating"
            />
          </div>
          <div className="event-cloud" ref={container}>
            <div className="event-cards">
              {events.map(event => {
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
            {events.map(event => {
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
        <EventModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      )}
    </>
  );
};

export default Event;

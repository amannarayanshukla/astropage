import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Session.css';
import sessionImage from '../../assets/images/session-placeholder.png';
import SessionModal from '../SessionModal/SessionModal';

const sessions = [
  {
    title: 'Healing',
    description:
      'Astrology is a powerful tool for personal growth and healing. By analyzing the position of the planets and stars at the time of a person’s birth, astrologers can gain insight into their personality traits, strengths, weaknesses, and life path.',
    list: [
      'Lorem ipsum dolor sit vet dolor ispad',
      'Lorem ipsum dolor sit vet dolor ispad',
    ],
    image: sessionImage,
  },
  {
    title: 'Spiritual Growth',
    description:
      "Spiritual growth helps individuals find inner peace and purpose in life. It involves mindfulness, meditation, and understanding one's deeper self.",
    list: ['Discover your true self', 'Enhance mental clarity'],
    image: sessionImage,
  },
  {
    title: 'Mindfulness',
    description:
      'Mindfulness practice helps in stress reduction and increasing overall well-being by focusing on the present moment with clarity and acceptance.',
    list: ['Reduce stress', 'Improve focus and awareness'],
    image: sessionImage,
  },
  {
    title: 'Spiritual Growth',
    description:
      "Spiritual growth helps individuals find inner peace and purpose in life. It involves mindfulness, meditation, and understanding one's deeper self.",
    list: ['Discover your true self', 'Enhance mental clarity'],
    image: sessionImage,
  },
  {
    title: 'Mindfulness',
    description:
      'Mindfulness practice helps in stress reduction and increasing overall well-being by focusing on the present moment with clarity and acceptance.',
    list: ['Reduce stress', 'Improve focus and awareness'],
    image: sessionImage,
  },
];

const Session = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const totalSections = sessions.length;
  const addOnSections = sessions.length + 1;
  const sessionWrapperHeight = `${addOnSections * 100}vh`;

  // Smoothly map scroll progress to active index
  const activeIndexTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalSections - 1]
  );

  useEffect(() => {
    return activeIndexTransform.onChange(value => {
      const newIndex = Math.floor(value); // Use Math.round for smoother transitions
      setActiveIndex(newIndex);
    });
  }, [activeIndexTransform]);

  return (
    <>
      <motion.div
        ref={sectionRef}
        className="session-wrapper"
        style={{ height: sessionWrapperHeight }}
      >
        <motion.div
          className="session"
          style={{ position: 'sticky', top: 0, height: '100vh' }}
        >
          <div className="container">
            <div className="session-content">
              {/* Left Content (Static + Dynamic) */}
              <div className="session-info">
                <div className="session-top">
                  <h2 className="session-top-title">Sessions</h2>
                  <p className="session-top-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla quam velit, vulputate eu pharetra nec, mattis ac
                    neque.
                  </p>
                </div>

                {/* Dynamic Content */}
                <motion.div
                  className="session-bottom"
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="session-bottom-title">
                    {sessions[activeIndex].title}
                  </h3>
                  <p className="session-bottom-text">
                    {sessions[activeIndex].description}
                  </p>
                  <ul className="session-bottom-list">
                    {sessions[activeIndex].list.map((item, idx) => (
                      <li key={idx} className="session-bottom-list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button onClick={openModal} className="session-btn">
                    Learn More
                  </button>
                </motion.div>
              </div>

              {/* Right Image Section */}
              <motion.div className="session-image">
                <motion.img
                  src={sessions[activeIndex].image}
                  alt={sessions[activeIndex].title}
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      {modalIsOpen && (
        <SessionModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      )}
    </>
  );
};

export default Session;

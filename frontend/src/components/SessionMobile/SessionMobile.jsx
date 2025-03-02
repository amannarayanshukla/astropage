import './SessionMobile.css';
import sessionImage from '../../assets/images/session-placeholder.png';
import SessionModal from '../SessionModal/SessionModal';
import { useState } from 'react';

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
];

const SessionMobile = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <section className="session-mobile">
        <div className="container">
          <div className="session-mobile-info">
            <div className="session-mobile-top">
              <h2 className="session-mobile-top-title">Sessions</h2>
              <p className="session-mobile-top-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                quam velit, vulputate eu pharetra nec, mattis ac neque.
              </p>
            </div>

            <div className="session-mobile-box">
              {sessions.map((session, index) => (
                <div key={index} className="session-mobile-item">
                  <div className="session-mobile-bottom">
                    <h3 className="session-mobile-bottom-title">
                      {session.title}
                    </h3>
                    <p className="session-mobile-bottom-text">
                      {session.description}
                    </p>
                    <ul className="session-mobile-bottom-list">
                      {session.list.map((item, idx) => (
                        <li
                          key={idx}
                          className="session-mobile-bottom-list-item"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button onClick={openModal} className="session-mobile-btn">
                      Learn More
                    </button>
                  </div>

                  <div className="session-mobile-image">
                    <img src={session.image} alt={session.title} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {modalIsOpen && (
        <SessionModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      )}
    </>
  );
};

export default SessionMobile;

import "./SessionMobile.css";
import sessionImage from "../../assets/images/session-placeholder.png";
import SessionModal from "../SessionModal/SessionModal";
import { useState } from "react";
import { createImageUrl } from "../../utils";

const SessionMobile = ({ sessions, genericText }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeSession, setActiveSession] = useState({});

  function openModal(session) {
    setActiveSession(session);
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
              <h2 className="session-mobile-top-title">{genericText?.title}</h2>
              <p className="session-mobile-top-text">
                {genericText?.description}
              </p>
            </div>

            <div className="session-mobile-box">
              {sessions &&
                sessions?.map((session, index) => (
                  <div key={index} className="session-mobile-item">
                    <div className="session-mobile-bottom">
                      <h3 className="session-mobile-bottom-title">
                        {session?.title}
                      </h3>
                      {session.description.map((desc) => (
                        <p className="session-mobile-bottom-text" key={desc}>
                          {desc}
                        </p>
                      ))}
                      <ul className="session-mobile-bottom-list">
                        {session?.tagLines.map((item, idx) => (
                          <li
                            key={idx}
                            className="session-mobile-bottom-list-item"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => openModal(session)}
                        className="session-mobile-btn"
                      >
                        Learn More
                      </button>
                    </div>

                    <div className="session-mobile-image">
                      <img
                        src={
                          session?.images.length > 0
                            ? createImageUrl(session.images[0])
                            : sessionImage
                        }
                        alt={session.title}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      {modalIsOpen && (
        <SessionModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          session={activeSession}
        />
      )}
    </>
  );
};

export default SessionMobile;

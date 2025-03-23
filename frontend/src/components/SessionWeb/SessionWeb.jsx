import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./SessionWeb.css";
import SessionModal from "../SessionModal/SessionModal";
import sessionImage from "../../assets/images/session-placeholder.png";
import { createImageUrl } from "../../utils";

const Session = ({ sessions, genericText }) => {
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
    offset: ["start start", "end end"],
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

  // Separate useEffect for handling scroll animation
  useEffect(() => {
    const unsubscribe = activeIndexTransform.onChange((value) => {
      setActiveIndex(Math.floor(value));
    });

    return () => {
      unsubscribe();
    };
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
          style={{ position: "sticky", top: 0, height: "100vh" }}
        >
          <div className="container">
            <div className="session-content">
              <div className="session-info">
                <div className="session-top">
                  <h2 className="session-top-title">{genericText?.title}</h2>
                  <p className="session-top-text">{genericText?.description}</p>
                </div>

                {/* Dynamic Content */}
                {sessions.length === 0 ? (
                  <div className="session-empty-state">
                    {genericText.emptyStateMessage}
                  </div>
                ) : (
                  <motion.div
                    className="session-bottom"
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="session-bottom-title">
                      {sessions[activeIndex]?.title}
                    </h3>
                    {sessions[activeIndex]?.description.map((desc) => (
                      <p className="session-bottom-text" key={desc}>
                        {desc}
                      </p>
                    ))}
                    <ul className="session-bottom-list">
                      {sessions[activeIndex]?.tagLines?.map((item, idx) => (
                        <li key={idx} className="session-bottom-list-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button onClick={openModal} className="session-btn">
                      Learn More
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Right Image Section */}
              <motion.div className="session-image">
                <motion.img
                  src={
                    sessions[activeIndex]?.images?.length > 0
                      ? createImageUrl(sessions[activeIndex]?.images[0])
                      : sessionImage
                  }
                  alt={sessions[activeIndex]?.title || "Training Session"}
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
        <SessionModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          session={sessions[activeIndex]}
        />
      )}
    </>
  );
};

export default Session;

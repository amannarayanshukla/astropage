import Modal from "react-modal";
import closeImage from "../../assets/svg/close.svg";
import "./EventModal.css";
import calendarImage from "../../assets/svg/calendar.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "96%",
    backgroundColor: "#ffffff",
    border: 0,
    padding: 0,
    maxHeight: "90dvh",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    zIndex: "10",
  },
};

const EventModal = ({ modalIsOpen, closeModal, event }) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button className="event-modal-close-btn" onClick={closeModal}>
          <img src={closeImage} alt="" />
        </button>
        <div className="event-modal-body">
          <div className="event-modal-left"></div>
          <div className="event-modal-right">
            <p className="event-modal-date">
              <img src={calendarImage} alt="" />
              {new Date(event?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="event-modal-title">{event?.title}</h2>
            <p className="event-modal-text">{event?.description}</p>
            <ul className="event-modal-list">
              {event?.tagLines.map((tag) => {
                return (
                  <li key={tag} className="event-modal-list-item">
                    {tag}
                  </li>
                );
              })}
            </ul>
            <div className="event-modal-actions">
              <a href="" className="event-modal-btn">
                Contact us
              </a>
              <button className="event-modal-btn">Book your place</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EventModal;

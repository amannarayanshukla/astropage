/* eslint-disable react/prop-types */
import Modal from 'react-modal';
import closeImage from '../../assets/svg/close.svg';
import './SessionModal.css';
import sessionImage from '../../assets/images/session-placeholder.png';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '96%',
    backgroundColor: '#FFDCBC',
    border: 0,
    padding: '10px',
    maxHeight: '90dvh',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    zIndex: '10',
  },
};

const SessionModal = ({ modalIsOpen, closeModal }) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button className="session-modal-close-btn" onClick={closeModal}>
          <img src={closeImage} alt="" />
        </button>
        <div className="session-modal-body">
          <div className="session-modal-left">
            <h2 className="session-modal-title">Healing </h2>
            <p className="session-modal-text">
              Lorem ipsum dolor site vetLorem ipsum dolor site vetLorem ipsum
              dolor site vetLorem ipsum dolor site vetLorem ipsum dolor site
              vetLorem ipsum dolor site vetLorem ipsum dolor site vetLorem
            </p>
            <p className="session-modal-text">
              Lorem ipsum dolor site vetLorem ipsum dolor site vetLorem ipsum
              dolor site vetLorem ipsum dolor site vetLorem ipsum dolor site
              vetLorem ipsum dolor site vetLorem ipsum dolor site vetLorem
            </p>
            <p className="session-modal-text">
              Lorem ipsum dolor site vetLorem ipsum dolor site vetLorem ipsum
              dolor site vetLorem ipsum dolor site vetLorem ipsum dolor site
              vetLorem ipsum dolor site vetLorem ipsum dolor site vetLorem
            </p>
            <ul className="session-modal-list">
              <li className="session-modal-list-item">
                Lorem ipsum dolor sit vet dolor ispad
              </li>
              <li className="session-modal-list-item">
                Lorem ipsum dolor sit vet dolor ispad
              </li>
              <li className="session-modal-list-item">
                Lorem ipsum dolor sit vet dolor ispad
              </li>
            </ul>
            <button className="session-modal-btn">Join the session</button>
          </div>
          <div className="session-modal-right">
            <img src={sessionImage} alt="" className="session-modal-main" />
            <img
              src={sessionImage}
              alt=""
              className="session-modal-main-right"
            />
            <img
              src={sessionImage}
              alt=""
              className="session-modal-main-left"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SessionModal;

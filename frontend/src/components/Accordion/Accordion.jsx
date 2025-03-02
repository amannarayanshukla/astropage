/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Accordion.css';
import plusImage from '../../assets/svg/plus.svg';
import minusImage from '../../assets/svg/minus.svg';

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = index => {
    setOpenIndex(prevIndex => (prevIndex === index ? -1 : index));
  };

  return (
    <div className="accordion-container">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <button
            className="accordion-button"
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
            aria-controls={`panel-${index}`}
          >
            {item.title}{' '}
            <span>
              {openIndex === index ? (
                <img src={minusImage} alt="" />
              ) : (
                <img src={plusImage} alt="" />
              )}
            </span>
          </button>
          <div
            id={`panel-${index}`}
            className={`accordion-content ${openIndex === index ? 'open' : ''}`}
            role="region"
            aria-hidden={openIndex !== index}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;

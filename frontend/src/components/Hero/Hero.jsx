import './Hero.css';
import powerIcon from '../../assets/svg/power-icon.svg';
import purposeIcon from '../../assets/svg/purpose-icon.svg';
import prosperityIcon from '../../assets/svg/prosperity-icon.svg';
import saturnImage from '../../assets/svg/saturn.svg';
import tarotImage from '../../assets/svg/tarot.svg';
import { motion } from 'framer-motion';
import { Slide } from 'react-awesome-reveal';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
          >
            Embrace your limitless potential and learn to play in the higher
            realm of what’s possible
          </motion.h1>
          <div className="hero-inner-content">
            <img src={saturnImage} className="hero-saturn-image spin" alt="" />
            <div className="hero-desc">
              <motion.h3
                className="hero-subtitle"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
              >
                Collapse time and quantum leap your ascension with Erin Lynos
              </motion.h3>

              <motion.a
                href="#"
                className="hero-btn"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              >
                Enter portal of possibility
              </motion.a>

              <motion.div
                className="hero-text"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              >
                Lorem ipsum dolor sit vet dolor ispad
              </motion.div>
            </div>
            <img
              src={tarotImage}
              className="hero-tarot-image floating"
              alt=""
            />
          </div>
          <div className="hero-cards">
            <Slide direction="up" delay={500} triggerOnce>
              <div className="hero-card">
                <img src={powerIcon} alt="" />
                <h3 className="hero-card-title">Power</h3>
                <p className="hero-card-text">
                  Lorem ipsum dolor site vetLorem ipsum dolor site vetLorem
                  ipsum
                </p>
              </div>
            </Slide>
            <Slide direction="up" delay={600} triggerOnce>
              <div className="hero-card">
                <img src={purposeIcon} alt="" />
                <h3 className="hero-card-title">Purpose</h3>
                <p className="hero-card-text">
                  Lorem ipsum dolor site vetLorem ipsum dolor site vetLorem
                  ipsum
                </p>
              </div>
            </Slide>
            <Slide direction="up" delay={700} triggerOnce>
              <div className="hero-card">
                <img src={prosperityIcon} alt="" />
                <h3 className="hero-card-title">Prosperity</h3>
                <p className="hero-card-text">
                  Lorem ipsum dolor site vetLorem ipsum dolor site vetLorem
                  ipsum
                </p>
              </div>
            </Slide>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

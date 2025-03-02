import saturnImage from '../../assets/svg/saturn-straight.svg';
import tarotImage from '../../assets/svg/tarot.svg';
import logoImage from '../../assets/svg/logo-placeholder.svg';
import instaImage from '../../assets/svg/insta.svg';
import ytImage from '../../assets/svg/youtube.svg';
import emailImage from '../../assets/svg/mail.svg';
import './Footer.css';
import { Slide } from 'react-awesome-reveal';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <img src={saturnImage} alt="" className="footer-left spin" />
          <div className="footer-middle">
            <Slide direction="up" delay={100} triggerOnce>
              <a href="#" className="footer-logo">
                <img src={logoImage} alt="" />
              </a>
            </Slide>
            <Slide direction="up" delay={200} triggerOnce>
              <p className="footer-text">
                We are an astrology experts, where we provide a tarot reading
                and healing sessions for youth and generation Z to discuss
                whatever is on their mind
              </p>
            </Slide>
            <Slide direction="up" delay={300} triggerOnce>
              <div className="footer-socials">
                <a href="#" className="footer-social">
                  <img src={instaImage} alt="" />
                </a>
                <a href="#" className="footer-social">
                  <img src={ytImage} alt="" />
                </a>
              </div>
            </Slide>
            <Slide direction="up" delay={400} triggerOnce>
              <a href="#" className="footer-email">
                <img src={emailImage} alt="" />
                logo@gmail.com
              </a>
            </Slide>
          </div>
          <img src={tarotImage} alt="" className="footer-right floating" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

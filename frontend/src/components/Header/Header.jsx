import './Header.css';
import logoImage from '../../assets/svg/logo-placeholder.svg';
import { Fade } from 'react-awesome-reveal';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-nothing" />
          <Fade delay={200} triggerOnce>
            <a href="#" className="header-logo">
              <img src={logoImage} alt="" />
            </a>
          </Fade>
          <Fade delay={250} triggerOnce>
            <a href="#" className="header-btn">
              Products
            </a>
          </Fade>
        </div>
      </div>
    </header>
  );
};

export default Header;

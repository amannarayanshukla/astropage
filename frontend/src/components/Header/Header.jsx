import './Header.css';
import logoImage from '../../assets/svg/logo-placeholder.svg';
import { Fade } from 'react-awesome-reveal';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); // Get the current location
  const isHomePage = location.pathname === '/'; // Check if on homepage

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-nothing" />
          <Fade delay={200} triggerOnce>
            <Link to="/" className="header-logo">
              <img src={logoImage} alt="" />
            </Link>
          </Fade>
          {isHomePage && (
            <Fade delay={250} triggerOnce>
              <Link to={`/products`} className="header-btn">
                Products
              </Link>
            </Fade>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

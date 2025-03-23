import './Sidebar.css';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaClock,
  FaBoxOpen,
  FaStar,
  FaCog,
} from 'react-icons/fa';

const Sidebar = props => {
  const { isOpen, setIsOpen } = props;
  const location = useLocation();

  return (
    <>
      <div className={`admin-sidebar ${isOpen ? 'admin-open' : ''}`}>
        <nav className="admin-sidebar-links">
          <ul>
            <NavLink to="/admin/events">
              <li
                className={`${
                  location.pathname === '/admin/events' ? 'admin-active' : ''
                }`}
              >
                <FaCalendarAlt className="admin-icon" />
                {isOpen && <span className="admin-link-text">Events</span>}
              </li>
            </NavLink>
            <NavLink to="/admin/sessions">
              <li
                className={`${
                  location.pathname === '/admin/sessions' ? 'admin-active' : ''
                }`}
              >
                <FaClock className="admin-icon" />
                {isOpen && <span className="admin-link-text">Sessions</span>}
              </li>
            </NavLink>
            <NavLink to="/admin/products">
              <li
                className={`${
                  location.pathname === '/admin/products' ? 'admin-active' : ''
                }`}
              >
                <FaBoxOpen className="admin-icon" />
                {isOpen && <span className="admin-link-text">Products</span>}
              </li>
            </NavLink>
            <NavLink to="/admin/reviews">
              <li
                className={`${
                  location.pathname === '/admin/reviews' ? 'admin-active' : ''
                }`}
              >
                <FaStar className="admin-icon" />
                {isOpen && <span className="admin-link-text">Reviews</span>}
              </li>
            </NavLink>
            <NavLink to="/admin/social-configs">
              <li
                className={`${
                  location.pathname === '/admin/social-configs'
                    ? 'admin-active'
                    : ''
                }`}
              >
                <FaCog className="admin-icon" />
                {isOpen && (
                  <span className="admin-link-text">Social Configs</span>
                )}
              </li>
            </NavLink>
          </ul>
        </nav>
        <button className="admin-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '←' : '→'}
        </button>
      </div>
      <div className={`admin-sidebar-push ${isOpen ? 'admin-open' : ''}`}></div>
    </>
  );
};

export default Sidebar;

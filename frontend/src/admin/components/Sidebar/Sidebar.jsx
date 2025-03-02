import { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <nav>
            <ul>
              <li>Events</li>
              <li>Sessions</li>
            </ul>
          </nav>
        </div>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "←" : "→"}
        </button>
      </div>
    </>
  );
};

export default Sidebar;

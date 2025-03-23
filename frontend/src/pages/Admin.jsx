import { useState } from 'react';
import Sidebar from '../admin/components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`admin-sidebar-push ${isOpen ? 'admin-open' : ''}`}>
        <Outlet />
      </div>
    </>
  );
};

export default Admin;

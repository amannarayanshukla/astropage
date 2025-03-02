import Sidebar from "../components/Sidebar/Sidebar";
import AdminEvents from "../components/AdminEvents/AdminEvents";
import AdminSessions from "../components/AdminSessions/AdminSessions";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <AdminEvents />
      <AdminSessions />
    </>
  );
};

export default Dashboard;

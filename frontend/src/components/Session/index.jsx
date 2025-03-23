import React, { useEffect, useState } from "react";
import apiClient from "../../services/api/apiClient";
import SessionWeb from "../SessionWeb/SessionWeb";
import SessionMobile from "../SessionMobile/SessionMobile";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await apiClient("/sessions", "GET", null, false);
        if (response.success) {
          setSessions(response.data); // Make sure to access response.data
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchSession();
  }, []);

  const genericText = {
    title: "Our Training Sessions",
    description:
      "Discover our comprehensive training programs designed to help you achieve your fitness goals. From beginner to advanced levels, we offer personalized attention and expert guidance.",
    emptyStateMessage:
      "No sessions available at the moment. Please check back later.",
    loadingMessage: "Loading available sessions...",
    errorMessage: "Unable to load sessions. Please try again later.",
  };

  return (
    <React.Fragment>
      <SessionWeb sessions={sessions} genericText={genericText} />
      <SessionMobile sessions={sessions} genericText={genericText} />
    </React.Fragment>
  );
};

export default Sessions;

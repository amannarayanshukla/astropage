import { useEffect, useState } from "react";
import SessionPlaceHolderImage from "../../../assets/images/session-placeholder.png";
import "./AdminSessions.css";

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: [],
    tagLines: [],
    images: [],
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSession && !isDetailView) {
      setEditForm({
        title: selectedSession.title,
        description: selectedSession.description,
        tagLines: selectedSession.tagLines || [],
        images: selectedSession.images || [],
      });
    }
  }, [selectedSession, isDetailView]);

  const fetchSessions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/sessions");
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const handleDelete = async (sessionId) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/sessions/${sessionId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setSessions((prev) => ({
            ...prev,
            data: prev.data.filter((session) => session._id !== sessionId),
            count: prev.count - 1,
          }));
        }
      } catch (error) {
        console.error("Error deleting session:", error);
      }
    }
  };

  const handleEdit = (session) => {
    setSelectedSession(session);
    setIsDetailView(false);
  };

  const handleView = (session) => {
    setSelectedSession(session);
    setIsDetailView(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" || name === "tagLines") {
      setEditForm((prev) => ({
        ...prev,
        [name]: value.split("\n"),
      }));
    } else {
      setEditForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/sessions/${selectedSession._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      if (response.ok) {
        const updatedSession = await response.json();
        setSessions((prev) => ({
          ...prev,
          data: prev.data.map((session) =>
            session._id === selectedSession._id ? updatedSession.data : session
          ),
        }));
        setSelectedSession(null);
      }
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredSessions(null);
      return;
    }

    const filtered = sessions.data.filter(
      (session) =>
        session.title.toLowerCase().includes(term) ||
        session.description.some((desc) => desc.toLowerCase().includes(term)) ||
        (session.tagLines &&
          session.tagLines.some((tag) => tag.toLowerCase().includes(term)))
    );

    setFilteredSessions({ ...sessions, data: filtered });
  };

  const handleAddNew = () => {
    setIsAddMode(true);
    setSelectedSession(null);
    setEditForm({
      title: "",
      description: [""],
      tagLines: [],
      images: [],
    });
  };

  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const newSession = await response.json();
        setSessions((prev) => ({
          ...prev,
          data: [...prev.data, newSession.data],
          count: prev.count + 1,
        }));
        setIsAddMode(false);
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const displayedSessions = filteredSessions || sessions;

  return (
    <div className="admin-sessions-container">
      <div className="admin-header">
        <h1>Session Management</h1>
        <div className="admin-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => {
                  setSearchTerm("");
                  setFilteredSessions(null);
                }}
              >
                ×
              </button>
            )}
          </div>
          <button className="btn-add" onClick={handleAddNew}>
            Add New Session
          </button>
        </div>
      </div>

      <p>Total Sessions: {displayedSessions?.count || 0}</p>

      <div className="sessions-grid">
        {displayedSessions?.data?.map((session) => (
          <div key={session._id} className="admin-session-card">
            <div className="admin-session-image-container">
              <img
                src={session.images?.[0] || SessionPlaceHolderImage}
                alt={session.title}
                className="admin-session-image"
              />
            </div>
            <div className="admin-session-content">
              <div className="admin-session-header">
                <h3>{session.title}</h3>
              </div>
              <div className="admin-session-tags">
                {session.tagLines?.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="admin-session-description">
                {session.description.map((desc, index) => (
                  <p key={index}>{desc}</p>
                ))}
              </div>
              <div className="admin-session-actions">
                <button
                  className="btn-view"
                  onClick={() => handleView(session)}
                >
                  View
                </button>
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(session)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(session._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(selectedSession || isAddMode) && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => {
                setSelectedSession(null);
                setIsAddMode(false);
              }}
            >
              &times;
            </span>
            {isDetailView ? (
              <div className="admin-session-details">
                <h2>{selectedSession.title}</h2>
                <img
                  src={selectedSession.images?.[0] || SessionPlaceHolderImage}
                  alt={selectedSession.title}
                  className="detail-image"
                />
                <div className="detail-tags">
                  {selectedSession.tagLines?.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="detail-description">
                  {selectedSession.description.map((desc, index) => (
                    <p key={index}>{desc}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="admin-session-edit-form">
                <h2>{isAddMode ? "Add New Session" : "Edit Session"}</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label>Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description (one per line):</label>
                    <textarea
                      name="description"
                      value={editForm.description.join("\n")}
                      onChange={handleEditFormChange}
                      rows="4"
                    />
                  </div>
                  <div className="form-group">
                    <label>Tag Lines (one per line):</label>
                    <textarea
                      name="tagLines"
                      value={editForm.tagLines.join("\n")}
                      onChange={handleEditFormChange}
                      rows="3"
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-save"
                      onClick={isAddMode ? handleCreate : handleUpdate}
                    >
                      {isAddMode ? "Create Session" : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => {
                        setSelectedSession(null);
                        setIsAddMode(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSessions;

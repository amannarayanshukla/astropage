import { useEffect, useState } from "react";
import EventPlaceHolderImage from "../../../assets/images/event-placeholder.png";
import "./AdminEvents.css";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: [],
    tagLines: [],
    eventDate: "",
    price: 0,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent && !isDetailView) {
      setEditForm({
        title: selectedEvent.title,
        description: selectedEvent.description,
        tagLines: selectedEvent.tagLines,
        eventDate: new Date(selectedEvent.eventDate)
          .toISOString()
          .split("T")[0],
        price: selectedEvent.price,
      });
    }
  }, [selectedEvent, isDetailView]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/events/${eventId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setEvents((prev) => ({
            ...prev,
            data: prev.data.filter((event) => event._id !== eventId),
            count: prev.count - 1,
          }));
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsDetailView(false);
  };

  const handleView = (event) => {
    setSelectedEvent(event);
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
        `http://localhost:5000/api/events/${selectedEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      if (response.ok) {
        const updatedEvent = await response.json();
        setEvents((prev) => ({
          ...prev,
          data: prev.data.map((event) =>
            event._id === selectedEvent._id ? updatedEvent.data : event
          ),
        }));
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredEvents(null);
      return;
    }

    const filtered = events.data.filter(
      (event) =>
        event.title.toLowerCase().includes(term) ||
        event.description.some((desc) => desc.toLowerCase().includes(term)) ||
        event.tagLines.some((tag) => tag.toLowerCase().includes(term))
    );

    setFilteredEvents({ ...events, data: filtered });
  };

  const handleAddNew = () => {
    setIsAddMode(true);
    setSelectedEvent(null);
    setEditForm({
      title: "",
      description: [""],
      tagLines: [""],
      eventDate: new Date().toISOString().split("T")[0],
      price: 0,
    });
  };

  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const newEvent = await response.json();
        setEvents((prev) => ({
          ...prev,
          data: [...prev.data, newEvent.data],
          count: prev.count + 1,
        }));
        setIsAddMode(false);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const displayedEvents = filteredEvents || events;

  return (
    <div className="admin-events-container">
      <div className="admin-header">
        <h1>Event Management</h1>
        <div className="admin-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => {
                  setSearchTerm("");
                  setFilteredEvents(null);
                }}
              >
                ×
              </button>
            )}
          </div>
          <button className="btn-add" onClick={handleAddNew}>
            Add New Event
          </button>
        </div>
      </div>

      <p>Total Events: {displayedEvents?.count || 0}</p>

      <div className="events-grid">
        {displayedEvents?.data?.map((event) => (
          <div key={event._id} className="admin-event-card">
            <div className="admin-event-image-container">
              <img
                src={event.images?.[0] || EventPlaceHolderImage}
                alt={event.title}
                className="admin-event-image"
              />
            </div>
            <div className="admin-event-content">
              <div className="admin-event-header">
                <h3>{event.title}</h3>
                <p className="admin-event-price">${event.price}</p>
              </div>
              <p className="admin-event-date">
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
              <div className="admin-event-tags">
                {event.tagLines.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="admin-event-description">
                {event.description.map((desc, index) => (
                  <p key={index}>{desc}</p>
                ))}
              </div>
              <div className="admin-event-actions">
                <button className="btn-view" onClick={() => handleView(event)}>
                  View
                </button>
                <button className="btn-edit" onClick={() => handleEdit(event)}>
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(selectedEvent || isAddMode) && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => {
                setSelectedEvent(null);
                setIsAddMode(false);
              }}
            >
              &times;
            </span>
            {isDetailView ? (
              <div className="admin-event-details">
                <h2>{selectedEvent.title}</h2>
                <img
                  src={EventPlaceHolderImage}
                  alt={selectedEvent.title}
                  className="detail-image"
                />
                <p className="detail-date">
                  <strong>Date:</strong>{" "}
                  {new Date(selectedEvent.eventDate).toLocaleDateString()}
                </p>
                <p className="detail-price">
                  <strong>Price:</strong> ${selectedEvent.price}
                </p>
                <div className="detail-tags">
                  {selectedEvent.tagLines.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="detail-description">
                  {selectedEvent.description.map((desc, index) => (
                    <p key={index}>{desc}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="admin-event-edit-form">
                <h2>{isAddMode ? "Add New Event" : "Edit Event"}</h2>
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
                  <div className="form-group">
                    <label>Event Date:</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={editForm.eventDate}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price:</label>
                    <input
                      type="number"
                      name="price"
                      value={editForm.price}
                      onChange={handleEditFormChange}
                      step="0.01"
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-save"
                      onClick={isAddMode ? handleCreate : handleUpdate}
                    >
                      {isAddMode ? "Create Event" : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => {
                        setSelectedEvent(null);
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

export default AdminEvents;

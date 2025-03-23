import React, { useEffect, useState } from 'react';
import EventPlaceHolderImage from '../../../assets/images/event-placeholder.png';
import './AdminEvents.css';
import apiClient from '../../../services/api/apiClient';
import { createImageUrl } from '../../../utils';
import { Tooltip } from 'react-tooltip';
import { FaTimes } from 'react-icons/fa';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: [],
    tagLines: [],
    eventDate: '',
    price: 0,
    image: null,
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
          .split('T')[0],
        price: selectedEvent.price,
        image: selectedEvent.image,
      });
    }
  }, [selectedEvent, isDetailView]);

  const fetchEvents = async () => {
    try {
      const response = await apiClient('/events', 'GET', null, true);
      setEvents(response);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async eventId => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await apiClient(
          `/events/${eventId}`,
          'DELETE',
          null,
          true
        );
        if (response.success === true) {
          setEvents(prev => ({
            ...prev,
            data: prev.data.filter(event => event._id !== eventId),
            count: prev.count - 1,
          }));
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleEdit = event => {
    setSelectedEvent(event);
    setIsDetailView(false);
  };

  const handleView = event => {
    setSelectedEvent(event);
    setIsDetailView(true);
  };

  const handleEditFormChange = e => {
    const { name, value } = e.target;
    if (name === 'description' || name === 'tagLines') {
      const arrayValues = value.split('\n');
      setEditForm(prev => ({
        ...prev,
        [name]: arrayValues,
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setEditForm(prev => ({
      ...prev,
      image: file,
    }));
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      Object.keys(editForm).forEach(key => {
        if (key === 'description' || key === 'tagLines') {
          editForm[key].forEach((item, index) => {
            if (item.trim() !== '') {
              formData.append(`${key}[${index}]`, item);
            }
          });
        } else if (key === 'image' && editForm[key] instanceof File) {
          formData.append(key, editForm[key]);
        } else if (key !== 'image') {
          formData.append(key, editForm[key]);
        }
      });

      const response = await apiClient(
        `/events/${selectedEvent._id}`,
        'PUT',
        formData,
        true
      );

      if (response.success === true) {
        const updatedEvent = response;
        setEvents(prev => ({
          ...prev,
          data: prev.data.map(event =>
            event._id === selectedEvent._id ? updatedEvent.data : event
          ),
        }));
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleSearch = e => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredEvents(null);
      return;
    }

    const filtered = events.data.filter(
      event =>
        event.title.toLowerCase().includes(term) ||
        event.description.some(desc => desc.toLowerCase().includes(term)) ||
        event.tagLines.some(tag => tag.toLowerCase().includes(term))
    );

    setFilteredEvents({ ...events, data: filtered });
  };

  const handleAddNew = () => {
    setIsAddMode(true);
    setSelectedEvent(null);
    setEditForm({
      title: '',
      description: [''],
      tagLines: [''],
      eventDate: new Date().toISOString().split('T')[0],
      price: 0,
      image: null,
    });
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();

      Object.keys(editForm).forEach(key => {
        if (key === 'description' || key === 'tagLines') {
          editForm[key].forEach((item, index) => {
            if (item.trim() !== '') {
              formData.append(`${key}[${index}]`, item);
            }
          });
        } else {
          formData.append(key, editForm[key]);
        }
      });

      const response = await apiClient('/events', 'POST', formData, true);
      const newEvent = response;
      if (response.success === true) {
        setEvents(prev => ({
          ...prev,
          data: [...prev.data, newEvent.data],
          count: prev.count + 1,
        }));
        setIsAddMode(false);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const displayedEvents = filteredEvents || events;

  return (
    <div className="admin-events-container">
      <h1 className="admin-events-header-title">Event Management</h1>
      <div className="admin-events-header">
        <div className="admin-events-controls">
          <button className="admin-events-btn-add" onClick={handleAddNew}>
            Add New Event
          </button>
          <p
            data-tooltip-id="event-count"
            data-tooltip-content="Total Events"
            className="admin-events-count"
          >
            Events: {displayedEvents?.count || 0}
          </p>
          <Tooltip id="event-count" />
        </div>
        <div className="admin-events-search-container">
          <input
            type="text"
            placeholder="Search Events"
            value={searchTerm}
            onChange={handleSearch}
            className="admin-events-search-input"
          />
          {searchTerm && (
            <button
              className="admin-events-clear-search"
              onClick={() => {
                setSearchTerm('');
                setFilteredEvents(null);
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="admin-events-grid">
        {displayedEvents?.data?.map(event => (
          <div key={event._id} className="admin-events-card">
            <div className="admin-events-image-container">
              <img
                src={
                  event.image
                    ? createImageUrl(event.image)
                    : EventPlaceHolderImage
                }
                alt={event.title}
                className="admin-events-image"
              />
            </div>
            <div className="admin-events-content">
              <h3 className="admin-events-card-title">{event.title}</h3>
              <div className="admin-events-event-header">
                <p className="admin-events-price">${event.price}</p>
                <p className="admin-events-date">
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
              </div>
              <div className="admin-events-tags">
                {event.tagLines.map((tag, index) => (
                  <span key={index} className="admin-events-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="admin-events-description">
                {event.description.map((desc, index) => (
                  <React.Fragment key={index}>{desc}</React.Fragment>
                ))}
              </div>
              <div className="admin-events-actions">
                <button
                  className="admin-events-btn-view"
                  onClick={() => handleView(event)}
                >
                  View
                </button>
                <button
                  className="admin-events-btn-edit"
                  onClick={() => handleEdit(event)}
                >
                  Edit
                </button>
                <button
                  className="admin-events-btn-delete"
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
        <div className="admin-events-modal">
          <div className="admin-events-modal-content">
            <div className="admin-events-modal-header">
              <h2 className="admin-events-modal-title">
                {isDetailView
                  ? selectedEvent.title
                  : isAddMode
                  ? 'Add New Event'
                  : 'Edit Event'}
              </h2>
              <span
                className="admin-events-close"
                onClick={() => {
                  setSelectedEvent(null);
                  setIsAddMode(false);
                }}
              >
                <FaTimes size={20} fill="red" />
              </span>
            </div>
            <div className="admin-events-modal-body">
              {isDetailView ? (
                <div className="admin-events-details">
                  <h2 className="admin-events-details-title">
                    {selectedEvent.title}
                  </h2>
                  <img
                    src={
                      selectedEvent?.images?.length > 0
                        ? createImageUrl(selectedEvent.images?.[0])
                        : EventPlaceHolderImage
                    }
                    alt={selectedEvent.title}
                    className="admin-events-detail-image"
                  />
                  <div className="admin-events-detail-flex">
                    <p className="admin-events-detail-price">
                      ${selectedEvent.price}
                    </p>
                    <p className="admin-events-detail-date">
                      {new Date(selectedEvent.eventDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="admin-events-detail-tags">
                    {selectedEvent.tagLines.map((tag, index) => (
                      <span key={index} className="admin-events-detail-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="admin-events-detail-description">
                    {selectedEvent.description.map((desc, index) => (
                      <p key={index}>{desc}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="admin-events-edit-form">
                  <form onSubmit={e => e.preventDefault()}>
                    <div className="admin-events-form-group">
                      <label>Title:</label>
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditFormChange}
                      />
                    </div>
                    <div className="admin-events-form-group">
                      <label>Description (one per line):</label>
                      <textarea
                        name="description"
                        value={editForm.description.join('\n')}
                        onChange={handleEditFormChange}
                        rows="4"
                      />
                    </div>
                    <div className="admin-events-form-group">
                      <label>Tag Lines (one per line):</label>
                      <textarea
                        name="tagLines"
                        value={editForm.tagLines.join('\n')}
                        onChange={handleEditFormChange}
                        rows="3"
                      />
                    </div>
                    <div className="admin-events-form-group">
                      <label>Event Date:</label>
                      <input
                        type="date"
                        name="eventDate"
                        value={editForm.eventDate}
                        onChange={handleEditFormChange}
                      />
                    </div>
                    <div className="admin-events-form-group">
                      <label>Price:</label>
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleEditFormChange}
                        step="0.01"
                      />
                    </div>
                    <div className="admin-events-form-group">
                      <label>Images:</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="admin-events-file-input"
                      />
                    </div>
                  </form>
                </div>
              )}
            </div>
            {!isDetailView && (
              <div className="admin-events-modal-footer">
                <button
                  type="button"
                  className="admin-events-btn-save"
                  onClick={isAddMode ? handleCreate : handleUpdate}
                >
                  {isAddMode ? 'Create Event' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="admin-events-btn-cancel"
                  onClick={() => {
                    setSelectedEvent(null);
                    setIsAddMode(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;

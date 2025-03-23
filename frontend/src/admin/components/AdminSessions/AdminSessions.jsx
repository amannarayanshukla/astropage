import React, { useEffect, useState } from 'react';
import SessionPlaceHolderImage from '../../../assets/images/session-placeholder.png';
import './AdminSessions.css';
import apiClient from '../../../services/api/apiClient';
import { createImageUrl } from '../../../utils';
import { Tooltip } from 'react-tooltip';
import { FaTimes } from 'react-icons/fa';

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: [],
    tagLines: [],
    images: [],
    price: 0,
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
        price: selectedSession.price,
      });
    }
  }, [selectedSession, isDetailView]);

  const fetchSessions = async () => {
    try {
      const response = await apiClient('/sessions', 'GET', null, false);
      setSessions(response);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleDelete = async sessionId => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        const response = await apiClient(
          `/sessions/${sessionId}`,
          'DELETE',
          null,
          true
        );
        if (response.success === true) {
          setSessions(prev => ({
            ...prev,
            data: prev.data.filter(session => session._id !== sessionId),
            count: prev.count - 1,
          }));
        }
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    }
  };

  const handleEdit = session => {
    setSelectedSession(session);
    setIsDetailView(false);
  };

  const handleView = session => {
    setSelectedSession(session);
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
    const files = Array.from(e.target.files);
    setEditForm(prev => ({
      ...prev,
      images: files,
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
        } else if (key === 'images') {
          editForm.images.forEach(image => {
            if (image instanceof File) {
              formData.append('images', image);
            }
          });
        } else {
          formData.append(key, editForm[key]);
        }
      });
      const response = await apiClient(
        `/sessions/${selectedSession._id}`,
        'PUT',
        formData,
        true
      );
      if (response.success === true) {
        const updatedSession = response;
        setSessions(prev => ({
          ...prev,
          data: prev.data.map(session =>
            session._id === selectedSession._id ? updatedSession.data : session
          ),
        }));
        setSelectedSession(null);
      }
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const handleSearch = e => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredSessions(null);
      return;
    }
    const filtered = sessions.data.filter(
      session =>
        session.title.toLowerCase().includes(term) ||
        session.description.some(desc => desc.toLowerCase().includes(term)) ||
        (session.tagLines &&
          session.tagLines.some(tag => tag.toLowerCase().includes(term)))
    );
    setFilteredSessions({ ...sessions, data: filtered });
  };

  const handleAddNew = () => {
    setIsAddMode(true);
    setSelectedSession(null);
    setEditForm({
      title: '',
      description: [''],
      tagLines: [],
      images: [],
      price: 0,
    });
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      Object.keys(editForm).forEach(key => {
        if (key === 'images') {
          editForm.images.forEach(image => {
            formData.append('images', image);
          });
        } else if (key === 'description' || key === 'tagLines') {
          editForm[key].forEach((item, index) => {
            if (item.trim() !== '') {
              formData.append(`${key}[${index}]`, item);
            }
          });
        } else {
          formData.append(key, editForm[key]);
        }
      });
      const response = await apiClient('/sessions', 'POST', formData, true);
      if (response.success === true) {
        const newSession = response;
        setSessions(prev => ({
          ...prev,
          data: [...prev.data, newSession.data],
          count: prev.count + 1,
        }));
        setIsAddMode(false);
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const displayedSessions = filteredSessions || sessions;

  return (
    <div className="admin-sessions-container">
      <h1 className="admin-sessions-header-title">Session Management</h1>
      <div className="admin-sessions-header">
        <div className="admin-sessions-controls">
          <button className="admin-sessions-btn-add" onClick={handleAddNew}>
            Add New Session
          </button>
          <p
            data-tooltip-id="session-count"
            data-tooltip-content="Total Sessions"
            className="admin-sessions-count"
          >
            Sessions: {displayedSessions?.count || 0}
          </p>
          <Tooltip id="session-count" />
        </div>
        <div className="admin-sessions-search-container">
          <input
            type="text"
            placeholder="Search Sessions"
            value={searchTerm}
            onChange={handleSearch}
            className="admin-sessions-search-input"
          />
          {searchTerm && (
            <button
              className="admin-sessions-clear-search"
              onClick={() => {
                setSearchTerm('');
                setFilteredSessions(null);
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="admin-sessions-grid">
        {displayedSessions?.data?.map(session => (
          <div key={session._id} className="admin-sessions-card">
            <div className="admin-sessions-image-container">
              <img
                src={
                  session.images && session.images.length > 0
                    ? createImageUrl(session.images[0])
                    : SessionPlaceHolderImage
                }
                alt={session.title}
                className="admin-sessions-image"
              />
            </div>
            <div className="admin-sessions-content">
              <h3 className="admin-sessions-card-title">{session.title}</h3>
              <p className="admin-sessions-price">${session.price}</p>
              <div className="admin-sessions-tags">
                {session.tagLines?.map((tag, index) => (
                  <span key={index} className="admin-sessions-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="admin-sessions-description">
                {session.description.map((desc, index) => (
                  <p key={index}>{desc}</p>
                ))}
              </div>
              <div className="admin-sessions-actions">
                <button
                  className="admin-sessions-btn-view"
                  onClick={() => handleView(session)}
                >
                  View
                </button>
                <button
                  className="admin-sessions-btn-edit"
                  onClick={() => handleEdit(session)}
                >
                  Edit
                </button>
                <button
                  className="admin-sessions-btn-delete"
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
        <div className="admin-sessions-modal">
          <div className="admin-sessions-modal-content">
            <div className="admin-sessions-modal-header">
              <h2 className="admin-sessions-modal-title">
                {isDetailView
                  ? selectedSession.title
                  : isAddMode
                  ? 'Add New Session'
                  : 'Edit Session'}
              </h2>
              <span
                className="admin-sessions-close"
                onClick={() => {
                  setSelectedSession(null);
                  setIsAddMode(false);
                }}
              >
                <FaTimes size={20} fill="red" />
              </span>
            </div>
            <div className="admin-sessions-modal-body">
              {isDetailView ? (
                <div className="admin-sessions-details">
                  <img
                    src={
                      selectedSession.images &&
                      selectedSession.images.length > 0
                        ? createImageUrl(selectedSession.images[0])
                        : SessionPlaceHolderImage
                    }
                    alt={selectedSession.title}
                    className="admin-sessions-detail-image"
                  />
                  <p className="admin-sessions-detail-price">
                    ${selectedSession.price}
                  </p>
                  <div className="admin-sessions-detail-tags">
                    {selectedSession.tagLines?.map((tag, index) => (
                      <span key={index} className="admin-sessions-detail-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="admin-sessions-detail-description">
                    {selectedSession.description.map((desc, index) => (
                      <p key={index}>{desc}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="admin-sessions-edit-form">
                  <form onSubmit={e => e.preventDefault()}>
                    <div className="admin-sessions-form-group">
                      <label>Title:</label>
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditFormChange}
                      />
                    </div>
                    <div className="admin-sessions-form-group">
                      <label>Price:</label>
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleEditFormChange}
                        step="0.01"
                      />
                    </div>
                    <div className="admin-sessions-form-group">
                      <label>Description (one per line):</label>
                      <textarea
                        name="description"
                        value={editForm.description.join('\n')}
                        onChange={handleEditFormChange}
                        rows="4"
                      />
                    </div>
                    <div className="admin-sessions-form-group">
                      <label>Tag Lines (one per line):</label>
                      <textarea
                        name="tagLines"
                        value={editForm.tagLines.join('\n')}
                        onChange={handleEditFormChange}
                        rows="3"
                      />
                    </div>
                    <div className="admin-sessions-form-group">
                      <label>Images:</label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="admin-sessions-file-input"
                      />
                    </div>
                  </form>
                </div>
              )}
            </div>
            {!isDetailView && (
              <div className="admin-sessions-modal-footer">
                <button
                  type="button"
                  className="admin-sessions-btn-save"
                  onClick={isAddMode ? handleCreate : handleUpdate}
                >
                  {isAddMode ? 'Create Session' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="admin-sessions-btn-cancel"
                  onClick={() => {
                    setSelectedSession(null);
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

export default AdminSessions;

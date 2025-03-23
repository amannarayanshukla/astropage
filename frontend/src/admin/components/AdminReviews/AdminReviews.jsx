import { useEffect, useState } from 'react';
import './AdminReviews.css';
import apiClient from '../../../services/api/apiClient';
import { createImageUrl } from '../../../utils';
import { FaTimes } from 'react-icons/fa';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [editForm, setEditForm] = useState({
    userName: '',
    description: '',
    rating: 0,
    company: '',
    designation: '',
    image: null,
    logo: null,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await apiClient('/reviews', 'GET', null, true);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleDelete = async reviewId => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const response = await apiClient(
          `/reviews/${reviewId}`,
          'DELETE',
          null,
          true
        );
        if (response.success === true) {
          setReviews(prev => prev.filter(review => review._id !== reviewId));
        }
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const handleEdit = review => {
    setSelectedReview(review);
    setEditForm({
      userName: review.userName,
      description: review.description,
      rating: review.rating,
      company: review.company,
      designation: review.designation,
      image: null, // Reset image for editing
      logo: null, // Reset logo for editing
    });
    setIsAddMode(false);
  };

  const handleEditFormChange = e => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      Object.keys(editForm).forEach(key => {
        formData.append(key, editForm[key]);
      });

      const response = await apiClient(
        `/reviews/${selectedReview._id}`,
        'PUT',
        formData,
        true
      );
      if (response.success === true) {
        setReviews(prev =>
          prev.map(review =>
            review._id === selectedReview._id ? response.data : review
          )
        );
        setSelectedReview(null);
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      Object.keys(editForm).forEach(key => {
        formData.append(key, editForm[key]);
      });

      const response = await apiClient('/reviews', 'POST', formData, true);
      if (response.success === true) {
        setReviews(prev => [...prev, response.data]);
        setIsAddMode(false);
        setEditForm({
          userName: '',
          description: '',
          rating: 0,
          company: '',
          designation: '',
          image: null,
          logo: null,
        });
      }
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const handleSearch = e => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredReviews(null);
      return;
    }
    const filtered = reviews.filter(
      review =>
        review.userName.toLowerCase().includes(term) ||
        review.description.toLowerCase().includes(term) ||
        review.company.toLowerCase().includes(term) ||
        review.designation.toLowerCase().includes(term)
    );
    setFilteredReviews(filtered);
  };

  const displayedReviews = filteredReviews || reviews;

  return (
    <div className="admin-reviews-container">
      <h1 className="admin-reviews-header-title">Review Management</h1>
      <div className="admin-reviews-header">
        <button
          className="admin-reviews-btn-add"
          onClick={() => {
            setIsAddMode(true);
            setSelectedReview(null);
            setEditForm({
              userName: '',
              description: '',
              rating: 0,
              company: '',
              designation: '',
              image: null,
              logo: null,
            });
          }}
        >
          Add New Review
        </button>
        <div className="admin-reviews-search-container">
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={handleSearch}
            className="admin-reviews-search-input"
          />
          {searchTerm && (
            <button
              className="admin-reviews-clear-search"
              onClick={() => {
                setSearchTerm('');
                setFilteredReviews(null);
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>
      <div className="admin-reviews-list">
        {displayedReviews?.map(review => (
          <div key={review._id} className="admin-reviews-card">
            <p className="admin-reviews-card-text">
              <b>Name:</b> <span>{review.userName}</span>
            </p>
            <p className="admin-reviews-card-text">
              <b>Description:</b> <span>{review.description}</span>
            </p>
            <p className="admin-reviews-card-text">
              <b>Rating:</b> <span>{review.rating}</span>
            </p>
            <p className="admin-reviews-card-text">
              <b>Company:</b> <span>{review.company}</span>
            </p>
            <p className="admin-reviews-card-text">
              <b>Designation:</b> <span>{review.designation}</span>
            </p>
            <div className="admin-reviews-card-images">
              <p className="admin-reviews-card-text">
                <b>Reviewer Image:</b>
              </p>
              {review.image && (
                <img
                  src={createImageUrl(review.image)}
                  alt={`${review.userName}'s review`}
                  className="admin-reviews-image-user"
                />
              )}
            </div>
            <div className="admin-reviews-card-images">
              <p className="admin-reviews-card-text">
                <b>Company Image:</b>
              </p>

              {review.logo && (
                <img
                  src={createImageUrl(review.logo)}
                  alt={`${review.company} logo`}
                  className="admin-reviews-image-user"
                />
              )}
            </div>
            <div className="admin-reviews-card-btns">
              <button
                className="admin-reviews-btn-edit"
                onClick={() => handleEdit(review)}
              >
                Edit
              </button>
              <button
                className="admin-reviews-btn-delete"
                onClick={() => handleDelete(review._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {(isAddMode || selectedReview) && (
        <div className="admin-reviews-modal">
          <div className="admin-reviews-modal-content">
            <div className="admin-reviews-modal-header">
              <h2>{selectedReview ? 'Edit Review' : 'Add New Review'}</h2>
              <span
                onClick={() => {
                  setSelectedReview(null);
                  setIsAddMode(false);
                }}
              >
                <FaTimes size={20} fill="red" />
              </span>
            </div>
            <div className="admin-reviews-modal-body">
              <form onSubmit={e => e.preventDefault()}>
                <div className="admin-reviews-form-group">
                  <label htmlFor="userName">User Name</label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={editForm.userName}
                    onChange={handleEditFormChange}
                    placeholder="Enter user name"
                  />
                </div>
                <div className="admin-reviews-form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={editForm.description}
                    onChange={handleEditFormChange}
                    placeholder="Enter review description"
                  />
                </div>
                <div className="admin-reviews-form-group">
                  <label htmlFor="rating">Rating (1-5)</label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="1"
                    max="5"
                    value={editForm.rating}
                    onChange={handleEditFormChange}
                    placeholder="Enter rating"
                  />
                </div>
                <div className="admin-reviews-form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={editForm.company}
                    onChange={handleEditFormChange}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="admin-reviews-form-group">
                  <label htmlFor="designation">Designation</label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={editForm.designation}
                    onChange={handleEditFormChange}
                    placeholder="Enter designation"
                  />
                </div>
                <div className="admin-reviews-form-group">
                  <label htmlFor="image">User Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={e =>
                      setEditForm({ ...editForm, image: e.target.files[0] })
                    }
                    accept="image/*"
                  />
                </div>
                <div className="admin-reviews-form-group">
                  <label htmlFor="logo">Company Logo</label>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    onChange={e =>
                      setEditForm({ ...editForm, logo: e.target.files[0] })
                    }
                    accept="image/*"
                  />
                </div>
              </form>
            </div>
            <div className="admin-reviews-modal-footer">
              <button
                className="admin-reviews-btn-submit"
                onClick={selectedReview ? handleUpdate : handleCreate}
              >
                {selectedReview ? 'Save Changes' : 'Create Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;

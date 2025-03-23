import { useEffect, useState } from 'react';
import productPlaceHolderImage from '../../../assets/images/session-placeholder.png';
import './AdminProducts.css';
import apiClient from '../../../services/api/apiClient';
import { createImageUrl } from '../../../utils';
import { Tooltip } from 'react-tooltip';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const AdminProducts = () => {
  const [products, setProducts] = useState({ data: [], count: 0 });
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [showShippingAndReturns, setShowShippingAndReturns] = useState(false);

  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: 0,
    rating: 1,
    numberOfReviews: 1,
    images: [],
    details: '',
    shipping: '',
    returns: '',
    variant: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct && !isDetailView) {
      setEditForm({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        rating: selectedProduct.rating,
        numberOfReviews: selectedProduct.numberOfReviews,
        images: selectedProduct.images || [],
        details: selectedProduct.details || '',
        shipping: selectedProduct.shipping || '',
        returns: selectedProduct.returns || '',
        variant: selectedProduct.variant || [],
      });
    }
  }, [selectedProduct, isDetailView]);

  const fetchProducts = async () => {
    try {
      const data = await apiClient('/products', 'GET', null, true);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async productId => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await apiClient(
          `/products/${productId}`,
          'DELETE',
          null,
          true
        );
        if (response.success) {
          setProducts(prev => ({
            ...prev,
            data: prev.data.filter(product => product._id !== productId),
            count: prev.count - 1,
          }));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = product => {
    setSelectedProduct(product);
    setIsDetailView(false);
  };

  const handleView = product => {
    setSelectedProduct(product);
    setIsDetailView(true);
  };

  const handleEditFormChange = e => {
    const { name, value } = e.target;
    if (name === 'variant') {
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
        if (key === 'images') {
          editForm.images.forEach(image => {
            if (image instanceof File) {
              formData.append('images', image);
            }
          });
        } else if (key === 'variant') {
          editForm.variant.forEach((variant, index) => {
            formData.append(`variant[${index}]`, variant);
          });
        } else {
          formData.append(key, editForm[key]);
        }
      });
      const response = await apiClient(
        `/products/${selectedProduct._id}`,
        'PUT',
        formData,
        true
      );
      if (response.success) {
        const updatedProduct = response.data;
        setProducts(prev => ({
          ...prev,
          data: prev.data.map(product =>
            product._id === selectedProduct._id ? updatedProduct : product
          ),
        }));
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleSearch = e => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredProducts(null);
      return;
    }
    const filtered = products.data.filter(
      product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
    setFilteredProducts({ ...products, data: filtered });
  };

  const handleAddNew = () => {
    setIsAddMode(true);
    setSelectedProduct(null);
    setEditForm({
      name: '',
      description: '',
      price: 0,
      rating: 1,
      numberOfReviews: 1,
      images: [],
      details: '',
      shipping: '',
      returns: '',
      variant: [],
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
        } else if (key === 'variant') {
          editForm.variant.forEach((variant, index) => {
            formData.append(`variant[${index}]`, variant);
          });
        } else {
          formData.append(key, editForm[key]);
        }
      });
      const response = await apiClient('/products', 'POST', formData, true);
      if (response.success) {
        const newProduct = response.data;
        setProducts(prev => ({
          ...prev,
          data: [...prev.data, newProduct],
          count: prev.count + 1,
        }));
        setIsAddMode(false);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const displayedProducts = filteredProducts || products;

  // Product Card with carousel functionality
  const ProductCard = ({ product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = product.images || [];
    const hasMultipleImages = images.length > 1;

    const nextImage = e => {
      e.stopPropagation();
      setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = e => {
      e.stopPropagation();
      setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
      <div className="admin-products-image-container">
        {hasMultipleImages && (
          <button
            className="admin-products-carousel-btn admin-products-prev-btn"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <FaChevronLeft size={12} />
          </button>
        )}
        <div className="admin-products-image-wrapper">
          <img
            src={
              images.length > 0
                ? createImageUrl(images[currentImageIndex])
                : productPlaceHolderImage
            }
            alt={product.name}
            className="admin-products-image"
          />
          {hasMultipleImages && (
            <div className="admin-products-carousel-dots">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`admin-products-dot ${
                    index === currentImageIndex ? 'active' : ''
                  }`}
                  onClick={e => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>
          )}
        </div>
        {hasMultipleImages && (
          <button
            className="admin-products-carousel-btn admin-products-next-btn"
            onClick={nextImage}
            aria-label="Next image"
          >
            <FaChevronRight size={12} />
          </button>
        )}
      </div>
    );
  };

  // Render only the form body (without title and buttons)
  const renderFormBody = () => (
    <form onSubmit={e => e.preventDefault()}>
      <div className="admin-products-form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={editForm.name}
          onChange={handleEditFormChange}
          required
        />
      </div>
      <div className="admin-products-form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={editForm.description}
          onChange={handleEditFormChange}
          rows="4"
          required
        />
      </div>
      <div className="admin-products-form-group">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={editForm.price}
          onChange={handleEditFormChange}
          min="0"
          step="0.01"
          required
        />
      </div>
      <div className="admin-products-form-group">
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={editForm.rating}
          onChange={handleEditFormChange}
          min="1"
          max="5"
          required
        />
      </div>
      <div className="admin-products-form-group">
        <label>Number of Reviews:</label>
        <input
          type="number"
          name="numberOfReviews"
          value={editForm.numberOfReviews}
          onChange={handleEditFormChange}
          min="0"
          required
        />
      </div>
      <div className="admin-products-form-group">
        <label>Details:</label>
        <textarea
          name="details"
          value={editForm.details}
          onChange={handleEditFormChange}
          rows="4"
          placeholder="Enter product details"
        />
      </div>
      <div className="admin-products-form-group">
        <button
          type="button"
          className="admin-products-btn-toggle-fields"
          onClick={() => setShowShippingAndReturns(prev => !prev)}
        >
          {showShippingAndReturns
            ? 'Default Shipping & Returns'
            : 'Add Shipping & Returns'}
        </button>
      </div>
      {showShippingAndReturns && (
        <>
          <div className="admin-products-form-group">
            <label>Shipping Information:</label>
            <textarea
              name="shipping"
              value={editForm.shipping}
              onChange={handleEditFormChange}
              rows="3"
              placeholder="Enter shipping information"
            />
          </div>
          <div className="admin-products-form-group">
            <label>Returns Policy:</label>
            <textarea
              name="returns"
              value={editForm.returns}
              onChange={handleEditFormChange}
              rows="3"
              placeholder="Enter returns policy"
            />
          </div>
        </>
      )}
      <div className="admin-products-form-group">
        <label>Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="admin-products-file-input"
        />
      </div>
      <div className="admin-products-form-group">
        <label>Variants (one per line):</label>
        <textarea
          name="variant"
          value={editForm.variant.join('\n')}
          onChange={handleEditFormChange}
          rows="3"
          placeholder="Enter product variants (one per line)"
        />
      </div>
    </form>
  );

  return (
    <div className="admin-products-container">
      <h1 className="admin-products-header-title">Product Management</h1>
      <div className="admin-products-header">
        <div className="admin-products-controls">
          <button className="admin-products-btn-add" onClick={handleAddNew}>
            Add New Product
          </button>
          <p
            data-tooltip-id="product-count"
            data-tooltip-content="Total Products"
            className="admin-products-count"
          >
            Products: {displayedProducts?.count || 0}
          </p>
          <Tooltip id="product-count" />
        </div>
        <div className="admin-products-search-container">
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearch}
            className="admin-products-search-input"
          />
          {searchTerm && (
            <button
              className="admin-products-clear-search"
              onClick={() => {
                setSearchTerm('');
                setFilteredProducts(null);
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="admin-products-grid">
        {displayedProducts?.data?.map(product => (
          <div key={product._id} className="admin-products-card">
            <ProductCard product={product} />
            <div className="admin-products-content">
              <div className="admin-products-card-header">
                <h3 className="admin-products-card-title">{product.name}</h3>
                <p className="admin-products-price">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="admin-products-description">
                {product.description}
              </div>
              <div className="admin-products-meta">
                <span>Rating: {product.rating}/5</span>
                <span>Reviews: {product.numberOfReviews}</span>
              </div>
              <div className="admin-products-actions">
                <button
                  className="admin-products-btn-view"
                  onClick={() => handleView(product)}
                >
                  View
                </button>
                <button
                  className="admin-products-btn-edit"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="admin-products-btn-delete"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(selectedProduct || isAddMode) && (
        <div className="admin-products-modal">
          <div className="admin-products-modal-content">
            <div className="admin-products-modal-header">
              <h2 className="admin-products-modal-title">
                {isDetailView
                  ? selectedProduct.name
                  : isAddMode
                  ? 'Add New Product'
                  : 'Edit Product'}
              </h2>
              <span
                className="admin-products-close"
                onClick={() => {
                  setSelectedProduct(null);
                  setIsAddMode(false);
                }}
              >
                <FaTimes size={20} fill="red" />
              </span>
            </div>
            <div className="admin-products-modal-body">
              {isDetailView ? (
                <div className="admin-products-details">
                  <img
                    src={
                      selectedProduct.images?.length > 0
                        ? createImageUrl(selectedProduct.images[0])
                        : productPlaceHolderImage
                    }
                    alt={selectedProduct.name}
                    className="admin-products-detail-image"
                  />
                  <div className="admin-products-detail-info">
                    <p className="admin-products-detail-description">
                      {selectedProduct.description}
                    </p>
                    <div className="admin-products-detail-item">
                      <p className="admin-products-detail-price">
                        <b>Price: </b> ${selectedProduct.price.toFixed(2)}
                      </p>
                      <p className="admin-products-detail-rating">
                        <b>Rating: </b> {selectedProduct.rating}/5
                      </p>
                      <p className="admin-products-detail-reviews">
                        <b>Reviews: </b> {selectedProduct.numberOfReviews}
                      </p>
                      <p className="admin-products-detail-created">
                        <b>Created:</b>{' '}
                        {new Date(
                          selectedProduct.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    {selectedProduct.details && (
                      <div className="admin-products-detail-section">
                        <h4>Product Details</h4>
                        <p>{selectedProduct.details}</p>
                      </div>
                    )}
                    {selectedProduct.shipping && (
                      <div className="admin-products-detail-section">
                        <h4>Shipping Information</h4>
                        <p>{selectedProduct.shipping}</p>
                      </div>
                    )}
                    {selectedProduct.returns && (
                      <div className="admin-products-detail-section">
                        <h4>Returns Policy</h4>
                        <p>{selectedProduct.returns}</p>
                      </div>
                    )}
                    {selectedProduct.variant &&
                      selectedProduct.variant.length > 0 && (
                        <div className="admin-products-detail-section">
                          <h4>Variants</h4>
                          <ul className="admin-products-variant-list">
                            {selectedProduct.variant.map((variant, index) => (
                              <li key={index}>{variant}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              ) : (
                renderFormBody()
              )}
            </div>
            {!isDetailView && (
              <div className="admin-products-modal-footer">
                <button
                  className="admin-products-btn-save"
                  onClick={isAddMode ? handleCreate : handleUpdate}
                >
                  {isAddMode ? 'Create Product' : 'Save Changes'}
                </button>
                <button
                  className="admin-products-btn-cancel"
                  onClick={() => {
                    setSelectedProduct(null);
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

export default AdminProducts;

// src/components/PhotoForm/PhotoForm.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPhoto, updatePhotoThunk } from '../../redux/photos';
import './PhotoForm.css';

function PhotoForm({ photo = {}, formType, onSuccess }) {
  const dispatch = useDispatch();

  // If editing, prefill fields
  const [imageUrl, setImageUrl] = useState(photo.image_url || '');
  const [caption, setCaption] = useState(photo.caption || '');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};
    if (!imageUrl) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!/^https?:\/\/.+/.test(imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL starting with http:// or https://';
    }
    
    if (caption && caption.length > 500) {
      newErrors.caption = 'Caption must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const payload = {
      image_url: imageUrl,
      caption,
    };

    let result;
    try {
      if (formType === 'create') {
        result = await dispatch(createPhoto(payload));
      } else if (formType === 'edit') {
        result = await dispatch(updatePhotoThunk(photo.id, payload));
      }

      if (result && result.errors) {
        // handle backend validation errors
        const backendErrors = {};
        Object.entries(result.errors).forEach(([key, value]) => {
          backendErrors[key] = value;
        });
        setErrors(backendErrors);
      } else {
        // success callback, e.g., close modal or redirect
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error('Error submitting photo:', error);
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="photo-form">
      {errors.general && (
        <div className="error-message general-error">{errors.general}</div>
      )}
      
      <div className="form-group">
        <label htmlFor="image-url">Image URL</label>
        <input
          id="image-url"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/your-image.jpg"
          className={errors.imageUrl ? 'error-input' : ''}
        />
        {errors.imageUrl && (
          <div className="error-message">{errors.imageUrl}</div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="caption">Caption</label>
        <textarea
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Add a caption to your photo..."
          className={errors.caption ? 'error-input' : ''}
          rows="4"
        />
        {errors.caption && (
          <div className="error-message">{errors.caption}</div>
        )}
        <div className="character-count">
          {caption.length}/500 characters
        </div>
      </div>
      
      <button 
        type="submit" 
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : (formType === 'create' ? 'Post Photo' : 'Update Photo')}
      </button>
    </form>
  );
}

export default PhotoForm;

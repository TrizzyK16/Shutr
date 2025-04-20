// src/components/PhotoList/DeletePhotoButton.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePhotoThunk, fetchPhotos } from '../../redux/photos';
import { useModal } from '../../context/Modal';
import './PhotoList.css';

function ConfirmDeleteModal({ photoId, onClose }) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    
    try {
      const result = await dispatch(deletePhotoThunk(photoId));
      
      if (result && result.success) {
        // Refresh the photos list after successful deletion
        dispatch(fetchPhotos());
        onClose();
      } else if (result && result.errors) {
        // Handle error from the thunk
        const errorMessage = Array.isArray(result.errors) 
          ? result.errors.join(', ') 
          : typeof result.errors === 'object'
            ? Object.values(result.errors).join(', ')
            : 'Failed to delete photo';
        setError(errorMessage);
      } else {
        setError('An unexpected error occurred');
      }
    } catch (err) {
      console.error('Error in handleDelete:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="confirm-delete-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this photo?</p>
      <p>This action cannot be undone.</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="confirm-buttons">
        <button 
          onClick={onClose} 
          className="cancel-button" 
          disabled={isDeleting}
        >
          Cancel
        </button>
        <button 
          onClick={handleDelete} 
          className="delete-confirm-button"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

function DeletePhotoButton({ photoId }) {
  const { setModalContent, closeModal } = useModal();

  const openDeleteModal = () => {
    setModalContent(
      <ConfirmDeleteModal 
        photoId={photoId} 
        onClose={closeModal} 
      />
    );
  };

  return (
    <button onClick={openDeleteModal} className="delete-button">
      Delete
    </button>
  );
}

export default DeletePhotoButton;

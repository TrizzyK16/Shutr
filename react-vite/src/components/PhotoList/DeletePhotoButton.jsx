// src/components/PhotoList/DeletePhotoButton.jsx
import { useDispatch } from 'react-redux';
import { deletePhotoThunk } from '../../redux/photos';
import { useModal } from '../../context/Modal';
import './PhotoList.css';

function ConfirmDeleteModal({ photoId, onClose }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deletePhotoThunk(photoId));
    onClose();
  };

  return (
    <div className="confirm-delete-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this photo?</p>
      <p>This action cannot be undone.</p>
      
      <div className="confirm-buttons">
        <button onClick={onClose} className="cancel-button">Cancel</button>
        <button onClick={handleDelete} className="delete-confirm-button">Delete</button>
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

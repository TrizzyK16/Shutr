// src/components/PhotoList/DeletePhotoButton.jsx
import { useDispatch } from 'react-redux';
import { deletePhoto } from '../../redux/photos';

function DeletePhotoButton({ photoId }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deletePhoto(photoId));
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeletePhotoButton;

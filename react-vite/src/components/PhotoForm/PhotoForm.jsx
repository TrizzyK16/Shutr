// src/components/PhotoForm/PhotoForm.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPhoto, updatePhoto } from '../../redux/photos';

function PhotoForm({ photo = {}, formType, onSuccess }) {
  const dispatch = useDispatch();

  // If editing, prefill fields
  const [imageUrl, setImageUrl] = useState(photo.image_url || '');
  const [caption, setCaption] = useState(photo.caption || '');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      image_url: imageUrl,
      caption,
    };

    let result;
    if (formType === 'create') {
      result = await dispatch(createPhoto(payload));
    } else if (formType === 'edit') {
      result = await dispatch(updatePhoto(photo.id, payload));
    }

    if (!result || result.errors) {
      // handle backend validation errors
      setErrors(result?.errors || ["An error occurred"]);
    } else {
      // success callback, e.g., close modal or redirect
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Image URL
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
      <label>
        Caption
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </label>
      <button type="submit">
        {formType === 'create' ? 'Post Photo' : 'Update Photo'}
      </button>
    </form>
  );
}

export default PhotoForm;

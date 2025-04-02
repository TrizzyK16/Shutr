// src/components/EditPhotoPage/EditPhotoPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../../redux/photos';
import PhotoForm from '../PhotoForm/PhotoForm';
import './EditPhotoPage.css';

function EditPhotoPage() {
  const { photoId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  const currentUser = useSelector(state => state.session.user);
  const photos = useSelector(state => state.photos);
  const photo = photos[photoId];
  
  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchPhotos());
      setIsLoading(false);
    };
    
    loadData();
  }, [dispatch, photoId]);
  
  useEffect(() => {
    // Check if photo exists and belongs to current user after loading
    if (!isLoading) {
      if (!photo) {
        setNotFound(true);
      } else if (!currentUser || photo.user_id !== currentUser.id) {
        // Redirect if not the owner
        navigate('/photos');
      }
    }
  }, [photo, currentUser, isLoading, navigate]);
  
  const handleSuccess = () => {
    navigate('/photos?tab=yours');
  };
  
  if (isLoading) {
    return (
      <div className="edit-photo-page">
        <div className="loading-container">
          <p>Loading photo...</p>
        </div>
      </div>
    );
  }
  
  if (notFound) {
    return (
      <div className="edit-photo-page">
        <div className="not-found-container">
          <h2>Photo Not Found</h2>
          <p>The photo you&apos;re trying to edit doesn&apos;t exist or has been removed.</p>
          <button onClick={() => navigate('/photos')} className="back-button">
            Back to Photos
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="edit-photo-page">
      <div className="edit-photo-container">
        <h2>Update Your Photo</h2>
        <div className="photo-preview">
          <img src={photo.image_url} alt="Current" />
        </div>
        <PhotoForm 
          photo={photo} 
          formType="edit" 
          onSuccess={handleSuccess} 
        />
      </div>
    </div>
  );
}

export default EditPhotoPage;

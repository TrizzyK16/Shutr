// src/components/PhotosPage/PhotosPage.jsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PhotoList from '../PhotoList/PhotoList';
import PhotoForm from '../PhotoForm/PhotoForm';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import './PhotosPage.css';

function PhotoModal({ onClose }) {
  return (
    <div className="photo-modal">
      <h2>Upload a New Photo</h2>
      <PhotoForm 
        formType="create" 
        onSuccess={() => {
          onClose();
        }} 
      />
    </div>
  );
}

function PhotosPage() {
  const user = useSelector(state => state.session.user);
  const [activeTab, setActiveTab] = useState('explore');

  return (
    <div className="photos-page">
      {/* Hero section with background image */}
      <div className="photos-hero">
        <div className="photos-hero__content">
          <h1 className="photos-hero__title">Shutr Photos</h1>
          <p className="photos-hero__subtitle">Discover and share incredible photography from around the world</p>
          {user && (
            <div className="photos-hero__cta">
              <OpenModalButton
                buttonText="Upload New Photo"
                modalComponent={<PhotoModal onClose={() => {}} />}
                className="hero-upload-button"
              />
            </div>
          )}
        </div>
      </div>

      <div className="photos-content">
        <div className="photos-tabs">
          <button 
            className={`tab-button ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveTab('explore')}
          >
            Explore All Photos
          </button>
          {user && (
            <button 
              className={`tab-button ${activeTab === 'yours' ? 'active' : ''}`}
              onClick={() => setActiveTab('yours')}
            >
              Your Photos
            </button>
          )}
        </div>

        <div className="tab-description">
          {activeTab === 'explore' ? (
            <p>Browse the latest photos shared by the Shutr community</p>
          ) : (
            <p>View and manage your personal photo collection</p>
          )}
        </div>

        <div className="photos-container">
          {activeTab === 'explore' ? (
            <PhotoList />
          ) : (
            user ? (
              <div className="your-photos">
                <PhotoList userOnly={true} />
              </div>
            ) : (
              <div className="login-prompt">
                <p>Please log in to view your photos</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default PhotosPage;

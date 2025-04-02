import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import './JoinGroupModal.css';

function JoinGroupModal({ group }) {
  const sessionUser = useSelector(state => state.session.user);
  const { closeModal } = useModal();
  const [isJoining, setIsJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleJoinGroup = async () => {
    // If user is not logged in, they should see the login/signup options
    if (!sessionUser) return;

    setIsJoining(true);
    
    // Simulate joining a group (this would be an API call in a real app)
    setTimeout(() => {
      setIsJoining(false);
      setJoined(true);
      
      // Close modal after showing success message
      setTimeout(() => {
        closeModal();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="join-group-modal">
      <h2>Join {group.name}</h2>
      
      {!sessionUser ? (
        <div className="join-group-modal__auth">
          <p>You need to be logged in to join this group.</p>
          <div className="join-group-modal__buttons">
            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
              className="form-button"
            />
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
              className="form-button primary"
            />
          </div>
        </div>
      ) : joined ? (
        <div className="join-group-modal__success">
          <div className="join-group-modal__success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <p>You have successfully joined {group.name}!</p>
        </div>
      ) : (
        <div className="join-group-modal__content">
          <div className="join-group-modal__info">
            <p><strong>Members:</strong> {group.members}</p>
            <p><strong>Photos:</strong> {group.photos}</p>
            <p>{group.description}</p>
          </div>
          <p className="join-group-modal__terms">
            By joining this group, you agree to follow the group rules and community guidelines.
          </p>
          <button 
            className="form-button primary join-button" 
            onClick={handleJoinGroup}
            disabled={isJoining}
          >
            {isJoining ? (
              <>
                <span className="spinner"></span>
                Joining...
              </>
            ) : (
              'Join Group'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default JoinGroupModal;

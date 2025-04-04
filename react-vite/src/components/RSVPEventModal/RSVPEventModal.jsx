import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import './RSVPEventModal.css';

function RSVPEventModal({ event }) {
  const sessionUser = useSelector(state => state.session.user);
  const { closeModal } = useModal();
  const [isRSVPing, setIsRSVPing] = useState(false);
  const [rsvped, setRSVPed] = useState(false);

  const handleRSVP = async () => {
    // If user is not logged in, they should see the login/signup options
    if (!sessionUser) return;

    setIsRSVPing(true);
    
    // Simulate RSVP to an event (this would be an API call in a real app)
    setTimeout(() => {
      setIsRSVPing(false);
      setRSVPed(true);
      
      // Close modal after showing success message
      setTimeout(() => {
        closeModal();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="rsvp-event-modal">
      <h2>RSVP to {event.title}</h2>
      
      {!sessionUser ? (
        <div className="rsvp-event-modal__auth">
          <p>You need to be logged in to RSVP to this event.</p>
          <div className="rsvp-event-modal__buttons">
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
      ) : rsvped ? (
        <div className="rsvp-event-modal__success">
          <div className="rsvp-event-modal__success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <p>You have successfully RSVP&apos;d to {event.title}!</p>
          <p className="rsvp-event-modal__success-details">
            <strong>Date:</strong> {event.date}<br />
            <strong>Location:</strong> {event.location}
          </p>
        </div>
      ) : (
        <div className="rsvp-event-modal__content">
          <div className="rsvp-event-modal__info">
            <div className="rsvp-event-modal__details">
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
            </div>
            <p>{event.description}</p>
          </div>
          <button 
            className="form-button primary rsvp-button" 
            onClick={handleRSVP}
            disabled={isRSVPing}
          >
            {isRSVPing ? (
              <>
                <span className="spinner"></span>
                Confirming...
              </>
            ) : (
              'Confirm RSVP'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default RSVPEventModal;

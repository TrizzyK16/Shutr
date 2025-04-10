import { useState, useContext, createContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import './Modal.css';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null);
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modalContent && (
        <div id="modal">
          <div id="modal-background" onClick={closeModal} />
          <div id="modal-content">
            <button className="modal-close-button" onClick={closeModal}>
              <FaTimes />
            </button>
            {modalContent}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function Modal() {
  return null;
}

export const useModal = () => useContext(ModalContext);

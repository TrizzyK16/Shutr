import { useState, useContext, createContext } from 'react';
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
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
        {modalContent && (
          <div id="modal">
            <div id="modal-background" onClick={closeModal} />
            <div id="modal-content">
              {modalContent}
            </div>
          </div>
        )}
      </ModalContext.Provider>
    </>
  );
}

export function Modal() {
  // This component doesn't need to do anything anymore
  // as the modal rendering is handled directly in the provider
  return null;
}

export const useModal = () => useContext(ModalContext);

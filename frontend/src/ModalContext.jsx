import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [showJoinModal, setShowJoinModal] = useState(false);

  const openJoinModal = () => setShowJoinModal(true);
  const closeJoinModal = () => setShowJoinModal(false);

  return (
    <ModalContext.Provider value={{ showJoinModal, openJoinModal, closeJoinModal }}>
      {children}
    </ModalContext.Provider>
  );
};

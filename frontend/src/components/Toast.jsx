import React from 'react';

function Toast({ show, title, message, onClose }) {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      <div className="toast-icon">✓</div>
      <div className="toast-content">
        <h4>{title}</h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Toast;

import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Toast = ({ message, type = 'info', onClose, duration = 3000, show }) => {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose, show]);

  if (!show) return null;

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor[type]} text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in`}>
      <div className="flex items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
          aria-label="Close toast"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
  show: PropTypes.bool.isRequired,
};
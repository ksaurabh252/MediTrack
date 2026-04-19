import { useEffect } from "react";
import PropTypes from "prop-types";

// ============ BUTTON ============
export const Button = ({
  children,
  onClick = () => { },
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
  };
  const sizes = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""
        }`
        .trim()
        .replace(/\s+/g, " ")}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
};

// ============ CARD ============
export const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-4 ${className}`}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// ============ MODAL ============
export const Modal = ({ isOpen, onClose, children, title, size = "md" }) => {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full ${sizeClasses[size]} bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-lg`}
      >
        <div className="flex justify-between items-center border-b dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
};

// ============ TOAST ============
export const Toast = ({
  message,
  type = "info",
  onClose,
  duration = 3000,
  show,
}) => {
  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose, show]);

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColor[type]} text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in`}
    >
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
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
  show: PropTypes.bool.isRequired,
};
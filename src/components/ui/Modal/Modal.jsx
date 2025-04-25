import PropTypes from "prop-types";

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
        className={`w-full ${sizeClasses[size]} bg-white rounded-lg shadow-lg`}
      >
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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

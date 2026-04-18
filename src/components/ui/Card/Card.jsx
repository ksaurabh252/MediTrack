import PropTypes from "prop-types";

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-4  ${className}`}>
      {children}
    </div>
  );
};


Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};


import PropTypes from "prop-types";

/**
 * Reusable Button component with multiple variants, sizes, and states
 * Supports primary, secondary, danger, and success styling variants
 */
export const Button = ({
  children,
  onClick = () => { },
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
}) => {
  // Define color schemes for different button variants
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
  };

  // Define size variations for padding and text
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
      className={`
        rounded-md font-medium transition-colors 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `
        .trim()
        .replace(/\s+/g, " ")} // Clean up whitespace in className
    >
      {children}
    </button>
  );
}

// PropTypes validation for component props
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
};

// Default props (optional - already handled in destructuring)
Button.defaultProps = {
  onClick: () => { },
  variant: "primary",
  size: "md",
  className: "",
  type: "button",
  disabled: false,
};

import PropTypes from 'prop-types';

/**
 * ReminderBadge component displays a status badge with optional count
 * for medication reminders with color-coded styling based on status
 */
const ReminderBadge = ({ status, count }) => {
  // Define color schemes for different reminder statuses
  // Each status has a light background with darker text for accessibility
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',   // Yellow for pending reminders
    taken: 'bg-green-100 text-green-800',       // Green for completed reminders
    missed: 'bg-red-100 text-red-800',          // Red for missed reminders
    snoozed: 'bg-blue-100 text-blue-800',       // Blue for snoozed reminders
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800' // Fallback to gray for unknown status
        }`}
    >
      {/* Display status in uppercase with optional count in parentheses */}
      {status.toUpperCase()} {count > 0 ? `(${count})` : ''}
    </span>
  );
};

// PropTypes validation for component props
ReminderBadge.propTypes = {
  status: PropTypes.oneOf(['pending', 'taken', 'missed', 'snoozed']).isRequired,
  count: PropTypes.number, // Optional count parameter
};

export default ReminderBadge;

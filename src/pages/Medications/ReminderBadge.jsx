import React from 'react';
import PropTypes from 'prop-types';

/**
 * ReminderBadge component displays a status badge with optional count
 * for medication reminders with color-coded styling based on status.
 * Memoized with React.memo to avoid unnecessary re-renders.
 */
const ReminderBadge = React.memo(({ status, count }) => {
  // Define color schemes for different reminder statuses
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',   // Yellow for pending reminders
    taken: 'bg-green-100 text-green-800',       // Green for completed reminders
    missed: 'bg-red-100 text-red-800',          // Red for missed reminders
    snoozed: 'bg-blue-100 text-blue-800',       // Blue for snoozed reminders
  };

  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800'; // fallback

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      {/* Display status in uppercase with optional count */}
      {status.toUpperCase()} {count && count > 0 ? `(${count})` : ''}
    </span>
  );
});

ReminderBadge.displayName = 'ReminderBadge'; // helps in debugging React.memo

// PropTypes validation for component props
ReminderBadge.propTypes = {
  status: PropTypes.oneOf(['pending', 'taken', 'missed', 'snoozed']).isRequired,
  count: PropTypes.number, // Optional count parameter
};

export default ReminderBadge;
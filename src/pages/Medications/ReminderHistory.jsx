import PropTypes from 'prop-types';
import { format } from 'date-fns';

/**
 * ReminderHistory component displays a chronological list of reminder actions
 * Shows action details, timestamps, and status with color-coded indicators
 */
const ReminderHistory = ({ history }) => {
  return (
    <div className="mt-4 border rounded-lg overflow-hidden">
      {/* Header section with title */}
      <h3 className="p-3 bg-gray-50 font-medium">Reminder History</h3>

      {/* History list with dividers between items */}
      <ul className="divide-y divide-gray-200">
        {history.map((item, index) => (
          <li key={index} className="p-3 hover:bg-gray-50">
            <div className="flex justify-between items-center">
              {/* Left side: Action description and formatted timestamp */}
              <div>
                <p className="text-sm font-medium">{item.action}</p>
                <p className="text-xs text-gray-500">
                  {/* Format timestamp to readable date and time */}
                  {format(new Date(item.timestamp), 'MMM dd, yyyy - h:mm a')}
                </p>
              </div>

              {/* Right side: Status badge with conditional styling */}
              <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'taken'
                  ? 'bg-green-100 text-green-800'    // Green for taken
                  : item.status === 'missed'
                    ? 'bg-red-100 text-red-800'      // Red for missed
                    : 'bg-yellow-100 text-yellow-800' // Yellow for snoozed (default)
                }`}>
                {item.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// PropTypes validation for component props
ReminderHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string.isRequired,      // Description of the action taken
      timestamp: PropTypes.string.isRequired,   // ISO string or date string
      status: PropTypes.oneOf(['taken', 'missed', 'snoozed']).isRequired, // Action status
    })
  ).isRequired,
};

export default ReminderHistory;

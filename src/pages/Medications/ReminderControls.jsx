import PropTypes from 'prop-types';
import { Button } from '../../components/ui/Button/Button';

/**
 * ReminderControls component provides action buttons for managing medication reminders
 * Includes quick snooze options, custom snooze, and status update controls
 */
const ReminderControls = ({
  onQuickSnooze,
  onCustomSnooze,
  onMarkTaken,
  onMarkMissed
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {/* Quick snooze button for 5 minutes */}
      <Button
        variant="secondary"
        onClick={() => onQuickSnooze(5)}
        className="text-sm py-1 px-2"
      >
        Snooze 5min
      </Button>

      {/* Quick snooze button for 15 minutes */}
      <Button
        variant="secondary"
        onClick={() => onQuickSnooze(15)}
        className="text-sm py-1 px-2"
      >
        Snooze 15min
      </Button>

      {/* Custom snooze button for user-defined duration */}
      <Button
        variant="secondary"
        onClick={onCustomSnooze}
        className="text-sm py-1 px-2"
      >
        Custom Snooze
      </Button>

      {/* Mark medication as taken button */}
      {/* stopPropagation prevents event bubbling to parent elements */}
      <Button
        variant="success"
        onClick={(e) => {
          e.stopPropagation();
          onMarkTaken();
        }}
        className="text-sm py-1 px-2"
      >
        Mark Taken
      </Button>

      {/* Mark medication as missed button */}
      <Button
        variant="danger"
        onClick={onMarkMissed}
        className="text-sm py-1 px-2"
      >
        Mark Missed
      </Button>
    </div>
  );
};

// PropTypes validation for component props
ReminderControls.propTypes = {
  onQuickSnooze: PropTypes.func.isRequired,    // Function to handle quick snooze with duration
  onCustomSnooze: PropTypes.func.isRequired,   // Function to handle custom snooze dialog
  onMarkTaken: PropTypes.func.isRequired,      // Function to mark reminder as taken
  onMarkMissed: PropTypes.func.isRequired,     // Function to mark reminder as missed
};

export default ReminderControls;

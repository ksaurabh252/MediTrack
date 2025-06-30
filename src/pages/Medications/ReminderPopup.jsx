import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components/ui/Button/Button';

// ReminderPopup component displays a modal popup for medication reminders
const ReminderPopup = ({
  medication,
  onSnooze,
  onMarkTaken,
  onMarkMissed
}) => {
  // State to manage snooze duration (in minutes)
  const [snoozeMinutes, setSnoozeMinutes] = useState(10);
  // State to control popup visibility
  const [isOpen, setIsOpen] = useState(true);

  // Handler to close the popup
  const handleClose = () => setIsOpen(false);

  // If popup is closed, render nothing
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        {/* Header section with title and current time */}
        <div className="bg-indigo-600 p-4 text-white">
          <h3 className="text-lg font-bold">Medication Reminder</h3>
          <p className="text-sm opacity-90">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Main content section */}
        <div className="p-4 space-y-3">
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className="bg-indigo-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            {/* Medication details */}
            <div>
              <h4 className="font-bold text-lg">{medication.name}</h4>
              <p className="text-gray-600">
                {medication.dosage}{medication.dosageUnit} • {medication.frequency}
              </p>
              {/* Optional instructions */}
              {medication.instructions && (
                <p className="mt-1 text-sm">Note: {medication.instructions}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {/* Mark as Taken button */}
            <Button variant="success" onClick={() => {
              onMarkTaken();
              handleClose();
            }}>
              Taken
            </Button>

            {/* Snooze controls: select and button */}
            <div className="flex space-x-2">
              <select
                value={snoozeMinutes}
                onChange={(e) => setSnoozeMinutes(Number(e.target.value))}
                className="flex-1 border rounded focus:ring-2 focus:ring-indigo-500"
              >
                {/* Snooze options */}
                {[5, 10, 15, 30, 60].map((mins) => (
                  <option key={mins} value={mins}>{mins} min</option>
                ))}
              </select>
              <Button variant="secondary" onClick={() => {
                onSnooze(snoozeMinutes);
                handleClose();
              }}>
                Snooze
              </Button>
            </div>

            {/* Mark as Missed button */}
            <Button
              variant="danger"
              onClick={() => {
                onMarkMissed();
                handleClose();
              }}
              className="col-span-2 py-2"
            >
              Mark as Missed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes for type checking of props
ReminderPopup.propTypes = {
  medication: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dosage: PropTypes.number.isRequired,
    dosageUnit: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
    instructions: PropTypes.string,
  }).isRequired,
  onSnooze: PropTypes.func.isRequired,
  onMarkTaken: PropTypes.func.isRequired,
  onMarkMissed: PropTypes.func.isRequired,
};

export default ReminderPopup;

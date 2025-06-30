import { useEffect, useState } from 'react';
import ReminderPopup from './ReminderPopup';
import ReminderBadge from './ReminderBadge';
import ReminderHistory from './ReminderHistory';
import ReminderControls from './ReminderControls';

// Test page to demonstrate and test Reminder components
export default function ReminderTestPage() {
  // State to control visibility of the ReminderPopup
  const [showPopup, setShowPopup] = useState(true);
  // State to keep track of reminder action history
  const [history, setHistory] = useState([]);

  // Log history updates to the console for debugging
  useEffect(() => {
    console.log('History updated:', history);
  }, [history]);

  // Example medication data for testing
  const testMedication = {
    id: 'test-123',
    name: 'Ibuprofen',
    dosage: 200,
    dosageUnit: 'mg',
    frequency: 'Twice daily',
    instructions: 'Take with food'
  };

  // Handler for all reminder actions (snooze, taken, missed)
  const handleAction = (action, minutes) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] Action: ${action}`, minutes ? `for ${minutes} mins` : '');

    // Create a new history entry based on the action
    const newEntry = {
      action: action === 'snooze' ? `Snoozed for ${minutes} minutes` : `Marked as ${action}`,
      timestamp: new Date().toISOString(),
      status: action === 'snooze' ? 'snoozed' : action
    };
    // Update the history state
    setHistory([...history, newEntry]);
    console.log(`Action: ${action}`, minutes ? `for ${minutes} mins` : '');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reminder Components Test</h1>

      <div className="space-y-8">
        {/* Section to test ReminderBadge component with different statuses */}
        <section>
          <h2 className="text-xl font-semibold mb-4">ReminderBadge</h2>
          <div className="flex gap-4">
            <ReminderBadge status="pending" />
            <ReminderBadge status="taken" count={3} />
            <ReminderBadge status="missed" count={1} />
            <ReminderBadge status="snoozed" />
          </div>
        </section>

        {/* Section to test ReminderControls component */}
        <section>
          <h2 className="text-xl font-semibold mb-4">ReminderControls</h2>
          <ReminderControls
            onQuickSnooze={(mins) => handleAction('snooze', mins)}
            onCustomSnooze={() => handleAction('snooze', 30)}
            onMarkTaken={() => {
              handleAction('taken');
              // Hide popup after marking as taken
              setTimeout(() => setShowPopup(false), 1000);
            }}
            onMarkMissed={() => handleAction('missed')}
          />
        </section>

        {/* Section to test ReminderHistory component */}
        <section>
          <h2 className="text-xl font-semibold mb-4">ReminderHistory</h2>
          <ReminderHistory history={history} />
        </section>

        {/* Section to test ReminderPopup component */}
        <section>
          <h2 className="text-xl font-semibold mb-4">ReminderPopup</h2>
          {/* Button to show the ReminderPopup */}
          <button
            onClick={() => setShowPopup(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Show Reminder Popup
          </button>
          {/* Render the ReminderPopup if showPopup is true */}
          {showPopup && (
            <ReminderPopup
              medication={testMedication}
              onSnooze={(mins) => {
                handleAction('snooze', mins);
                setShowPopup(false);
              }}
              onMarkTaken={() => {
                handleAction('taken');
                setShowPopup(false);
              }}
              onMarkMissed={() => {
                handleAction('missed');
                setShowPopup(false);
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
}

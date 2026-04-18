import { Outlet } from 'react-router-dom';
import { useReminders } from '../hooks/useReminders';
import DoseReminder from '../components/medications/DoseReminder';
import { useDispatch, useSelector } from 'react-redux';

import Footer from './Footer';
import Header from './Header';


export default function MedicationLayout() {
  const { medications, pendingReminders } = useSelector(state => state.medications);
  const dispatch = useDispatch();

  // Initialize reminder system for all medication routes
  useReminders(medications, dispatch);

  const handleReminderAction = (medId, action, snoozeMinutes = 0) => {
    dispatch({
      type: 'medications/handleReminderAction',
      payload: { medId, action, snoozeMinutes }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header Component */}
      <Header />

      <main className="flex-grow p-4">
        {/* Main content and medication reminders */}
        <div className="relative">
          <Outlet />

          {pendingReminders.map(medId => {
            const medication = medications.find(m => m.id === medId);
            return medication ? (
              <DoseReminder
                key={medId}
                medication={medication}
                onMarkTaken={() => handleReminderAction(medId, 'taken')}
                onSnooze={(mins) => handleReminderAction(medId, 'snooze', mins)}
                onMarkMissed={() => handleReminderAction(medId, 'missed')}
              />
            ) : null;
          })}
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

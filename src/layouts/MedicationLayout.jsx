import { Outlet } from 'react-router-dom';
import { useReminders } from '../hooks/useReminders';
import DoseReminder from '../components/medications/DoseReminder';
import { useDispatch, useSelector } from 'react-redux';

import Footer from './Footer';
import { Toast } from '../components/ui/Toast/Toast';
import Header from './Header';
import { useState } from 'react';


export default function MedicationLayout() {
  const { medications, pendingReminders } = useSelector(state => state.medications);
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'info'
  });

  // Initialize reminder system for all medication routes
  useReminders(medications, dispatch);

  const handleReminderAction = (medId, action, snoozeMinutes = 0) => {
    dispatch({
      type: 'medications/handleReminderAction',
      payload: { medId, action, snoozeMinutes }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Component */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

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
      <Footer darkMode={darkMode} />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

import { useCallback, useEffect } from "react";
import { useNotification } from "./useNotifications";

export const useReminders = (medications, dispatch) => {
  const { showNotification, requestPermission } = useNotification();

  // Check reminders every minute
  const checkReminders = useCallback(() => {
    const now = new Date();

    medications.forEach(async (med) => {
      if (
        med.nextDoseTime &&
        new Date(med.nextDoseTime) <= now &&
        !med.isTaken
      ) {
        // Request permission only when needed
        const permission = await requestPermission();
        if (permission === "granted") {
          showNotification(`Time to take ${med.name}`, {
            body: `${med.dosage}${med.dosageUnit} - ${med.instructions || ""}`,
            tag: med.id,
            medicationId: med.id,
            actions: [
              { action: "taken", title: "Mark as Taken" },
              { action: "snooze", title: "Snooze" },
            ],
          });
          dispatch({ type: "medications/showReminder", payload: med.id });
        }
      }
    });
  }, [medications, showNotification, dispatch, requestPermission]);

  useEffect(() => {
    const interval = setInterval(checkReminders, 60000); // Check every minute
    checkReminders(); // Initial check on mount

    return () => clearInterval(interval);
  }, [checkReminders]);
};

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMedications,
  addMedication,
  updateMedication,
  deleteMedication,
} from "../../api/medications";

const initialState = {
  medications: [],
  pendingReminders: [],
  loading: false,
  error: null,
  lastReminderCheck: null,
};

const medsSlice = createSlice({
  name: "medications",
  initialState,
  reducers: {
    handleReminderAction: (state, action) => {
      const {
        medId,
        action: reminderAction,
        snoozeMinutes = 0,
      } = action.payload;

      state.pendingReminders = state.pendingReminders.filter(
        (id) => id !== medId
      );

      const medication = state.medications.find((m) => m.id === medId);
      if (!medication) return;

      const now = new Date().toISOString();

      switch (reminderAction) {
        case "taken":
          // Update dosage history
          medication.dosageHistory = medication.dosageHistory || [];
          medication.dosageHistory.push({
            date: now,
            dosage: medication.dosage,
            changedBy: "Patient",
          });
          medication.lastTaken = now;
          break;

        case "snooze": {
          // Calculate new reminder time (default 10 minutes)
          const snoozeMs = snoozeMinutes * 60000;
          medication.nextDoseTime = new Date(
            Date.now() + snoozeMs
          ).toISOString();
          break;
        }

        case "missed":
          medication.missedDoses = (medication.missedDoses || 0) + 1;
          break;

        default:
          break;
      }
    },

    // Add medication to pending reminders
    showReminder: (state, action) => {
      const medId = action.payload;
      if (!state.pendingReminders.includes(medId)) {
        state.pendingReminders.push(medId);
      }
    },

    // Reset reminders
    clearReminders: (state) => {
      state.pendingReminders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedications.fulfilled, (state, action) => {
        state.loading = false;
        // Initialize reminder times for new medications
        state.medications = action.payload.map((med) => ({
          ...med,
          nextDoseTime: med.nextDoseTime || calculateNextDoseTime(med),
          lastTaken: med.lastTaken || null,
        }));
        state.lastReminderCheck = new Date().toISOString();
      })
      .addCase(fetchMedications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Medication
      .addCase(addMedication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMedication.fulfilled, (state, action) => {
        state.loading = false;
        const newMed = {
          ...action.payload,
          nextDoseTime: calculateNextDoseTime(action.payload),
          lastTaken: null,
        };
        state.medications.push(newMed);
      })
      .addCase(addMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Medication
      .addCase(updateMedication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMedication.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.medications.findIndex(
          (med) => med.id === action.payload.id
        );
        if (index !== -1) {
          // Preserve reminder-related fields
          state.medications[index] = {
            ...action.payload,
            nextDoseTime:
              action.payload.nextDoseTime ||
              state.medications[index].nextDoseTime,
            lastTaken: state.medications[index].lastTaken,
            dosageHistory: state.medications[index].dosageHistory || [],
          };
        }
      })
      .addCase(updateMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Medication
      .addCase(deleteMedication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedication.fulfilled, (state, action) => {
        state.loading = false;
        state.medications = state.medications.filter(
          (med) => med.id !== action.payload
        );
        state.pendingReminders = state.pendingReminders.filter(
          (id) => id !== action.payload
        );
      })
      .addCase(deleteMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Helper function to calculate next dose time
function calculateNextDoseTime(medication) {
  if (!medication.schedule) return null;

  const now = new Date();
  const { pattern, customDays } = medication.schedule;

  switch (pattern) {
    case "daily":
      return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

    case "weekly": {
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return nextWeek.toISOString();
    }
    case "custom":
      if (customDays?.length) {
        // Find next custom day
        const today = now.getDay(); // 0-6 (Sun-Sat)
        const nextDay = customDays.find((day) => day > today) || customDays[0];
        const daysToAdd =
          nextDay > today ? nextDay - today : 7 - today + nextDay;
        return new Date(
          now.getTime() + daysToAdd * 24 * 60 * 60 * 1000
        ).toISOString();
      }
      return null;

    default:
      return null;
  }
}

export const { handleReminderAction, showReminder, clearReminders } =
  medsSlice.actions;

export default medsSlice.reducer;

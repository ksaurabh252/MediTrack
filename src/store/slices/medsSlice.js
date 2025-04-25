import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMedications,
  addMedication,
  updateMedication,
  deleteMedication,
} from "../../api/medications";

const initialState = {
  medications: [],
  loading: false,
  error: null,
};

const medsSlice = createSlice({
  name: "medications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedications.fulfilled, (state, action) => {
        state.loading = false;
        state.medications = action.payload;
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
        state.medications.push(action.payload);
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
          state.medications[index] = action.payload;
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
      })
      .addCase(deleteMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default medsSlice.reducer;

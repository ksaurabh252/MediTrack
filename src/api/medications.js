import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://unit-4-7dc0a-default-rtdb.firebaseio.com";

// Utility functions
const toISOString = () => new Date().toISOString();
const toNumber = (value) => Number(value);

export const fetchMedications = createAsyncThunk(
  "medications/fetchMedications",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/medications.json`);
      if (response.data) {
        return Object.entries(response.data).map(([id, medication]) => ({
          id,
          ...medication,
        }));
      }
      return [];
    } catch (error) {
      console.error("Fetching medications error:", error);
      throw error;
    }
  }
);

export const addMedication = createAsyncThunk(
  "medications/addMedication",
  async (medicationData) => {
    try {
      const dosageHistory = [
        {
          date: toISOString(),
          dosage: toNumber(medicationData.dosage),
          changedBy: "System",
        },
      ];

      const processedData = {
        ...medicationData,
        schedule: {
          pattern: medicationData.schedule?.pattern || "daily",
          customDays: medicationData.schedule?.customDays || [],
          exceptions:
            medicationData.schedule?.exceptions?.map((date) =>
              new Date(date).toISOString()
            ) || [],
        },
        dosageHistory,
        dosage: toNumber(medicationData.dosage),
        quantity: toNumber(medicationData.quantity),
        refillsRemaining: toNumber(medicationData.refillsRemaining),
        createdAt: toISOString(),
        updatedAt: toISOString(),
      };

      const response = await axios.post(
        `${BASE_URL}/medications.json`,
        processedData
      );

      return {
        id: response.data.name,
        ...processedData,
      };
    } catch (error) {
      console.error("Adding medication error:", error);
      throw error;
    }
  }
);

export const updateMedication = createAsyncThunk(
  "medications/updateMedication",
  async ({ id, ...medicationData }) => {
    try {
      const updatedMedication = {
        ...medicationData,
        updatedAt: toISOString(),
      };
      await axios.patch(
        `${BASE_URL}/medications/${id}.json`,
        updatedMedication
      );
      return { id, ...updatedMedication };
    } catch (error) {
      console.error("Updating medication error:", error);
      throw error;
    }
  }
);

export const deleteMedication = createAsyncThunk(
  "medications/deleteMedication",
  async (id) => {
    try {
      await axios.delete(`${BASE_URL}/medications/${id}.json`);
      return id;
    } catch (error) {
      console.error("Deleting medication error:", error);
      throw error;
    }
  }
);

import axios from "axios";

const BASE_URL = "https://unit-4-7dc0a-default-rtdb.firebaseio.com";

export const fetchMedications = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/medications.json`);
    if (response.data) {
      // Transform Firebase object to array with IDs
      return Object.entries(response.data).map(([id, medication]) => ({
        id,
        ...medication,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching medications:", error);
    throw new Error(`Failed to fetch medications:${error.message}`);
  }
};

export const addMedication = async (medicationData) => {
  try {
    const processedData = {
      ...medicationData,
      dosage: Number(medicationData.dosage),
      quantity: Number(medicationData.quantity),
      refilling: Number(medicationData.refillsRemaining),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 2. Make POST request to Firebase
    const response = await axios.post(
      `${BASE_URL}/medications.json`,
      processedData
    );

    // 3. Return the complete medication object with ID
    return {
      id: response.data.name,
      ...processedData,
    };
  } catch (error) {
    console.error("Error adding medication:", error);

    // 4. Enhance error handling
    const errorMessage = error.response?.data?.error || error.message;
    throw new Error(`Failed to add medication: ${errorMessage}`);
  }
};

export const updateMedication = async (id, medicationData) => {
  try {
    const updatedMedication = {
      ...medicationData,
      updatedAt: new Date().toISOString(),
    };
    await axios.patch(`${BASE_URL}/medications/${id}.json`, updatedMedication);

    return { id, ...updatedMedication };
  } catch (error) {
    console.error("Error updating medication:", error);
    throw new Error(`Failed to update medication: ${error.message}`);
  }
};

export const deleteMedication = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/medications/${id}.json`);
    return id;
  } catch (error) {
    console.error("Error deleting medication:", error);
    throw new Error(`Failed to delete medication: ${error.message}`);
  }
};

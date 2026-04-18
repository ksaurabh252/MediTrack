import { createSlice } from "@reduxjs/toolkit";

const loadProfile = () => {
  try {
    const saved = localStorage.getItem("meditrack_profile");
    if (!saved) {
      return {
        personalInfo: {
          name: "",
          email: "",
          phone: "",
          address: "",
          dob: "",
          gender: "",
        },
        healthDetails: {
          bloodType: "",
          allergies: [],
          conditions: [],
          height: "",
          weight: "",
        },
        doctors: [],
        status: "idle",
      };
    }

    const parsed = JSON.parse(saved);

    // Validate structure
    if (!parsed.personalInfo || !parsed.healthDetails) {
      return {
        personalInfo: {
          name: "",
          email: "",
          phone: "",
          address: "",
          dob: "",
          gender: "",
        },
        healthDetails: {
          bloodType: "",
          allergies: [],
          conditions: [],
          height: "",
          weight: "",
        },
        doctors: [],
        status: "idle",
      };
    }

    return parsed;
  } catch (error) {
    console.error("Failed to load profile:", error);
    // Clear corrupted data
    localStorage.removeItem("meditrack_profile");

    return {
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        gender: "",
      },
      healthDetails: {
        bloodType: "",
        allergies: [],
        conditions: [],
        height: "",
        weight: "",
      },
      doctors: [],
      status: "idle",
    };
  }
};

const initialState = loadProfile();

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updatePersonalInfo(state, action) {
      state.personalInfo = {
        ...state.personalInfo,
        ...action.payload,
      };
      localStorage.setItem("meditrack_profile", JSON.stringify(state));
    },
    updateHealthDetails(state, action) {
      state.healthDetails = {
        ...state.healthDetails,
        ...action.payload,
      };
      localStorage.setItem("meditrack_profile", JSON.stringify(state));
    },
    addDoctor(state, action) {
      state.doctors.push(action.payload);
      localStorage.setItem("meditrack_profile", JSON.stringify(state));
    },
    removeDoctor(state, action) {
      state.doctors = state.doctors.filter((d) => d.id !== action.payload);
      localStorage.setItem("meditrack_profile", JSON.stringify(state));
    },
    resetProfile(state) {
      const defaultState = {
        personalInfo: {
          name: "",
          email: "",
          phone: "",
          address: "",
          dob: "",
          gender: "",
        },
        healthDetails: {
          bloodType: "",
          allergies: [],
          conditions: [],
          height: "",
          weight: "",
        },
        doctors: [],
        status: "idle",
      };
      Object.assign(state, defaultState);
      localStorage.removeItem("meditrack_profile");
    },
  },
});

export const {
  updatePersonalInfo,
  updateHealthDetails,
  addDoctor,
  removeDoctor,
  resetProfile,
} = profileSlice.actions;

export default profileSlice.reducer;

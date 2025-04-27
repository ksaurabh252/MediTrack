import { configureStore } from "@reduxjs/toolkit";
import medsReducer from "../store/slices/medsSlice";
import profileReducer from "./slices/profileSlice";
// import { composeWithDevTools } from "@redux-devtools/extension";

//  Redux store
export const store = configureStore({
  reducer: {
    medications: medsReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.timestamp"],

        ignoredPaths: ["medications.pendingReminders"],
      },
    }),
});

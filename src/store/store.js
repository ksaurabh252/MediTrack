import { configureStore } from "@reduxjs/toolkit";
import medsReducer from "../store/slices/medsSlice";
// import { composeWithDevTools } from "@redux-devtools/extension";

//  Redux store
export const store = configureStore({
  reducer: {
    medications: medsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.timestamp"],

        ignoredPaths: ["medications.pendingReminders"],
      },
    }),
});

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AIInteractionPopup from './popup/popup';
import ProtectedRoute from './components/ProtectedRoute';
import { Suspense, lazy } from 'react';

// ✅ Lazy Loaded Pages/Layouts
const LandingPage = lazy(() => import("./pages/homePage/HomePage"));
const MedicationLayout = lazy(() => import("./layouts/MedicationLayout"));
const AddMedicationPage = lazy(() => import("./pages/Medications/AddMedicationPage"));
const MedicationList = lazy(() => import("./pages/Medications/MedicationList"));
const PrescriptionPage = lazy(() => import("./pages/Prescriptions/PrescriptionPage"));
const ProfilePage = lazy(() => import("./pages/Profile/ProfilePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const ReminderTestPage = lazy(() => import("./pages/Medications/ReminderTestPage"));

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ToastProvider>
          <ThemeProvider>
            <BrowserRouter>
              <AIInteractionPopup />
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-screen">
                    <p>Loading...</p>
                  </div>
                }
              >
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/medications" element={<MedicationLayout />}>
                      <Route index element={<MedicationList />} />
                      <Route path="add" element={<AddMedicationPage />} />
                      <Route path="edit/:id" element={<AddMedicationPage />} />
                    </Route>

                    <Route
                      path="/prescriptions"
                      element={<PrescriptionPage />}
                    />
                    <Route path="/profile" element={<ProfilePage />} />
                  </Route>

                  {/* Test + 404 */}
                  <Route
                    path="/test-reminders"
                    element={<ReminderTestPage />}
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ThemeProvider>
        </ToastProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
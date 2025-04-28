import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import LandingPage from './pages/homePage/HomePage';
import MedicationLayout from './layouts/MedicationLayout';
import AddMedicationPage from './pages/Medications/AddMedicationPage';
import { MedicationList } from './pages/Medications/MedicationList';
import PrescriptionPage from './pages/Prescriptions/PrescriptionPage';
import ProfilePage from './pages/Profile/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';
import { useEffect, useState } from 'react';
import AIInteractionPopup from './popup/popup';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check user's preferred color scheme
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <AIInteractionPopup />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/medications" element={<MedicationLayout darkMode={darkMode} setDarkMode={setDarkMode} />}>
                <Route index element={<MedicationList />} />
                <Route path="add" element={<AddMedicationPage />} />
                <Route path="edit/:id" element={<AddMedicationPage />} />
              </Route>

              <Route path="/prescriptions" element={<PrescriptionPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path="/profile" element={<ProfilePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;

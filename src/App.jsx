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
  }, [darkMode]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AIInteractionPopup />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage darkMode={darkMode} setDarkMode={setDarkMode} />} />

          {/* Medication Routes with Reminder System */}
          <Route path="/medications" element={<MedicationLayout darkMode={darkMode} setDarkMode={setDarkMode} />}>

            <Route index element={<MedicationList />} />

            <Route path="add" element={<AddMedicationPage />} />

            <Route path="edit/:id" element={<AddMedicationPage />} />
          </Route>

          {/* Other Routes */}
          <Route path="/prescriptions" element={<PrescriptionPage darkMode={darkMode} setDarkMode={setDarkMode} />} />


          <Route path="/profile" element={<ProfilePage darkMode={darkMode} setDarkMode={setDarkMode} />} />

          {/* 404 Handling */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

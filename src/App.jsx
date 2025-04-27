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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          {/* Medication Routes with Reminder System */}
          <Route path="/medications" element={<MedicationLayout />}>
            <Route index element={<MedicationList />} />
            <Route path="add" element={<AddMedicationPage />} />
            <Route path="edit/:id" element={<AddMedicationPage />} />
          </Route>

          {/* Other Routes */}
          <Route path="/prescriptions" element={<PrescriptionPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* 404 Handling */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

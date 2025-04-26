import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/homePage/HomePage';
import { MedicationList } from './pages/Medications/MedicationList';
import AddMedicationPage from './pages/Medications/AddMedicationPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/medications" element={<MedicationList />} />
        <Route path="/medications/add" element={<AddMedicationPage />} />
        <Route path="/medications/edit/:id" element={<AddMedicationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePersonalInfo,
  updateHealthDetails,
  addDoctor,
  removeDoctor,
} from "../../store/slices/profileSlice";
import { Card } from "../../components/ui/Card/Card";
import { useToast } from "../../hooks/useToast";
import PersonalInfoForm from "./PersonalInfoForm";
import HealthDetailsForm from "./HealthDetailsForm";
import DoctorsList from "./DoctorsList";
import DoctorForm from "./DoctorForm";
import { Modal } from "../../components/ui/Modal/Modal";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import PropTypes from "prop-types";

export default function ProfilePage({ darkMode, setDarkMode }) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleSavePersonalInfo = (data) => {
    dispatch(updatePersonalInfo(data));
    showToast("Personal information updated", "success");
  };

  const handleSaveHealthDetails = (data) => {
    dispatch(updateHealthDetails(data));
    showToast("Health details updated", "success");
  };

  const handleAddDoctor = (doctor) => {
    dispatch(
      addDoctor({
        ...doctor,
        id: Date.now(),
      })
    );
    setShowDoctorModal(false);
    showToast("Doctor added successfully", "success");
  };

  const handleRemoveDoctor = (id) => {
    dispatch(removeDoctor(id));
    showToast("Doctor removed", "success");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>

        <div className="flex mb-6 border-b">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "personal" ? "border-b-2 border-blue-500" : ""
              }`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Info
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "health" ? "border-b-2 border-blue-500" : ""
              }`}
            onClick={() => setActiveTab("health")}
          >
            Health Details
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "doctors" ? "border-b-2 border-blue-500" : ""
              }`}
            onClick={() => setActiveTab("doctors")}
          >
            My Doctors
          </button>
        </div>

        <Card className="p-6">
          {activeTab === "personal" && (
            <PersonalInfoForm
              initialData={profile.personalInfo}
              onSave={handleSavePersonalInfo}
            />
          )}

          {activeTab === "health" && (
            <HealthDetailsForm
              initialData={profile.healthDetails}
              onSave={handleSaveHealthDetails}
            />
          )}

          {activeTab === "doctors" && (
            <DoctorsList
              doctors={profile.doctors}
              onAdd={() => setShowDoctorModal(true)}
              onRemove={handleRemoveDoctor}
            />
          )}
        </Card>

        <Modal
          isOpen={showDoctorModal}
          onClose={() => setShowDoctorModal(false)}
          title="Add New Doctor"
        >
          <DoctorForm
            onSubmit={handleAddDoctor}
            onCancel={() => setShowDoctorModal(false)}
          />
        </Modal>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}

ProfilePage.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

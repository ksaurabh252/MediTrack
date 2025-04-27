# MediTrack - Prescription and Medication Management Tool

MediTrack is a modern, responsive web application designed to help users effortlessly manage their medications. It focuses on providing timely reminders, simplifying prescription renewals, and offering a clear history of medication usage, ultimately enhancing patient adherence and improving health outcomes.

## Project Structure

Meditrack/
├── api/
│ ├── auth.js
│ ├── medications.js
│ └── prescriptions.js
├── assets/
│ ├── fonts/
│ ├── styles/
│ │ ├── base/
│ │ │ └── base.css
│ │ ├── components/
│ │ │ └── button.module.css
│ │ └── themes/
│ │ └── default.css
│ └── react.svg
├── components/
│ ├── dashboard/
│ │ ├── MedicationCard.jsx
│ │ └── StatsWidget.jsx
│ ├── medications/
│ │ ├── DosageCalculator.jsx
│ │ ├── DoseReminder.jsx
│ │ ├── MedicationDetails.jsx
│ │ ├── MedicationForm.jsx
│ │ └── SchedulePicker.jsx
│ ├── notifications/
│ │ ├── AlertBanner.jsx
│ │ ├── FileUpload.jsx
│ │ └── Toast.jsx
│ └── ui/
│ ├── Button/
│ │ └── Button.jsx
│ ├── Card/
│ │ └── Card.jsx
│ ├── Modal/
│ │ └── Modal.jsx
│ └── Toast/
│ └── Toast.jsx
├── config/
│ ├── constants.js
│ └── routes.js
├── contexts/
│ ├── AuthContext.jsx
│ └── MedicationContext.jsx
├── hooks/
│ ├── useMedications.js
│ ├── useNotifications.js
│ ├── useReminders.js
│ └── useToast.js
├── layouts/
│ ├── AuthLayout.jsx
│ ├── Footer.jsx
│ ├── Header.jsx
│ ├── MainLayout.jsx
│ └── MedicationLayout.jsx
├── pages/
│ ├── Auth/
│ │ ├── Login.jsx
│ │ └── Register.jsx
│ ├── Dashboard/
│ │ └── Dashboard.jsx
│ ├── homePage/
│ │ ├── HomePage.jsx
│ │ └── HomePage.module.css
│ ├── Medications/
│ │ ├── AddMedicationPage.jsx
│ │ ├── DosageInput.jsx
│ │ ├── MedicationDetails.jsx
│ │ └── MedicationList.jsx
│ ├── Prescriptions/
│ │ ├── PrescriptionPage.jsx
│ │ └── Prescriptions.jsx
│ ├── Profile/
│ │ └── ProfilePage.jsx
│ └── NotFoundPage.jsx
├── store/
│ ├── slices/
│ │ ├── authSlice.js
│ │ └── medsSlice.js
│ └── store.js
├── utils/
│ ├── dateUtils.js
│ ├── notificationUtils.js
│ └── validation.js
├── App.css
├── App.jsx
├── index.css
├── index.jsx
├── main.jsx
└── serviceWorker.js

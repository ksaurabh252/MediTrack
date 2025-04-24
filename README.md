# MediTrack - Prescription and Medication Management Tool

MediTrack is a modern, responsive web application designed to help users effortlessly manage their medications. It focuses on providing timely reminders, simplifying prescription renewals, and offering a clear history of medication usage, ultimately enhancing patient adherence and improving health outcomes.

## Project Structure

MediTrack
├── .env
├── .env.development
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
├── public
│ ├── index.html
│ ├── manifest.json
│ ├── robots.txt
│ ├── vite.svg
│ └── assets
│ ├── icons
│ └── logos
└── src
├── App.css
├── App.jsx
├── index.css
├── index.jsx
├── main.jsx
├── serviceWorker.js
├── api
│ ├── auth.js
│ ├── medications.js
│ └── prescriptions.js
├── assets
│ ├── react.svg
│ ├── fonts
│ └── styles
│ ├── base
│ │ └── base.css
│ ├── components
│ │ └── button.module.css
│ └── themes
│ └── default.css
├── components
│ ├── dashboard
│ │ ├── MedicationCard.jsx
│ │ └── StatsWidget.jsx
│ ├── medications
│ │ ├── DoseReminder.jsx
│ │ └── SchedulePicker.jsx
│ ├── notifications
│ │ ├── AlertBanner.jsx
│ │ ├── FileUpload.jsx
│ │ └── Toast.jsx
│ └── ui
│ ├── Button
│ │ └── Button.jsx
│ ├── Card
│ │ └── Card.jsx
│ └── Modal
│ └── Modal.jsx
├── config
│ ├── constants.js
│ └── routes.js
├── contexts
│ ├── AuthContext.jsx
│ └── MedicationContext.jsx
├── hooks
│ ├── useMedications.js
│ └── useNotifications.js
├── layouts
│ ├── AuthLayout.jsx
│ └── MainLayout.jsx
├── pages
│ ├── Auth
│ │ ├── Login.jsx
│ │ └── Register.jsx
│ ├── Dashboard
│ │ └── Dashboard.jsx
│ ├── Medications
│ │ ├── AddMedication.jsx
│ │ └── MedicationList.jsx
│ ├── Prescriptions
│ │ └── Prescriptions.jsx
│ └── Profile
│ └── Profile.jsx
├── store
│ ├── store.js
│ └── slices
│ ├── authSlice.js
│ └── medsSlice.js
└── utils
├── dateUtils.js
├── notificationUtils.js
└── validation.js

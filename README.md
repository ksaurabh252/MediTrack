# MediTrack - Prescription and Medication Management Tool

MediTrack is a modern, responsive web application designed to help users effortlessly manage their medications. It focuses on providing timely reminders, simplifying prescription renewals, and offering a clear history of medication usage, ultimately enhancing patient adherence and improving health outcomes.

## Key Features

### ✅ Implemented Features

- **Medication Management**

  - Complete CRUD operations for medications
  - Dosage calculation tools (weight-based)
  - Custom scheduling (daily, weekly, custom days)
  - One-time dose exceptions

- **Reminder System**

  - Browser notifications with permission handling
  - Interactive reminder popups
  - Snooze functionality (5, 10, 15, 30, 60 mins)
  - Missed dose tracking

- **Prescription Module**

  - Document upload (PDF/Images)
  - File validation (type, size)
  - Renewal status tracking
  - Basic preview functionality

- **Core Infrastructure**
  - React 18 + Vite
  - Redux Toolkit state management
  - Tailwind CSS styling
  - Responsive layout
  - Dark mode support

### 🚧 Upcoming Features

- Advanced prescription analytics
- Doctor communication interface
- Medication adherence reports
- Mobile app integration

## Technical Stack

**Frontend**

- React 18 + Hooks
- Redux Toolkit
- React Router 6
- Tailwind CSS + HeadlessUI
- Date-fns for date handling

**Backend**

- Firebase Realtime Database (current)
- REST API ready architecture

## Getting Started

### Prerequisites

- Node.js v16+
- npm/yarn

### Installation

```bash
git clone https://github.com/ksaurabh252/MediTrack
cd meditrack
npm install

npm run build

## Project Structure

Meditrack/
├── api/
│   ├── auth.js
│   ├── medications.js
│   └── prescriptions.js
├── assets/
│   ├── fonts/
│   ├── styles/
│   │   ├── base/
│   │   │   └── base.css
│   │   ├── components/
│   │   │   └── button.module.css
│   │   └── themes/
│   │       └── default.css
│   └── react.svg
├── components/
│   ├── dashboard/
│   │   ├── MedicationCard.jsx
│   │   └── StatsWidget.jsx
│   ├── medications/
│   │   ├── DosageCalculator.jsx
│   │   ├── DoseReminder.jsx
│   │   ├── MedicationDetails.jsx
│   │   ├── MedicationForm.jsx
│   │   └── SchedulePicker.jsx
│   ├── notifications/
│   │   ├── AlertBanner.jsx
│   │   ├── FileUpload.jsx
│   │   └── Toast.jsx
│   └── ui/
│       ├── Button/
│       │   └── Button.jsx
│       ├── Card/
│       │   └── Card.jsx
│       ├── Modal/
│       │   └── Modal.jsx
│       └── Toast/
│           └── Toast.jsx
├── config/
│   ├── constants.js
│   └── routes.js
├── contexts/
│   ├── AuthContext.jsx
│   └── MedicationContext.jsx
├── hooks/
│   ├── useMedications.js
│   ├── useNotifications.js
│   ├── usePersistProfile.js
│   ├── useReminders.js
│   └── useToast.js
├── layouts/
│   ├── AuthLayout.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── MainLayout.jsx
│   └── MedicationLayout.jsx
├── pages/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── Dashboard/
│   │   └── Dashboard.jsx
│   ├── homePage/
│   │   ├── HomePage.jsx
│   │   └── HomePage.module.css
│   ├── Medications/
│   │   ├── AddMedicationPage.jsx
│   │   ├── DosageInput.jsx
│   │   ├── MedicationDetails.jsx
│   │   └── MedicationList.jsx
│   ├── Prescriptions/
│   │   ├── PrescriptionPage.jsx
│   │   └── Prescriptions.jsx
│   ├── Profile/
│   │   ├── DoctorForm.jsx
│   │   ├── DoctorsList.jsx
│   │   ├── HealthDetailsForm.jsx
│   │   ├── PersonalInfoForm.jsx
│   │   └── ProfilePage.jsx
│   └── NotFoundPage.jsx
├── popup/
│   └── popup.jsx
├── store/
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── medsSlice.js
│   │   └── profileSlice.js
│   └── store.js
├── utils/
│   ├── dateUtils.js
│   ├── notificationUtils.js
│   └── validation.js
├── App.css
├── App.jsx
├── index.css
├── index.jsx
├── main.jsx
└── serviceWorker.js
```

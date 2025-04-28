# MediTrack - Prescription and Medication Management Tool

MediTrack is a modern, responsive web application designed to help users effortlessly manage their medications. It focuses on providing timely reminders, simplifying prescription renewals, and offering a clear history of medication usage, ultimately enhancing patient adherence and improving health outcomes.

## Key Features

### ✅ Implemented Features

- **Authentication System**

  - Secure login/register flows with form validation
  - Session persistence with Firebase Auth
  - Protected routes for authenticated users
  - Toast notifications for auth actions

- **Dark Mode**

  - System preference detection
  - Manual toggle with state persistence
  - Full UI theming support (all components)
  - Smooth transition animations

- **Medication Management**

  - Complete CRUD operations for medications
  - Dosage calculation tools (weight-based)
  - Custom scheduling (daily, weekly, custom days)
  - One-time dose exceptions
  - Dosage history tracking

- **Reminder System**

  - Browser notifications with permission handling
  - Interactive reminder popups
  - Snooze functionality (5, 10, 15, 30, 60 mins)
  - Missed dose tracking

- **Prescription Module**

  - Document upload (PDF/Images)
  - File validation (type, size)
  - Renewal status tracking
  - Document preview functionality

- **AI Assistant**

  - Context-aware medication queries
  - Gemini API integration
  - Persistent chat history
  - Dark mode compatible

- **Core Infrastructure**
  - React 18 + Vite
  - Redux Toolkit state management
  - React Router 6
  - Tailwind CSS with dark mode
  - Responsive layout

### 🚧 Upcoming Features

- Advanced prescription analytics
- Doctor communication interface
- Medication adherence reports
- Mobile app integration
- Social login options (Google, etc.)
- Password reset functionality

## Technical Stack

**Frontend**

- React 18 + Hooks
- Redux Toolkit
- React Router 6
- Tailwind CSS + HeadlessUI
- Date-fns for date handling
- React Toastify for notifications

**Backend**

- Firebase Realtime Database
- Firebase Authentication
- REST API ready architecture

**AI Integration**

- Google Gemini API
- Context-aware chat interface

## Getting Started

### Prerequisites

- Node.js v16+
- npm/yarn
- Firebase project (for auth and database)
- Google API key (for AI features)

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/ksaurabh252/MediTrack](https://github.com/ksaurabh252/MediTrack)
   cd meditrack
   ```

# Project Contributions

This project was built collaboratively by a team of developers. Each member contributed to specific parts of the application as outlined below:

- **Divyansh Chandel**  
  Vinayak was responsible for the complete integration of AI features within the application. He handled the setup, API integration, and the interaction between the AI model and the user interface.

- **Saurabh Kumar**  
  Saurabh Kumar contributed to the development of all other remaining features of the application, ensuring the core functionalities, UI/UX enhancements, and backend connectivity were properly implemented.

- **Swagata Dhara**  
  Swagta developed the authentication system, including both the login and registration functionalities. He worked on designing secure user authentication flows and managing user sessions.

---

## Acknowledgment

We acknowledge the efforts of every team member who contributed significantly to completing this project within the timeline.

Meditrack/
├── api/
│ ├── auth.js
│ ├── medications.js
│ └── prescriptions.js
├── assets/
│ ├── fonts/
│ └── styles/
│ ├── base/
│ │ └── base.css
│ ├── components/
│ │ └── button.module.css
│ └── themes/
│ └── default.css
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
│ │ └── Toast.jsx
│ ├── ui/
│ │ ├── Button/
│ │ │ └── Button.jsx
│ │ ├── Card/
│ │ │ └── Card.jsx
│ │ ├── Modal/
│ │ │ └── Modal.jsx
│ │ └── Toast/
│ │ └── Toast.jsx
│ ├── Login.jsx
│ ├── ProtectedRoute.jsx
│ └── Register.jsx
├── config/
│ ├── constants.js
│ ├── firebase.js
│ └── routes.js
├── contexts/
│ ├── AuthContext.jsx
│ └── MedicationContext.jsx
├── hooks/
│ ├── useMedications.js
│ ├── useNotifications.js
│ ├── usePersistProfile.js
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
│ │ ├── DoctorForm.jsx
│ │ ├── DoctorsList.jsx
│ │ ├── HealthDetailsForm.jsx
│ │ ├── PersonalInfoForm.jsx
│ │ └── ProfilePage.jsx
│ └── NotFoundPage.jsx
├── popup/
│ └── popup.jsx
├── store/
│ ├── slices/
│ │ ├── authSlice.js
│ │ ├── medsSlice.js
│ │ └── profileSlice.js
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

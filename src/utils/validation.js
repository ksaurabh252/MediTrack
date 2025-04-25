export const validateMedication = (data) => {
  const errors = {};

  if (typeof data.name !== "string" || !data.name.trim()) {
    errors.name = "Medication name is required";
  } else if (!/^[A-Za-z]/.test(data.name.trim())) {
    errors.name = "Medication name must start with a letter";
  }

  if (isNaN(data.dosage)) {
    errors.dosage = "Dosage must be a number";
  } else if (Number(data.dosage) <= 0) {
    errors.dosage = "Dosage must be greater than 0";
  }

  if (isNaN(data.quantity)) {
    errors.quantity = "Quantity must be a number";
  } else if (Number(data.quantity) <= 0) {
    errors.quantity = "Quantity must be greater than 0";
  }

  if (!data.startDate) {
    errors.startDate = "Start date is required";
  }

  if (!data.patientName?.trim()) {
    errors.patientName = "Patient name is required";
  } else if (!/^[A-Za-z]/.test(data.patientName.trim())) {
    errors.patientName = "Patient name must start with a letter";
  }

  return errors;
};

import { useState } from "react";
import PropTypes from "prop-types";
import { SchedulePicker } from "./SchedulePicker";
import { DosageInput } from "../../pages/Medications/DosageInput";
import { validateMedication } from "../../utils/validation";
import { Button } from "../ui/Button/Button";

export const MedicationForm = ({
  initialData = {},
  onSave = () => { },
  onCancel = () => { },
  isLoading = false,
}) => {
  // Main form state
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    type: initialData.type || "tablet",
    dosage: initialData.dosage || "",
    dosageUnit: initialData.dosageUnit || "mg",
    frequency: initialData.frequency || "Once",
    quantity: initialData.quantity || "",
    startDate: initialData.startDate || "",
    endDate: initialData.endDate || "",
    prescribedBy: initialData.prescribedBy || "",
    patientName: initialData.patientName || "",
    refillsRemaining: initialData.refillsRemaining || 0,
    instructions: initialData.instructions || "",
    isActive: initialData.isActive !== undefined ? initialData.isActive : true,
  });

  // Schedule state
  const [schedule, setSchedule] = useState(
    initialData.schedule || {
      pattern: "daily",
      customDays: [],
      exceptions: [],
    }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedData = {
      ...formData,
      schedule,
      dosage: formData.dosage ? Number(formData.dosage) : 0,
      quantity: formData.quantity ? Number(formData.quantity) : 0,
      refillsRemaining: formData.refillsRemaining
        ? Number(formData.refillsRemaining)
        : 0,
    };

    const validationErrors = validateMedication(processedData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(processedData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[80vh] overflow-y-auto pr-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
        {/* Medication Name */}
        <div>
          <label className="block mb-1">Medication Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Medication Type */}
        <div>
          <label className="block mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="tablet">Tablet</option>
            <option value="capsule">Capsule</option>
            <option value="syrup">Syrup</option>
            <option value="injection">Injection</option>
            <option value="cream">Cream</option>
          </select>
        </div>

        {/* Dosage Input */}
        <div>
          <label className="block mb-1">Dosage*</label>
          <DosageInput
            value={formData.dosage}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, dosage: value }))
            }
            unit={formData.dosageUnit}
            onUnitChange={(e) =>
              setFormData((prev) => ({ ...prev, dosageUnit: e.target.value }))
            }
          />
          {errors.dosage && (
            <p className="text-red-500 text-sm mt-1">{errors.dosage}</p>
          )}
        </div>

        {/* Frequency */}
        <div>
          <label className="block mb-1">Frequency*</label>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Once">Once daily</option>
            <option value="Twice">Twice daily</option>
            <option value="Thrice">Three times daily</option>
            <option value="Weekly">Weekly</option>
            <option value="As Needed">As needed</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1">Quantity*</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            min="1"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1">Start Date*</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Prescribed By */}
        <div>
          <label className="block mb-1">Prescribed By</label>
          <input
            type="text"
            name="prescribedBy"
            value={formData.prescribedBy}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Patient Name */}
        <div>
          <label className="block mb-1">Patient Name*</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.patientName && (
            <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>
          )}
        </div>

        {/* Refills Remaining */}
        <div>
          <label className="block mb-1">Refills Remaining</label>
          <input
            type="number"
            name="refillsRemaining"
            value={formData.refillsRemaining}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>

        {/* Schedule Picker - Full Width */}
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-2">Medication Schedule</h3>
          <SchedulePicker
            schedule={schedule}
            onChange={(newSchedule) => {
              setSchedule(newSchedule);
              setFormData((prev) => ({
                ...prev,
                schedule: newSchedule,
              }));
            }}
          />
        </div>

        {/* Instructions - Full Width */}
        <div className="md:col-span-2">
          <label className="block mb-1">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        {/* Active Status - Full Width */}
        <div className="md:col-span-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Is Active</span>
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4  sticky bottom-0 bg-white p-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Medication"}
        </Button>
      </div>
    </form>
  );
};

MedicationForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    dosage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dosageUnit: PropTypes.string,
    frequency: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    prescribedBy: PropTypes.string,
    patientName: PropTypes.string,
    refillsRemaining: PropTypes.number,
    instructions: PropTypes.string,
    isActive: PropTypes.bool,
    schedule: PropTypes.shape({
      pattern: PropTypes.string,
      customDays: PropTypes.arrayOf(PropTypes.number),
      exceptions: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

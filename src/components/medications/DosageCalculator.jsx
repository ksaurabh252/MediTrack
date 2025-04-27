import PropTypes from 'prop-types';
import { useState } from 'react';

export const DosageCalculator = ({ weight = 0, onDosageCalculated }) => {
  const [selectedMedication, setSelectedMedication] = useState('');
  const [dosagePerKg, setDosagePerKg] = useState(0);
  const [calculatedDosage, setCalculatedDosage] = useState(0);

  const commonMedications = [
    { name: 'Ibuprofen', range: '5-10 mg/kg', typical: 7.5 },
    { name: 'Paracetamol', range: '10-15 mg/kg', typical: 12.5 },
    { name: 'Amoxicillin', range: '20-40 mg/kg', typical: 30 },
  ];

  const calculateDosage = () => {
    if (weight > 0 && dosagePerKg > 0) {
      const dosage = (weight * dosagePerKg).toFixed(2);
      setCalculatedDosage(parseFloat(dosage));
    }
  };

  const handleApply = () => {
    if (calculatedDosage > 0) {
      onDosageCalculated(calculatedDosage);
    }
  };

  const handleMedicationSelect = (medName) => {
    setSelectedMedication(medName);
    const med = commonMedications.find(m => m.name === medName);
    if (med) setDosagePerKg(med.typical);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-2">
      <h4 className="font-medium mb-3">Dosage Calculator</h4>

      <div className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Common Medications</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedMedication}
            onChange={(e) => handleMedicationSelect(e.target.value)}
          >
            <option value="">Select medication</option>
            {commonMedications.map((med, index) => (
              <option key={index} value={med.name}>
                {med.name} ({med.range})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Patient Weight (kg)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={weight || ''}
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Dosage per kg (mg/kg)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={dosagePerKg}
            onChange={(e) => setDosagePerKg(parseFloat(e.target.value) || 0)}
            step="0.1"
            min="0"
          />
        </div>

        <button
          onClick={calculateDosage}
          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          disabled={!weight || weight <= 0}
        >
          Calculate
        </button>

        {calculatedDosage > 0 && (
          <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-100">
            <p className="font-medium">Recommended Dosage: {calculatedDosage}mg</p>
            <button
              onClick={handleApply}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Apply to Medication
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

DosageCalculator.propTypes = {
  weight: PropTypes.number,
  onDosageCalculated: PropTypes.func.isRequired,
};

export default DosageCalculator;
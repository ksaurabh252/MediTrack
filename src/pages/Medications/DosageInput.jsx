import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { DosageCalculator } from "../../components/medications/DosageCalculator";

export const DosageInput = ({
  value = 0,
  onChange,
  unit = "mg",
  onUnitChange,
  maxDosage = 1000,
}) => {
  const [localDosage, setLocalDosage] = useState(value);
  const [showCalculator, setShowCalculator] = useState(false);
  const [patientWeight, setPatientWeight] = useState("");

  const numericWeight = patientWeight ? parseFloat(patientWeight) : 0;

  const handleIncrement = () => {
    const newValue = Math.min(Number(localDosage) + 1, maxDosage);
    setLocalDosage(newValue);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(Number(localDosage) - 1, 0);
    setLocalDosage(newValue);
    onChange(newValue);
  };

  // Sync local state with prop changes
  useEffect(() => {
    setLocalDosage(value);
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleDecrement}
          className="px-3 py-1 bg-gray-200 rounded-l-lg hover:bg-gray-300"
          aria-label="Decrease dosage"
        >
          -
        </button>

        <div className="flex-1 flex">
          <input
            type="number"
            value={localDosage}
            onChange={(e) => {
              const val = Math.min(Number(e.target.value), maxDosage);
              setLocalDosage(isNaN(val) ? 0 : val);
              onChange(isNaN(val) ? 0 : val);
            }}
            className="w-full p-2 border-t border-b text-center"
            min="0"
            max={maxDosage}
            step="0.1"
          />

          <select
            value={unit}
            onChange={onUnitChange}
            className="border rounded-r-lg p-2"
          >
            <option value="mg">mg</option>
            <option value="ml">ml</option>
            <option value="g">g</option>
            <option value="tsp">tsp</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          className="px-3 py-1 bg-gray-200 rounded-r-lg hover:bg-gray-300"
          aria-label="Increase dosage"
        >
          +
        </button>
      </div>

      {localDosage > maxDosage * 0.8 && (
        <div className="text-yellow-600 text-sm flex items-center">
          ⚠️ Approaching maximum dosage ({maxDosage} {unit})
        </div>
      )}

      <div className="flex justify-between items-center mt-2">
        <button
          type="button"
          onClick={() => setShowCalculator(!showCalculator)}
          className="text-blue-500 text-sm hover:underline"
        >
          {showCalculator ? "Hide Calculator" : "Dosage Calculator"}
        </button>

        <input
          type="number"
          placeholder="Weight (kg)"
          value={patientWeight}
          onChange={(e) =>
            setPatientWeight(e.target.value.replace(/[^0-9.]/g, ""))
          }
          className="w-24 p-1 border rounded text-sm"
          min="0"
          step="0.1"
        />
      </div>

      {showCalculator && (
        <DosageCalculator
          weight={numericWeight}
          onDosageCalculated={(dosage) => {
            const numDosage = parseFloat(dosage);
            if (!isNaN(numDosage)) {
              setLocalDosage(numDosage);
              onChange(numDosage);
            }
            setShowCalculator(false);
          }}
        />
      )}
    </div>
  );
};

DosageInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  unit: PropTypes.string,
  onUnitChange: PropTypes.func.isRequired,
  maxDosage: PropTypes.number,
};

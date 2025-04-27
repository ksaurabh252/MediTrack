import PropTypes from "prop-types";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export const SchedulePicker = ({ schedule, onChange }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [recurrence, setRecurrence] = useState("daily");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDaySelect = (day) => {
    const isSelected = selectedDays.some(
      (d) => d.toDateString() === day.toDateString()
    );

    const newDays = isSelected
      ? selectedDays.filter((d) => d.toDateString() !== day.toDateString())
      : [...selectedDays, day];

    setSelectedDays(newDays);
    onChange({ ...schedule, exceptions: newDays });
  };

  return (
    <div className="space-y-4">
      {/* Recurrence Pattern */}
      <div>
        <label className="block mb-1">Recurrence Pattern</label>
        <select
          value={recurrence}
          onChange={(e) => {
            setRecurrence(e.target.value);
            onChange({ ...schedule, pattern: e.target.value });
          }}
          className="w-full p-2 border rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="custom">Custom Days</option>
        </select>
      </div>

      {/* Custom Days Selection (shown when recurrence is 'custom') */}
      {recurrence === "custom" && (
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
            <button
              key={day}
              type="button"
              className={`p-2 border rounded ${schedule.customDays?.includes(i)
                  ? "bg-blue-100 border-blue-500"
                  : ""
                }`}
              onClick={() => {
                const newDays = schedule.customDays?.includes(i)
                  ? schedule.customDays.filter((d) => d !== i)
                  : [...(schedule.customDays || []), i];
                onChange({ ...schedule, customDays: newDays });
              }}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      {/* One-time Exceptions */}
      <div>
        <button
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
          className="text-blue-500 text-sm"
        >
          {showCalendar ? "Hide Calendar" : "Add One-time Exceptions"}
        </button>

        {showCalendar && (
          <div className="mt-2 p-4 border rounded">
            <DayPicker
              mode="multiple"
              selected={selectedDays}
              onSelect={handleDaySelect}
              modifiers={{
                selected: selectedDays,
              }}
            />
            {selectedDays.length > 0 && (
              <div className="mt-2">
                <h4 className="font-medium">Selected Exceptions:</h4>
                <ul className="list-disc pl-5">
                  {selectedDays.map((day, i) => (
                    <li key={i}>{day.toLocaleDateString()}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

SchedulePicker.propTypes = {
  schedule: PropTypes.shape({
    pattern: PropTypes.string,
    customDays: PropTypes.arrayOf(PropTypes.number),
    exceptions: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

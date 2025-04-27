import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components/ui/Button/Button';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function HealthDetailsForm({ initialData = {}, onSave }) {
  const [formData, setFormData] = useState({
    bloodType: initialData.bloodType || '',
    allergies: Array.isArray(initialData.allergies) ? initialData.allergies.join(', ') : (initialData.allergies || ''),
    conditions: Array.isArray(initialData.conditions) ? initialData.conditions.join(', ') : (initialData.conditions || ''),
    height: initialData.height || '',
    weight: initialData.weight || '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Blood Type</label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Blood Type</option>
            {bloodTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Allergies</label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Comma separated list"
          />
        </div>

        <div>
          <label className="block mb-1">Medical Conditions</label>
          <input
            type="text"
            name="conditions"
            value={formData.conditions}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Comma separated list"
          />
        </div>

        <div>
          <label className="block mb-1">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
HealthDetailsForm.propTypes = {
  initialData: PropTypes.shape({
    bloodType: PropTypes.string,
    allergies: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    conditions: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onSave: PropTypes.func.isRequired,
};

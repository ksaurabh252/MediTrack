import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components/ui/Button/Button';

export default function DoctorForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'specialty':
        setSpecialty(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = 'Name is required';
    }
    if (!specialty.trim()) {
      validationErrors.specialty = 'Specialty is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({ name, specialty, phone, email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Doctor&apos;s Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label className="block mb-1">Specialty</label>
        <input
          type="text"
          name="specialty"
          value={specialty}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.specialty && <p className="text-red-500 text-sm">{errors.specialty}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Doctor</Button>
      </div>
    </form>
  );
}

DoctorForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
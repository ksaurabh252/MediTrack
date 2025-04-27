import { Button } from '../../components/ui/Button/Button';
import PropTypes from 'prop-types';
export default function DoctorsList({ doctors, onAdd, onRemove }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Doctors</h2>
        <Button onClick={onAdd}>Add Doctor</Button>
      </div>

      {doctors.length === 0 ? (
        <p className="text-gray-500">No doctors added yet</p>
      ) : (
        <div className="space-y-3">
          {doctors.map(doctor => (
            <div key={doctor.id} className="border rounded p-4 flex justify-between">
              <div>
                <h3 className="font-medium">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <p className="text-sm">{doctor.phone}</p>
              </div>
              <button
                onClick={() => onRemove(doctor.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


DoctorsList.propTypes = {
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      specialty: PropTypes.string,
      phone: PropTypes.string,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
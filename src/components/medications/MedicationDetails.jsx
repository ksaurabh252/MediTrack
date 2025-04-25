
import PropTypes from 'prop-types';
import { Button } from '../ui/Button/Button';

export const MedicationDetails = ({ medication, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{medication.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Basic Information</h3>
          <p>Type: {medication.type}</p>
          <p>Dosage: {medication.dosage} {medication.dosageUnit}</p>
          <p>Frequency: {medication.frequency}</p>
          <p>Quantity: {medication.quantity}</p>
        </div>

        <div>
          <h3 className="font-semibold">Schedule</h3>
          <p>Start Date: {medication.startDate}</p>
          <p>End Date: {medication.endDate}</p>
          <p>Refills Remaining: {medication.refillsRemaining}</p>
          <p>Status: {medication.isActive ? 'Active' : 'Inactive'}</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold">Prescription Details</h3>
        <p>Prescribed By: {medication.prescribedBy}</p>
        <p>Patient: {medication.patientName}</p>
      </div>

      <div>
        <h3 className="font-semibold">Instructions</h3>
        <p>{medication.instructions}</p>
      </div>

      <div className="flex space-x-2">
        <Button onClick={() => onEdit(medication)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(medication.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

MedicationDetails.propTypes = {
  medication: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    dosage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    dosageUnit: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    prescribedBy: PropTypes.string.isRequired,
    patientName: PropTypes.string.isRequired,
    refillsRemaining: PropTypes.number.isRequired,
    instructions: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
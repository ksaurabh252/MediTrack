import PropTypes from 'prop-types';
import Button from '../../components/ui/Button/Button';
import Modal from '../../components/ui/Modal/Modal';

const MedicationDetails = ({ medication, onClose }) => {
  return (
    <Modal title="Medication Details" onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold">Name</h4>
            <p>{medication.name}</p>
          </div>
          <div>
            <h4 className="font-semibold">Type</h4>
            <p>{medication.type}</p>
          </div>
          <div>
            <h4 className="font-semibold">Dosage</h4>
            <p>{medication.dosage} {medication.dosageUnit}</p>
          </div>
          <div>
            <h4 className="font-semibold">Frequency</h4>
            <p>{medication.frequency}</p>
          </div>
          <div>
            <h4 className="font-semibold">Patient Name</h4>
            <p>{medication.patientName}</p>
          </div>
          <div>
            <h4 className="font-semibold">Prescribed By</h4>
            <p>{medication.prescribedBy}</p>
          </div>
          <div>
            <h4 className="font-semibold">Start Date</h4>
            <p>{medication.startDate}</p>
          </div>
          <div>
            <h4 className="font-semibold">End Date</h4>
            <p>{medication.endDate}</p>
          </div>
          <div>
            <h4 className="font-semibold">Refills Remaining</h4>
            <p>{medication.refillsRemaining}</p>
          </div>
          <div>
            <h4 className="font-semibold">Status</h4>
            <p>{medication.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Instructions</h4>
          <p>{medication.instructions}</p>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

MedicationDetails.propTypes = {
  medication: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    dosage: PropTypes.number.isRequired,
    dosageUnit: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
    patientName: PropTypes.string.isRequired,
    prescribedBy: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    refillsRemaining: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    instructions: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MedicationDetails;
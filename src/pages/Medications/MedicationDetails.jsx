import PropTypes from "prop-types";
import Button from "../../components/ui/Button/Button";
import Modal from "../../components/ui/Modal/Modal";
import { format } from "date-fns";
const MedicationDetails = ({ medication, onClose }) => {
  //  format dates consistently
  const formatDate = (dateString) => {
    try {
      return dateString
        ? format(new Date(dateString), "MMM dd, yyyy")
        : "Not specified";
    } catch {
      return "Invalid date";
    }
  };

  return (
    <Modal title="Medication Details" onClose={onClose} size="lg">
      <div className="space-y-6">
        {/* Basic Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Name", value: medication.name },
            { label: "Type", value: medication.type },
            {
              label: "Dosage",
              value: `${medication.dosage} ${medication.dosageUnit}`,
            },
            { label: "Frequency", value: medication.frequency },
            { label: "Patient Name", value: medication.patientName },
            { label: "Prescribed By", value: medication.prescribedBy },
            { label: "Start Date", value: formatDate(medication.startDate) },
            { label: "End Date", value: formatDate(medication.endDate) },
            { label: "Refills Remaining", value: medication.refillsRemaining },
            {
              label: "Status",
              value: medication.isActive ? "Active" : "Inactive",
            },
          ].map((item, index) => (
            <div key={index}>
              <h4 className="font-semibold">{item.label}</h4>
              <p className="mt-1">{item.value || "Not specified"}</p>
            </div>
          ))}
        </div>

        {/* Instructions Section */}
        <div>
          <h4 className="font-semibold">Instructions</h4>
          <p className="mt-1 whitespace-pre-line">
            {medication.instructions || "No instructions provided"}
          </p>
        </div>

        {/* Schedule Section */}
        {medication.schedule && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold border-b pb-1">Schedule</h4>
            <div className="mt-2 space-y-2">
              <p>
                <strong>Pattern:</strong>{" "}
                {medication.schedule.pattern || "Not specified"}
              </p>

              {medication.schedule.customDays?.length > 0 && (
                <div className="flex items-center">
                  <strong className="mr-2">Custom Days:</strong>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                      <span
                        key={day}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${medication.schedule.customDays.includes(day)
                            ? "bg-blue-500 text-white"
                            : "text-gray-400"
                          }`}
                      >
                        {["S", "M", "T", "W", "T", "F", "S"][day]}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {medication.schedule.exceptions?.length > 0 && (
                <div>
                  <p className="font-medium mt-2">One-time Exceptions:</p>
                  <ul className="list-disc pl-5 mt-1">
                    {medication.schedule.exceptions.map((date, i) => (
                      <li key={i}>{formatDate(date)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dosage History Section */}
        <div>
          <h4 className="font-semibold border-b pb-1">Dosage History</h4>
          {medication.dosageHistory?.length > 0 ? (
            <div className="mt-2 border rounded-lg overflow-hidden">
              {medication.dosageHistory.map((entry, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 border-b last:border-b-0 hover:bg-gray-50"
                >
                  <span className="text-sm">{formatDate(entry.date)}</span>
                  <span className="text-sm font-medium">
                    {entry.dosage} {medication.dosageUnit}
                    {entry.changedBy && (
                      <span className="text-gray-500 ml-2">
                        (by {entry.changedBy})
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm mt-2">
              No dosage history available
            </p>
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-4">
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
    dosageHistory: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        dosage: PropTypes.number,
        changedBy: PropTypes.string,
      })
    ),
    frequency: PropTypes.string.isRequired,
    patientName: PropTypes.string.isRequired,
    prescribedBy: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    refillsRemaining: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    instructions: PropTypes.string.isRequired,
    schedule: PropTypes.shape({
      pattern: PropTypes.string,
      customDays: PropTypes.arrayOf(PropTypes.number),
      exceptions: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MedicationDetails;

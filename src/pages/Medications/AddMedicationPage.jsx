import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMedication } from "../../api/medications";
import { MedicationForm } from "../../components/medications/MedicationForm";
import { Card } from "../../components/ui/Card/Card";
import { Button } from "../../components/ui/Button/Button";
import { useToast } from "../../contexts/ToastContext";

const AddMedicationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.medications);
  const { showToast } = useToast();

  const handleSubmit = async (medicationData) => {
    try {
      await dispatch(addMedication(medicationData)).unwrap();

      showToast("Medication added successfully!", "success");

      setTimeout(() => {
        navigate("/medications");
      }, 1500);
    } catch (err) {
      showToast(`Error: ${err.message}`, "error");
    }
  };

  const handleCancel = () => {
    navigate("/medications");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <div className="flex justify-between items-center mb-6 bg-red-900">
          <h1 className="text-2xl font-bold">Add New Medication</h1>
          <Button variant="secondary" onClick={handleCancel}>
            Back to Medications
          </Button>
        </div>

        <MedicationForm
          initialData={{}}
          onSave={handleSubmit}
          onCancel={handleCancel}
          isLoading={loading}
        />
      </Card>
    </div>
  );
};

export default AddMedicationPage;

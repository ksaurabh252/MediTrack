import { useState, useEffect } from 'react';
import { fetchMedications, addMedication, updateMedication, deleteMedication } from '../../api/medications';
import { MedicationForm } from '../../components/medications/MedicationForm';
import { MedicationDetails } from '../../components/medications/MedicationDetails';
import { Modal } from '../../components/ui/Modal/Modal';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';

export const MedicationList = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadMedications = async () => {
      try {
        const data = await fetchMedications();
        setMedications(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadMedications();
  }, []);

  const handleAddMedication = async (medicationData) => {
    try {
      console.log('Adding medication:', medicationData);
      const newMedication = await addMedication(medicationData);
      console.log('Added successfully:', newMedication);
      setMedications(prev => [...prev, newMedication]);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to add medication:', err);
      setError(err.message);

    }
  };

  const handleUpdateMedication = async (medicationData) => {
    try {
      const updatedMedication = await updateMedication(currentMedication.id, medicationData);
      setMedications(prev =>
        prev.map(med => med.id === updatedMedication.id ? updatedMedication : med)
      );
      closeModals();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMedication = async (id) => {
    try {
      await deleteMedication(id);
      setMedications(prev => prev.filter(med => med.id !== id));
      closeModals();
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditModal = (medication) => {
    setCurrentMedication(medication);
    setIsModalOpen(true);
  };

  const openDetailsModal = (medication) => {
    setCurrentMedication(medication);
    setIsDetailsModalOpen(true);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsDetailsModalOpen(false);
    setCurrentMedication(null);
  };

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'active' && med.isActive) ||
      (activeFilter === 'inactive' && !med.isActive);
    return matchesSearch && matchesFilter;
  });

  const paginatedMedications = filteredMedications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMedications.length / itemsPerPage);

  if (loading) return <div>Loading medications...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Medication Management</h1>
        <Button onClick={() => openEditModal(null)}>
          Add New Medication
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by medication or patient name..."
          className="p-2 border rounded flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-2 border rounded"
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
        >
          <option value="all">All Medications</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>
      </div>

      {paginatedMedications.length === 0 ? (
        <Card>
          <p>No medications found matching your criteria.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {paginatedMedications.map(medication => (
            <Card
              key={medication.id}
              onClick={() => openDetailsModal(medication)}
              className="cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{medication.name}</h2>
                  <p className="text-sm text-gray-600">
                    {medication.dosage} {medication.dosageUnit} • {medication.frequency}
                  </p>
                  <p className="text-sm">Patient: {medication.patientName}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${medication.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {medication.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(medication);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMedication(medication.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filteredMedications.length > itemsPerPage && (
        <div className="flex justify-center space-x-2">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span className="flex items-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}

      {/* Edit/Add Medication Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentMedication ? "Edit Medication" : "Add New Medication"}
      >
        {isModalOpen && (
          <MedicationForm
            initialData={currentMedication || {}}
            onSave={currentMedication ? handleUpdateMedication : handleAddMedication}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </Modal>

      {/* Medication Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={closeModals}
        title="Medication Details"
        size="lg"
      >
        {currentMedication ? (
          <MedicationDetails
            medication={currentMedication}
            onEdit={() => {
              setIsDetailsModalOpen(false);
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteMedication}
          />
        ) : (
          <div>No medication data available</div>
        )}
      </Modal>
    </div>
  );
};
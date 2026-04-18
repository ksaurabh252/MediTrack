import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useToast } from "../../contexts/ToastContext";
import {
  fetchMedications,
  addMedication,
  updateMedication,
  deleteMedication,
} from "../../api/medications";
import { MedicationForm } from "../../components/medications/MedicationForm";
import { MedicationDetails } from "../../components/medications/MedicationDetails";
import { Modal } from "../../components/ui/Modal/Modal";
import { Card } from "../../components/ui/Card/Card";
import { Button } from "../../components/ui/Button/Button";
import DoseReminder from "../../components/medications/DoseReminder";
import { useReminders } from "../../hooks/useReminders";

import { useCallback, useMemo } from "react";

import { useDebounce } from "use-debounce";

/**
 * MedicationList component manages the display, search, filter, pagination,
 * and CRUD operations for medications. It also handles reminders and toasts.
 */
const MedicationList = () => {
  const { medications: reduxMeds, pendingReminders } = useSelector(
    (state) => state.medications
  );
  const dispatch = useDispatch();

  const { showToast } = useToast();
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const itemsPerPage = 5;


  useReminders(reduxMeds, dispatch);

  useEffect(() => {
    /**
     * Loads medications from the API and updates local state.
     */
    const loadMedications = async () => {
      try {
        const action = await dispatch(fetchMedications());
        if (fetchMedications.fulfilled.match(action)) {
          setMedications(action.payload || []);
        }
        setLoading(false);
      } catch (err) {
        showToast(`Failed to load medications: ${err.message}`, "error");
        setLoading(false);
      }
    };
    loadMedications();
  }, [dispatch]);

  /**
 * Handles reminder actions (taken, snooze, missed) for a medication.
 */
  const handleReminderAction = (medId, action, snoozeMinutes = 0) => {
    dispatch({
      type: "medications/handleReminderAction",
      payload: { medId, action, snoozeMinutes },
    });
  };

  /**
   * Handles adding a new medication.
   */
  const handleAddMedication = useCallback(
    async (medicationData) => {
      try {
        const action = await dispatch(addMedication(medicationData));

        if (addMedication.fulfilled.match(action)) {
          setMedications((prev) => [...prev, action.payload]);
          setIsModalOpen(false);
          showToast("Medication added successfully!", "success");
        }
      } catch (err) {
        showToast(`Failed to add medication: ${err.message}`, "error");
        console.error("Failed to add medication:", err);
      }
    },
    [dispatch, showToast]
  );

  /**
   * Handles updating an existing medication.
   */
  const handleUpdateMedication = useCallback(
    async (medicationData) => {
      try {
        const updatedMedication = await (updateMedication(
          currentMedication.id,
          medicationData
        )).unwrap();
        setMedications((prev) =>
          prev.map((med) =>
            med.id === updatedMedication.id ? updatedMedication : med
          )
        );
        closeModals();

        showToast("Medication updated successfully!", "success");
      } catch (err) {
        showToast(`Failed to update medication: ${err.message}`, "error");
        console.error("Failed to update medication:", err);
      }
    },
    [dispatch, currentMedication, showToast]
  );

  /**
   * Handles deleting a medication.
   */
  const handleDeleteMedication = useCallback(
    async (id) => {
      try {
        await deleteMedication(id);
        setMedications((prev) => prev.filter((med) => med.id !== id));
        closeModals();
        showToast("Medication deleted successfully!", "success");
      } catch (err) {
        showToast(`Failed to delete medication: ${err.message}`, "error");
        console.error("Failed to delete medication:", err);
      }
    },
    [dispatch, showToast]
  );

  /**
   * Opens the edit modal for a medication.
   */
  const openEditModal = (medication) => {
    setCurrentMedication(medication);
    setIsModalOpen(true);
  };

  /**
   * Opens the details modal for a medication.
   */
  const openDetailsModal = (medication) => {
    setCurrentMedication(medication);
    setIsDetailsModalOpen(true);
  };

  /**
   * Closes all modals and resets current medication.
   */
  const closeModals = () => {
    setIsModalOpen(false);
    setIsDetailsModalOpen(false);
    setCurrentMedication(null);
  };

  // Filter medications by search term and active/inactive status
  const filteredMedications = useMemo(() => {
    return medications.filter((med) => {
      const matchesSearch =
        med.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        med.patientName.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "active" && med.isActive) ||
        (activeFilter === "inactive" && !med.isActive);
      return matchesSearch && matchesFilter;
    });
  }, [medications, debouncedSearch, activeFilter]);

  // Paginate filtered medications
  const paginatedMedications = filteredMedications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredMedications.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* Header and Add Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Medication Management</h1>
        <Button onClick={() => openEditModal(null)}>Add New Medication</Button>
      </div>

      {/* Search and Filter Controls */}
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

      {/* Medication List or Empty State */}
      {paginatedMedications.length === 0 ? (
        <Card>
          <p>No medications found matching your criteria.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {paginatedMedications.map((medication) => (
            <Card
              key={medication.id}
              onClick={() => openDetailsModal(medication)}
              className="cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{medication.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {medication.dosage} {medication.dosageUnit} •{" "}
                    {medication.frequency}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">Patient: {medication.patientName}</p>
                  {/**
                   * ReminderBadge component displays a status badge with optional count
                   * for medication reminders with color-coded styling based on status
                   *
                   * // Define color schemes for different reminder statuses
                   * // Each status has a light background with darker text for accessibility
                   */}
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${medication.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                  >
                    {medication.isActive ? "Active" : "Inactive"}
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

      {/* Pagination Controls */}
      {filteredMedications.length > itemsPerPage && (
        <div className="flex justify-center space-x-2">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span className="flex items-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </Button>
        </div>
      )}

      {/* Add/Edit Medication Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentMedication ? "Edit Medication" : "Add New Medication"}
      >
        {isModalOpen && (
          <MedicationForm
            initialData={currentMedication || {}}
            onSave={
              currentMedication ? handleUpdateMedication : handleAddMedication
            }
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

      {/* Dose Reminders */}
      {pendingReminders.map((medId) => {
        const medication = reduxMeds.find((m) => m.id === medId);
        return medication ? (
          <DoseReminder
            key={medId}
            medication={medication}
            onMarkTaken={() => handleReminderAction(medId, "taken")}
            onSnooze={(mins) => handleReminderAction(medId, "snooze", mins)}
            onMarkMissed={() => handleReminderAction(medId, "missed")}
          />
        ) : null;
      })}

    </div>
  );
};

export default MedicationList;
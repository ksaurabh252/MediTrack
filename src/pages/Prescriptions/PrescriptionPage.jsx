import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { Modal } from '../../components/ui/Modal/Modal';
import { useToast } from '../../hooks/useToast';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

export default function PrescriptionPage({ darkMode, setDarkMode }) {
  const [prescriptions, setPrescriptions] = useState(
    JSON.parse(localStorage.getItem('meditrack_prescriptions')) || []
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentViewingFile, setCurrentViewingFile] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('meditrack_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('File size too large (max 5MB)', 'error');
      return;
    }

    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      showToast('Invalid file type (JPEG, PNG, PDF only)', 'error');
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newPrescription = {
        id: Date.now(),
        name: selectedFile.name,
        type: selectedFile.type,
        content: URL.createObjectURL(selectedFile), // Store object URL
        date: new Date().toISOString(),
        status: 'Pending Review'
      };
      setPrescriptions([...prescriptions, newPrescription]);
      setSelectedFile(null);
      setIsUploadModalOpen(false);
      showToast('Prescription uploaded successfully', 'success');
    }
  };

  const handleViewFile = (file) => {
    setCurrentViewingFile(file);
    setIsViewerOpen(true);
  };

  const handleRenewal = (id) => {
    setPrescriptions(prescriptions.map(p =>
      p.id === id ? { ...p, status: 'Renewal Requested' } : p
    ));
    showToast('Renewal requested', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Prescription Management</h1>
          <Button onClick={() => setIsUploadModalOpen(true)}>
            Upload Prescription
          </Button>
        </div>

        <Card className="p-6">
          {prescriptions.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">
              No prescriptions found. Upload your first prescription.
            </p>
          ) : (
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold dark:text-white">{prescription.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(prescription.date).toLocaleDateString()} • {prescription.status}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleRenewal(prescription.id)}
                      disabled={prescription.status === 'Renewal Requested'}
                    >
                      {prescription.status === 'Renewal Requested' ? 'Requested' : 'Request Renewal'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleViewFile(prescription)}
                    >
                      View
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>

        {/* Upload Modal */}
        <Modal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          title="Upload Prescription"
        >
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                id="prescription-upload"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileUpload}
              />
              <label htmlFor="prescription-upload" className="cursor-pointer block">
                {selectedFile ? (
                  <div>
                    <p className="dark:text-white">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {selectedFile.type} • {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="dark:text-white">Drag & drop your prescription here or click to browse</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Supports JPG, PNG, PDF (max 5MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
            {selectedFile && (
              <div className="flex justify-end">
                <Button onClick={handleUpload}>Upload</Button>
              </div>
            )}
          </div>
        </Modal>

        {/* File Viewer Modal */}
        <Modal
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          title={currentViewingFile?.name || 'Prescription'}
          size="xl"
        >
          {currentViewingFile && (
            <div className="h-[70vh] flex items-center justify-center">
              {currentViewingFile.type === 'application/pdf' ? (
                <iframe
                  src={currentViewingFile.content}
                  className="w-full h-full"
                  title={currentViewingFile.name}
                />
              ) : (
                <img
                  src={currentViewingFile.content}
                  alt="Prescription"
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          )}
        </Modal>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}
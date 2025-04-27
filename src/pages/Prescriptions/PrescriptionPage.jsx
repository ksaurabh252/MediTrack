import { useState } from "react";
import { Button } from "../../components/ui/Button/Button";
import { Card } from "../../components/ui/Card/Card";
import { Modal } from "../../components/ui/Modal/Modal";
import { useToast } from "../../hooks/useToast";

export default function PrescriptionPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewingFile, setViewingFile] = useState(null);
  const { showToast } = useToast();
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("File size too large (max 5MB)", "error");
        return;
      }
      if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        showToast("Invalid file type (JPEG, PNG, PDF only)", "error");
        return;
      }

      setSelectedFile(file);

      if (file.type.includes("image")) {
        setPreviewUrl(URL.createObjectURL(file));
      } else if (file.type === "application/pdf") {
        setPreviewUrl("/pdf-icon-thumbnail.png");
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPrescription = {
          id: Date.now(),
          name: selectedFile.name,
          type: selectedFile.type,
          date: new Date().toISOString(),
          status: "Pending Review",
          data: e.target.result,
        };
        setPrescriptions((prev) => [...prev, newPrescription]);
        setSelectedFile(null);
        setPreviewUrl(null);
        setIsUploadModalOpen(false);
        showToast("Prescription uploaded successfully", "success");
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRenewal = (id) => {
    setPrescriptions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Renewal Requested" } : p))
    );
    showToast("Renewal requested", "success");
  };

  const handleView = (prescription) => {
    setViewingFile(prescription);
    setPreviewUrl(prescription.data);
    setIsUploadModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Prescription Management</h1>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          Upload Prescription
        </Button>
      </div>

      <Card className="p-6">
        {prescriptions.length === 0 ? (
          <p className="text-gray-600">
            No prescriptions found. Upload your first prescription.
          </p>
        ) : (
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <Card
                key={prescription.id}
                className="p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{prescription.name}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(prescription.date).toLocaleDateString()} •{" "}
                    {prescription.status}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleRenewal(prescription.id)}
                    disabled={prescription.status === "Renewal Requested"}
                  >
                    {prescription.status === "Renewal Requested"
                      ? "Requested"
                      : "Request Renewal"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleView(prescription)}
                  >
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          setPreviewUrl(null);
          setViewingFile(null);
        }}
        title={
          viewingFile
            ? `View Prescription: ${viewingFile.name}`
            : "Upload Prescription"
        }
      >
        <div className="space-y-4">
          {viewingFile ? (
            <div className="mt-4 border rounded-lg p-2 max-h-[500px] overflow-auto">
              {viewingFile.type.includes("image") ? (
                <img
                  src={previewUrl}
                  alt="Prescription Preview"
                  className="max-h-96 mx-auto"
                />
              ) : viewingFile.type === "application/pdf" ? (
                <iframe
                  src={previewUrl}
                  title="PDF Preview"
                  className="w-full h-96 rounded"
                  frameBorder="0"
                ></iframe>
              ) : (
                <div className="flex flex-col items-center">
                  <img
                    src="/pdf-icon-thumbnail.png"
                    alt="PDF Icon"
                    className="h-12 w-12 mb-2"
                  />
                  <p className="text-sm">{viewingFile.name}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                id="prescription-upload"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="prescription-upload"
                className="cursor-pointer block"
              >
                {selectedFile ? (
                  <div>
                    <p>{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {selectedFile.type} •{" "}
                      {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>Drag & drop your prescription here or click to browse</p>
                    <p className="text-sm text-gray-500">
                      Supports JPG, PNG, PDF (max 5MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
          )}

          {selectedFile && !viewingFile && (
            <div className="flex justify-end">
              <Button onClick={handleUpload}>Upload</Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

import { useState } from "react";

export const useToast = () => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  return {
    toast,
    showToast,
    hideToast: () => setToast({ ...toast, show: false }),
  };
};

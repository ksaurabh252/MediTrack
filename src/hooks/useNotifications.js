import { useState, useEffect, useCallback } from "react";

export const useNotification = () => {
  const [permission, setPermission] = useState(
    "Notification" in window ? Notification.permission : "unsupported"
  );
  const [notification, setNotification] = useState(null);

  // Check and update permission status when changed externally
  useEffect(() => {
    if (!("Notification" in window)) return;

    const handlePermissionChange = () => {
      setPermission(Notification.permission);
    };

    // Some browsers support permission change events
    if (typeof Notification.onpermissionchange === "function") {
      Notification.onpermissionchange = handlePermissionChange;
    }

    return () => {
      if (typeof Notification.onpermissionchange === "function") {
        Notification.onpermissionchange = null;
      }
    };
  }, []);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      console.warn("Browser doesn't support notifications");
      return "unsupported";
    }

    try {
      // Only request if permission isn't already granted/denied
      if (Notification.permission === "default") {
        const status = await Notification.requestPermission();
        setPermission(status);
        return status;
      }
      return Notification.permission;
    } catch (err) {
      console.error("Permission request error:", err);
      setPermission("denied");
      return "denied";
    }
  }, []);

  const showNotification = useCallback(
    (title, options = {}) => {
      if (permission !== "granted") {
        console.warn(
          "Notifications not permitted - current status:",
          permission
        );
        return null;
      }

      const defaultOptions = {
        icon: "/icons/medication-reminder.png",
        badge: "/icons/badge.png",
        vibrate: [200, 100, 200],
        data: {
          date: new Date(),
          medicationId: options.medicationId || null,
        },
        requireInteraction: true,
        silent: false,
        ...options,
      };

      try {
        const notif = new Notification(title, defaultOptions);
        setNotification(notif);

        notif.onclick = (event) => {
          event.preventDefault();
          window.focus();
          notif.close();
          setNotification(null);
        };

        notif.onclose = () => {
          setNotification(null);
        };

        return notif;
      } catch (error) {
        console.error("Error showing notification:", error);
        return null;
      }
    },
    [permission]
  );

  const closeNotification = useCallback(() => {
    if (notification) {
      notification.close();
      setNotification(null);
    }
  }, [notification]);

  useEffect(() => {
    return () => {
      if (notification) {
        notification.close();
      }
    };
  }, [notification]);

  return {
    permission,
    isSupported: "Notification" in window,
    requestPermission,
    showNotification,
    closeNotification,
    currentNotification: notification,
  };
};

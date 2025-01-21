import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageType } from "../types/Notification";
import { useAuth } from "../context/AuthContext";
import { MdNotificationsActive } from "react-icons/md";

function NotificationPopup() {
  const { error } = useAuth();
  const { state } = useLocation();

  const [notification, setNotification] = useState<MessageType>(null);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    let innerTimeout: number | undefined;
    let outerTimeout: number | undefined;

    setVisible(true);

    if (notification) {
      outerTimeout = setTimeout(() => {
        setVisible(false);
        innerTimeout = setTimeout(() => {
          setNotification(null);
        }, 500);
      }, 10_000);


      return () => {
        clearTimeout(innerTimeout);
        clearTimeout(outerTimeout);
      };
    }
  }, [notification, setNotification]);

  useEffect(() => {
    if (error) {
      setNotification(error);
      return;
    }

    setNotification(state);
  }, [state, error]);

  return (
    <>
      {notification && (
        <button
          className={`notif-div ${visible ? "fade-in" : "fade-out"} ${notification?.state}`}
          onClick={() => setNotification(null)}
        >
          <MdNotificationsActive />
          <p>{notification?.message}</p>
        </button>
      )}
    </>
  );
}

export default NotificationPopup;
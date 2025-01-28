import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageType } from "../types/Notification";
import { useAuth } from "../context/AuthContext";
import { MdNotificationsActive } from "react-icons/md";

interface NotificationPopupProp {
  extraNotif: MessageType,
  setExtraNotif: (notif: MessageType) => void;
}

function NotificationPopup({ extraNotif, setExtraNotif }: NotificationPopupProp) {
  const location = useLocation();
  const { error, setError } = useAuth();
  const [state, setState] = useState<MessageType>(location.state);

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
  }, [notification]);

  useEffect(() => {
    if (extraNotif) {
      setNotification(extraNotif);
      setExtraNotif(null);
      return;
    }

    if (error) {
      setNotification(error);
      setError(null);
      return;
    }

    if (state) {
      setNotification(state);
      setState(null);
      return;
    }
  }, [state, error, extraNotif]);

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
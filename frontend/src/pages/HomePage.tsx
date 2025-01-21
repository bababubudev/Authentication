import { useLocation } from "react-router-dom";
import NotificationPopup from "../components/NotificationPopup";
import UserAction from "../components/UserAction";

function HomePage() {

  const { state } = useLocation();
  console.log(state);
  return (
    <>
      <UserAction />
      <NotificationPopup />
    </>
  );
}

export default HomePage;
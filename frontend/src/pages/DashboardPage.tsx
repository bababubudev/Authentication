import { useState } from "react";
import ChangePassword from "../components/ChangePassword";
import { useAuth } from "../context/AuthContext";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import NotificationPopup from "../components/NotificationPopup";

function DashboardPage() {
  const [passwordChangeShown, setPasswordChangeShown] = useState<boolean>(false);

  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      {user?.role === "admin"
        ? <AdminDashboard />
        : <UserDashboard
          user={user}
          logout={logout}
          visiblePassword={setPasswordChangeShown}
        />
      }
      <ChangePassword
        isShown={passwordChangeShown}
        setShown={setPasswordChangeShown}
      />
      <NotificationPopup />
    </div>
  );
}

export default DashboardPage;
import { useState } from "react";
import ChangePassword from "../components/ChangePassword";
import { useAuth } from "../context/AuthContext";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";

function DashboardPage() {
  const [passwordChangeShown, setPasswordChangeShown] = useState<boolean>(false);

  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      {user?.role === "user" ?
        <UserDashboard
          user={user}
          logout={logout}
          visiblePassword={setPasswordChangeShown}
        /> :
        <AdminDashboard />
      }
      <ChangePassword
        isShown={passwordChangeShown}
        setShown={setPasswordChangeShown}
      />
    </div>
  );
}

export default DashboardPage;
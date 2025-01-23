import { useState } from "react";
import ChangePassword from "../components/ChangePassword";
import { useAuth } from "../context/AuthContext";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import NotificationPopup from "../components/NotificationPopup";
import Modal from "../components/Modal";
import { ModalType } from "../types/Modal";

function DashboardPage() {
  const [passwordChangeShown, setPasswordChangeShown] = useState<boolean>(false);
  const [logoutWarning, setLogoutWarning] = useState<boolean>(false);

  const { user, logout } = useAuth();
  const headingRender = user?.role === "admin"
    ? <h1>Admin {user?.username}'s dashboard</h1>
    : <h1>Welcome, {user?.username}!</h1>

  return (
    <div className="dashboard">
      <div className={`heading ${user?.role}`}>
        {headingRender}
        <button
          className="logout-btn"
          onClick={() => setLogoutWarning(true)}
        >
          logout
        </button>
        <Modal
          dialogue={`Logout ${user?.username}?`}
          description={<p>Are you sure you want to logout of account <b>{user?.username}</b></p>}
          isOpen={logoutWarning}
          type={ModalType.alert}
          onConfirm={() => { logout() }}
          onCancel={() => { setLogoutWarning(false) }}
        />
      </div>
      {user?.role === "admin"
        ? <AdminDashboard />
        : <UserDashboard
          user={user}
          visiblePassword={setPasswordChangeShown}
        />
      }
      <ChangePassword
        isModalShown={passwordChangeShown}
        setIsModalShown={setPasswordChangeShown}
      />
      <NotificationPopup />
    </div>
  );
}

export default DashboardPage;
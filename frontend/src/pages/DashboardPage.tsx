import { useState } from "react";
import ChangePassword from "../components/ChangePassword";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const [passwordChangeShown, setPasswordChangeShown] = useState<boolean>(false);

  const { user, logout } = useAuth();
  const createdDate = user?.created_at ? new Date(user.created_at) : new Date();
  const lastLogin = user?.last_login ? new Date(user.last_login) : null;
  const lastUpdated = user?.updated_at ? new Date(user.updated_at) : null;

  return (
    <div className="dashboard">
      <div className="heading">
        <h1>Hello {user?.username}</h1>
        <button onClick={logout}>logout</button>
      </div>
      <div className="details">
        <div className="email">
          <h4>Email</h4>
          <p>{user?.email}</p>
        </div>
        <div className="role">
          <h4>Role</h4>
          <p>{user?.role}</p>
        </div>
        <div className="verified">
          <h4>Email verified</h4>
          <p>{user?.is_email_verified ? "Verified" : "Not verified"}</p>
        </div>
        <div className="created">
          <h4>Account created</h4>
          <p>{createdDate.toDateString()}</p>
        </div>
        <div className="updated">
          <h4>Last updated</h4>
          <p>{lastUpdated === null ? "N/A" : lastUpdated.toDateString()}</p>
        </div>
        <div className="last-login">
          <h4>Last login</h4>
          <p>{lastLogin === null ? "N/A" : lastLogin.toDateString()}</p>
        </div>
        <button onClick={() => setPasswordChangeShown(true)}>
          <h4>Change password</h4>
        </button>
      </div>
      <ChangePassword
        isShown={passwordChangeShown}
        setShown={setPasswordChangeShown}
      />
    </div>
  );
}

export default DashboardPage;
interface UserDashboardProp {
  user: User | null;
  visiblePassword: (value: boolean) => void;
}

function UserDashboard({ user, visiblePassword }: UserDashboardProp) {

  const createdDate = user?.created_at ? new Date(user.created_at) : new Date();
  const lastLogin = user?.last_login ? new Date(user.last_login) : null;
  const lastUpdated = user?.updated_at ? new Date(user.updated_at) : null;

  return (
    <div className="user-dashboard">
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
        <button
          className="change-password-btn"
          onClick={() => visiblePassword(true)}
        >
          <h4>Change password</h4>
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
interface UserDetailCard {
  user: DefaultUser;
  toggleUserStatus: (userId: string, isActive: boolean) => Promise<void>;
  viewAuditLog: (userId: string) => Promise<void>;
}

function UserDetailCard({ user, toggleUserStatus, viewAuditLog }: UserDetailCard) {
  return (
    <div key={user.id} className="detailed-info">
      <div>
        <h4>{user.username}</h4>
        <p>{user.email}</p>
      </div>
      <div className="buttons-container">
        <button
          onClick={() => viewAuditLog(user.id)}
          className="show-audit-btn"
        >
          Audit log
        </button>
        <button
          onClick={() => toggleUserStatus(user.id, user.is_active)}
          className="toggle-status-btn"
        >
          {user.is_active ? "Deactivate" : "Activate"}
        </button>
      </div>
    </div>
  );
}

export default UserDetailCard;
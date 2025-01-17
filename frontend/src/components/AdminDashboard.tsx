import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const BASE_URL = "http://localhost:6060/api/admin";

  const [users, setUsers] = useState<DefaultUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [auditLog, setAuditLog] = useState<AuditLog[]>([]);
  const { user } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await fetch(BASE_URL + "/users", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setUsers(data.data);
    }
    catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(BASE_URL + `/users/${userId}/status`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchUsers();
      }
    }
    catch (err) {
      console.error("Failed to update user status", err);
    }
  };

  const viewAuditLog = async (userId: string) => {
    try {
      const response = await fetch(BASE_URL + `/users/${userId}/audit`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setAuditLog(data.data);
      setSelectedUser(userId);
    }
    catch (err) {
      console.error("Failed to fetch audit log", err);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  if (user?.role !== "admin") {
    return <h1>You do not have permission to view this page.</h1>
  }

  return (
    <div className="admin-dashboard">
      <h1 className="heading">Admin Dashboard</h1>
      <div className="details">
        <div className="user-management">
          <h2>User Management</h2>
          <div className="users-detail">
            {users.map(user => (
              <div key={user.id}>
                <div>
                  <p>{user.username}</p>
                  <p>{user.email}</p>
                </div>
                <div>
                  <button
                    onClick={() => toggleUserStatus(user.id, user.is_active)}
                    className="toggle-status-btn"
                  >
                    {user.is_active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => viewAuditLog(user.id)}
                    className="show-audit-btn"
                  >
                    Audit log
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedUser && (
          <div className="user-audit-log">
            <h2>User Audit Log</h2>
            <div className="logs">
              {auditLog.map(log => (
                <div key={log.id}>
                  <p>IP: {log.ip_address}</p>
                  <p>User Agent: {log.user_agent}</p>
                  <p>Created: {new Date(log.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
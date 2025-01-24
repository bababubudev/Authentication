import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UserDetailCard from "./UserDetailCard";
import UserDashboard from "./UserDashboard";
import { MessageType, Status } from "../types/Notification";

interface AdminDashboardProps {
  notify: (message: MessageType) => void;
}

function AdminDashboard({ notify }: AdminDashboardProps) {
  const BASE_URL = "http://localhost:6060/api/admin";

  const [users, setUsers] = useState<User[]>([]);
  const [auditLog, setAuditLog] = useState<AuditLog[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { user } = useAuth();
  const detailRef = useRef<HTMLDivElement>(null);

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
      notify({ message: "Failed to fetch users", state: Status.Success });
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
        notify({ message: "User status changed", state: Status.Success });
      }
    }
    catch (err) {
      console.error("Failed to update user status", err);
      notify({ message: "Failed to update user status", state: Status.Success });
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
    }
    catch (err) {
      console.error("Failed to fetch audit log", err);
      notify({ message: "Failed to fetch audit log", state: Status.Error });
    }
  };

  const changeUserName = async (userId: string, newName: string) => {
    try {
      const response = await fetch(BASE_URL + `/users/${userId}/updateName`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newName: newName }),
      });

      if (response.ok) {
        notify({ message: "Username changed", state: Status.Success });
        fetchUsers();
      }
    }
    catch (err) {
      console.error("Failed to update username", err);
      notify({ message: "Failed to update username", state: Status.Error });
    }
  };

  const onUserClicked = (userId: string) => {
    if (selectedUser?.user_id === userId) {
      setSelectedUser(null);
      return;
    }

    const currentUser = users.find(val => val.user_id === userId);

    if (!currentUser) return;
    setSelectedUser(currentUser);

    setTimeout(() => {
      if (detailRef.current) {
        detailRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  }

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
      <div className="details">
        <div className="user-management">
          <h2>User Management</h2>
          <div className="user-details">
            {users.map(user => (
              <UserDetailCard
                key={user.user_id}
                isSelected={selectedUser?.user_id === user.user_id}
                user={user}
                onUserCardClick={onUserClicked}
                toggleUserStatus={toggleUserStatus}
                viewAuditLog={viewAuditLog}
                renameUser={changeUserName}
              />
            ))}
          </div>
        </div>
        <div className="user-audit-log">
          <h2>User Audit Log</h2>
          <div className="logs">
            {auditLog.length > 0 ?
              auditLog.map(log => (
                <div key={log.id}>
                  <p>IP: {log.ip_address}</p>
                  <p>User Agent: {log.user_agent}</p>
                  <p>Created: {new Date(log.created_at).toLocaleString()}</p>
                </div>
              )) :
              <p>Nothing in the audit</p>
            }
          </div>
        </div>
        {selectedUser &&
          <div className="user-detail-area" ref={detailRef}>
            <div className="upper-part">
              <h2>User details</h2>
              <button
                className="remove-user-detail"
                onClick={() => setSelectedUser(null)}
              >
                Hide details
              </button>
            </div>
            <UserDashboard
              user={selectedUser}
            />
          </div>
        }
      </div>
    </div>
  );
}

export default AdminDashboard;
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UserDetailCard from "./UserDetailCard";
import Modal from "./Modal";
import { ModalType } from "../types/Modal";
import UserDashboard from "./UserDashboard";

interface AdminDashboardProps {
  notify: () => void;
}

function AdminDashboard() {
  const BASE_URL = "http://localhost:6060/api/admin";

  const [users, setUsers] = useState<User[]>([]);
  const [auditLog, setAuditLog] = useState<AuditLog[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetail, setShowUserDetail] = useState<boolean>(false);
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
    }
    catch (err) {
      console.error("Failed to fetch audit log", err);
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
        fetchUsers();
      }
    }
    catch (err) {
      console.error("Failed to update user name", err);
    }
  };

  const onUserClicked = (userId: string) => {
    const currentUser = users.find(val => val.user_id === userId);

    if (!currentUser) return;
    setSelectedUser(currentUser);
    setShowUserDetail(true);
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
        <Modal
          dialogue={selectedUser?.username + " details"}
          description={
            <UserDashboard
              user={selectedUser}
            />
          }
          isOpen={showUserDetail}
          type={ModalType.info}
          onCancel={() => setShowUserDetail(false)}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
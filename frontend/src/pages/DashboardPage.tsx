import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <div className="dashboard">
        <h1>Hello {user?.username}</h1>
        <div className="details">
          <div className="email">
            <h4>Email</h4>
            <p>{user?.email}</p>
          </div>
          <div className="role">
            <h4>Role</h4>
            <p>{user?.role}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
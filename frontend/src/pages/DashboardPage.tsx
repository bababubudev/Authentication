import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <h1>Hello {user?.username}</h1>
    </>
  );
}

export default DashboardPage;
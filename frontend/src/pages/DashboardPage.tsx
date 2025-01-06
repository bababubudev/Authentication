import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <h1>Hello {user?.username}</h1>
      <h2>Your email is {user?.email}</h2>
    </>
  );
}

export default DashboardPage;
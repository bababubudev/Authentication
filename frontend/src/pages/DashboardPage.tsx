import { useEffect, useState } from "react";
import Header from "../components/Header";

function DashboardPage() {
  const BASE_URL = "http://localhost:6060/api/dashboard"
  const [user, setUser] = useState<string>("No-User");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(BASE_URL + "/", {
          method: "GET",
          headers: { token: localStorage.token },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Response data:", result);

        if (result.data && result.data.username) {
          setUser(result.data.username);
        }
      }
      catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUsername();
  }, []);
  return (
    <>
      <Header />
      <h1>Hello {user}</h1>
    </>
  );
}

export default DashboardPage;
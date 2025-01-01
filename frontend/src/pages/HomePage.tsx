import Header from "../components/Header";
import UserAction from "../components/UserAction";

function HomePage() {
  return (
    <>
      <Header />
      <div className="user-options">
        <button type="button">Login</button>
        <button type="button">Register</button>
      </div>
      <UserAction />
    </>
  );
}

export default HomePage;
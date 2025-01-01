import Header from "../components/Header";

function HomePage() {
  return (
    <>
      <Header />
      <div className="user-options">
        <button type="button">Login</button>
        <button type="button">Register</button>
      </div>
    </>
  );
}

export default HomePage;
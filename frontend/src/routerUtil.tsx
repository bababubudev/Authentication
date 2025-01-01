import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

export const routes = [
  { path: "/", label: "Home" },
  { path: "/dash", label: "Dashboard" },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dash",
    element: <DashboardPage />,
  }
]);
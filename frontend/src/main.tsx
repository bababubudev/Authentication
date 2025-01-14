import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/styles.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider, ProtectedRoute } from "./context/AuthProvider.tsx"
import HomePage from "./pages/HomePage.tsx"
import DashboardPage from "./pages/DashboardPage.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>,
)

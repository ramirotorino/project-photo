import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Main from "./pages/Main/Main";
import ClientGallery from "./pages/ClientGallery/ClientGallery";
import GalleryPublic from "./pages/GalleryPublic/GalleryPublic";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import InfoToolTip from "./components/InfoTooltip/InfoTooltip";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const userEmail = localStorage.getItem("userEmail");

    if (token && userEmail) {
      setCurrentUser({ email: userEmail });
      setLoggedIn(true);
    }

    setIsLoading(false);
  }, []);

  function handleLogin({ token, email }) {
    console.log("✅ handleLogin ejecutado");
    console.log("🧠 Email recibido:", email);

    localStorage.setItem("jwt", token);
    localStorage.setItem("userEmail", email);
    setCurrentUser({ email });
    setLoggedIn(true);

    if (email === "themanco@example.com") {
      console.log("🔁 Redirigiendo al /admin");
      navigate("/admin");
    } else {
      console.log("🔁 Redirigiendo a /mis-fotos");
      navigate("/mis-fotos");
    }
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userEmail");
    setCurrentUser(null);
    setLoggedIn(false);
    navigate("/"); // Redirige al home
  }

  function closeAllPopups() {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsTooltipOpen(false);
  }

  function showTooltip(msg) {
    setTooltipMessage(msg);
    setIsTooltipOpen(true);
  }

  if (isLoading) return null;

  return (
    <>
      <Header
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
        onLogout={handleLogout}
        currentUser={currentUser}
      />

      <Login
        isOpen={isLoginOpen}
        onClose={closeAllPopups}
        onLogin={handleLogin}
      />

      <Register
        isOpen={isRegisterOpen}
        onClose={closeAllPopups}
        onSuccess={showTooltip}
      />

      <InfoToolTip
        isOpen={isTooltipOpen}
        onClose={closeAllPopups}
        message={tooltipMessage}
      />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/galeria" element={<GalleryPublic />} />
        <Route
          path="/mis-fotos"
          element={
            <ProtectedRoute element={<ClientGallery />} loggedIn={loggedIn} />
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<AdminPanel />}
              loggedIn={
                loggedIn && currentUser?.email === "themanco@example.com"
              }
            />
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

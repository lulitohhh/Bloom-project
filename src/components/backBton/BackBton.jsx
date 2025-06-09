import React from "react";
import "./BackBton.css"
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseConfig";
import { useState } from "react";


const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    if (location.pathname === "/dashboard") {
      setShowAlert(true);
    } else {
      navigate("/dashboard");
    }
  };

  const confirmLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un error al cerrar sesión.");
    }
  };

  return (
    <>
      <button
        className="back-button"
        aria-label="Volver al dashboard"
        onClick={handleClick}
      >
        
      </button>

      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-box warning">
            <p>¿Quieres cerrar sesión?</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                className="close-alert-btn"
                onClick={confirmLogout}
              >
                Sí
              </button>
              <button
                className="close-alert-btn"
                onClick={() => setShowAlert(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BackButton;
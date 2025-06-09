import React, { useState } from "react";
import Background from "../../components/background/background";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import LoaderPlant from "../../components/LoaderPlant/LoaderPlant";
import './Register.css';

const Register = () => {
  const [loading, setLoading] = useState(false);

  const handleStartLoading = () => {
    setLoading(true);
  };

  const handleFinishLoading = () => {
    setLoading(false);
  };

  return (
    <div className="register">
      <Background />
      <div className="register-container">
        {loading ? (
          <LoaderPlant />
        ) : (
          <RegisterForm
            onStartLoading={handleStartLoading}
            onFinishLoading={handleFinishLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Register;


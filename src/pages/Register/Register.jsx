import React, { lazy, Suspense } from "react";
import Background from "../../components/background/background";
import LoaderPlant from "../../components/LoaderPlant/LoaderPlant"; // tu loader animado
import './Register.css';

const RegisterForm = lazy(() => import("../../components/RegisterForm/RegisterForm"));

const Register = () => {
  return (
    <div className="register">
      <Background />

      <div className="register-container">
        <Suspense fallback={<LoaderPlant />}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Register;

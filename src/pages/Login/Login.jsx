import React, { lazy, Suspense } from "react";
import Background from "../../components/background/background";
import LoaderPlant from "../../components/LoaderPlant/LoaderPlant";
import './Login.css';

const LoginForm = lazy(() => import("../../components/LoginForm/LoginForm"));

const Login = () => {
  return (
    <div className='login'>
      <Background />

      <div className="login-container">
        <Suspense fallback={<LoaderPlant />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Login;



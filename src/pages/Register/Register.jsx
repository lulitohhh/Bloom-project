import Background from "../../components/background/background";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import './Register.css'


const Register = () => {


    return (
      <div className="register">
        <Background />
        
        <div className="register-container">
            <RegisterForm></RegisterForm>

        </div>
       
        
      </div>
    );
  };
  
  export default Register;
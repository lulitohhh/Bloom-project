import Background from "../../components/background/background";
import LoginForm from "../../components/LoginForm/LoginForm";
import './Login.css'
const Login = () => {


    return (
      <div className='login'>
        <Background />
        
        <div className="login-container">
            <LoginForm></LoginForm>

        </div>
       
        
      </div>
    );
  };
  
  export default Login;

import './LoginForm.css'

const LoginForm = () =>{

    return(

        <div className="log-container">
            <h1 className='log-title'>LOGIN</h1>
            
            <div className="input-container">
                <label className='bloom-label'><input className="bloom-input" type="text" placeholder="Joseph123"/></label>
                <label className='bloom-label'><input className="bloom-input" type="password" placeholder="Type your password here" /></label>
            </div>
            <button id="logButton">Login</button>



        </div>
    )

}

export default LoginForm;
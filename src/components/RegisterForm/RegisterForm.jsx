import './registerForm.css'

const RegisterForm = () =>{

    return(

        <div className="reg-container">
            <h1 className='reg-title'>REGISTER</h1>
            
            <div className="reg-input-container">
                <div className="text-input-container">
                    <label className='bloom-label'><input className="bloom-input" type="text" placeholder="Name"/></label>
                    <label className='bloom-label'><input className="bloom-input" type="text" placeholder="Username" /></label>
                    <label className='bloom-label'><input className="bloom-input" type="password" placeholder="Password"/></label>
                </div>
                <label className='avatar-label'>
                    <button className='avatar-button'></button>
                    <button className='avatar-button'></button>
                    <button className='avatar-button'></button>
                    <button className='avatar-button'></button>
                    <button className='avatar-button'></button>
                    <button className='avatar-button'></button>
                </label>
            </div>
            <button id="regButton">Login</button>



        </div>
    )

}

export default RegisterForm;
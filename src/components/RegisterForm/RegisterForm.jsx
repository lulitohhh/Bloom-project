import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import './registerForm.css'

const RegisterForm = () =>{

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[placeholder="Username"]').value; // Asumo que "Username" es el email
    const password = e.target.querySelector('input[placeholder="Password"]').value;
    const name = e.target.querySelector('input[placeholder="Name"]').value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuario registrado:", user.uid);
      // Aquí puedes redirigir o mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error al registrar:", error.message);
      // Muestra el error en tu UI (ej: con un toast o un alert)
    }
  };




    return (
    <div className="reg-container">
      <h1 className='reg-title'>REGISTER</h1>
      <form onSubmit={handleSubmit} className='reg-form'> 
        <div className="reg-input-container">
          <div className="text-input-container">
            <label className='bloom-label'>
              <input className="bloom-input" type="text" placeholder="Name" required />
            </label>
            <label className='bloom-label'>
              <input className="bloom-input" type="email" placeholder="Username" required /> {/* Cambiado a type="email" */}
            </label>
            <label className='bloom-label'>
              <input className="bloom-input" type="password" placeholder="Password" required minLength="6" />
            </label>
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
        <button id="regButton" type="submit">Register</button> {/* Cambiado a type="submit" */}
      </form>
    </div>
  );

}

export default RegisterForm;
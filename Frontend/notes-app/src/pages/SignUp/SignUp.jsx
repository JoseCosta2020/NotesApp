// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import NavBar from '../../components/NavBar/NavBar';
import PasswordInput from '../../components/Input/PasswordInput';

const SignUp = () => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = (e) => {
        e.preventDefault()

        if(!validateEmail(email)) {
            setError("O email está incorreto");
            return;
        }
        if(!password) {
            setError("Campos em Falta");
            return
        }
        if(password !==confirmPassword){
            setError("Passord não coincide");
            return;
        }
        setError("")
    };

    return <>
        <NavBar/>
        <div className='flex items-center justify-center mt-28'>
            <div className="w-96 border rounded bg-white px7 py-10">
                <form onSubmit={handleSignUp}>
                    <h4 className="text-2xl mb-7">Sign Up</h4>
                    <input
                        type="text"
                        placeholder="Email"
                        className="input-box"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <PasswordInput
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    <PasswordInput
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                    />
                    {error}
                    <button type="submit" className="btn-primary mt-3 w-full">Create Acount</button>

                    <p className='text-sm text-center mt-4'>Already have an account?
                    <Link to='/login' className='font-medium text-primary underline'> Login</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
}

export default SignUp
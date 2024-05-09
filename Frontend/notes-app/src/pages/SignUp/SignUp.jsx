// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import NavBar from '../../components/NavBar/NavBar';
import PasswordInput from '../../components/Input/PasswordInput';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const handleSignUp = async (e) => {
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
        if(!fullName){
            setError("Nome completo");
            return;
        }
        setError("")

        // API Call Login
        try {
            const response = await axiosInstance.post("/create-account",{
            email:email,
            fullName:fullName,
            password:password,
            confirmPassword:confirmPassword
            });
            console.log(response.data)
            //Handle successful  response
            navigate('/Login')
        }catch(error){
            if(error.response && error.response.data && error.response.data.message){
            setError(error.response.data.message);
            } else {
            setError('An expected error occured')
            }
        }

    };

    return <>
        <NavBar/>
        <div className='flex items-center justify-center mt-28'>
            <div className="w-96 border rounded bg-white px7 py-10">
                <form onSubmit={handleSignUp}>
                    <h4 className="text-2xl mb-7">Sign Up</h4>
                    <input type='text'
                            placeholder='Nome Completo'
                            className='input-box'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}/>
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
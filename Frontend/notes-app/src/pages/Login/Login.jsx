// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import {Link, useNavigate} from "react-router-dom"
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a validate email address");
      return;
    }
    if(!fullName){
      setError('Please entre full Name')
      return
    }
    if(!password) {
      setError("Please enter the password")
      return;
    }

    {/* Se o email for válido o estado do erro é limpo "" e nao apece nada*/}
    setError("")
    console.log("URL da solicitação:", axiosInstance.defaults.baseURL + "/login");

    // API Call Login
    try {
      const response = await axiosInstance.post("/login",{
        email:email,
        fullName:fullName,
        password:password
      });
      console.log(response.data.accessToken)
      //Handle successful login response
      if(response.data && response.data.accessToken){
         localStorage.setItem("token", response.data.accessToken)
         navigate('/Home')
      }

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
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7'>Login</h4>
          {/* (input-box) and (btn-primary) <---components in index.css */}
          <input type='text' placeholder='Email' className='input-box' 
           value={email}
           onChange={(e) => setEmail(e.target.value)}
          />
          <input type='text' placeholder='FullName' className='input-box' value={fullName} onChange={(e) => setFullName(e.target.value)}/>
          <PasswordInput 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />

          {<p className='text-red-500 text-xs pb-1'>{error}</p>}

          <button type='submit'                  className='btn-primary'>Login</button>
           <p className='text-sm text-center mt-4'>
             Not registered yet?{""}
            <Link to="/SignUp" className="font-medium text-primary underline"> Create an Account </Link>
           </p>
        </form>
      </div>
    </div>
  </>;
};

export default Login
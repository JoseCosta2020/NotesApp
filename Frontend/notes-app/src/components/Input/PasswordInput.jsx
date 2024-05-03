/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6"

const PasswordInput = ({value, onChange, placeholder}) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
        {/* Aqui neste input a password está escondida por lá em cima estar escrito false!*/}
        <input 
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text": "password"}
        placeholder={placeholder || "Password"} 
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
        />
        {/* Icon para mostrar a password que se escreveu */}
        {/* Dois icons mencionados é exatamente para isso um que mostra o icon normal outro o icon com um traço*/}
        {isShowPassword ? (
            <FaRegEye
                size={22}
                className='text-primary cursor-pointer'
                onClick={()=> toggleShowPassword()}
            />
        ):(
            <FaRegEyeSlash
                size={22}
                className='text-primary cursor-pointer'
                onClick={()=> toggleShowPassword()}
            />
        )}     
    </div>
  )
}

export default PasswordInput
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import {LuCheck} from 'react-icons/lu'
import { MdDeleteOutline } from 'react-icons/md'

const ToastMessage = ({isShow, message, type, onClose}) => {

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000)
    return () => {
      clearTimeout(timeoutId);
    }
  },[onClose])

  return (
    <>
    {isShow && (
      <div className={`min-w-52 bg-white ${type === "delete" ? "after:bg-red-500":"after:bg-green-500"}
          after:absolute after:left-0 after:top-0 after:rounded-l-lg`}>
          <div className={`w-10 ${type === "delete" ? "bg-red-50": "bg-green-50"}`}>
            {type !== "delete" ? (
              <LuCheck className="text-xl text-green-500"/>
            ): (
              <MdDeleteOutline className='text-xl text-red-300'/>
            )}
          </div>
        <p>{message}</p>
      </div>
    )}
  </>
  )
}

export default ToastMessage
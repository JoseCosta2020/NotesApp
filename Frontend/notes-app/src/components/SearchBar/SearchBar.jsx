// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from "react-icons/io";

{/* Recebe várias props o search bar*/}
{/*value-> o que está escrito
   onChange-> sempre que muda o valor da caixa de entrada
   handleSearch-> O que irá ser feito quando se clica no icon procurar
   onClearSearch-> Apaga o texto sempre que se clica nesse icon setSearchQuery("")
*/}
const SearchBar =  ({value, onChange, handleSearch, onClearSearch}) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-sm">
        <input 
        type="text"
        placeholder='Search Notes'
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
        />
        {/* Se estiver o value escrito implica que o icon x aparece */}
        { value && (<IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3" onClick={onClearSearch} />)}

        <FaMagnifyingGlass className="text-slate-400 cursor-pointer hover:text-black mr-3" onClick={handleSearch} />
    </div>
  )
}

export default SearchBar
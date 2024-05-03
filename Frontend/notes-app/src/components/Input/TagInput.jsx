// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({tags, setTags}) => {

    const [inputValue, setInputValue] = useState('');

    const handleTag = (e) => {
        setInputValue(e.target.value);
    }

    const addNewTag = () => {
        {/* .trim limpa a string
            / Verifica se o inputValue não está vazio após remover os espaços em branco e se não acrescenta a tag á lista*/}
        if(!inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
        }
        {/** Limpar a coluna depois de ser acrescenta a tag */}
        setInputValue('')
    };

    {/*Esta função permite verificar input para além do botão mas no botão enter também*/}
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

  return (
    <div>
        {tags?.length > 0 && (
        <div className='flex items-center gap-2 flex-wrap mt-2'>
            {tags.map((tag,index) => (
                <span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>
                 # {tag}
                 <button onClick={() => {handleRemoveTag(tag)}}>
                    <MdClose/>
                 </button>
                </span>
            ))}
        </div>
        )}

        <div className='flex items-center gap-4 mt-3'>
            <input
             type="text" 
             value={inputValue}
             className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
              placeholder='Add Tags'
              onChange={handleTag}
              onKeyDown={handleKeyDown}
              />
            <button className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-slate-800"
            onClick={()=>{addNewTag()}}>
                <MdAdd className="text-2xl text-blue-700 hover:text-white" />
            </button>
        </div>
    </div>
  )
}

export default TagInput
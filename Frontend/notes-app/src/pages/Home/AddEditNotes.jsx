// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import TagInput from "../../components/Input/TagInput";
import { MdAdd, MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({NoteData, type, getAllNotes, onClose, showToastMessage}) => {

    const [title, setTitle] = useState(NoteData?.title || "");
    const [content, setContent] = useState(NoteData?.content ||"");
    const [tags, setTags] = useState(NoteData?.tags || []);
    const [error, setError] = useState(null)

    //Add Notes
    const addNewNote = async () => {
        try{
          const response = await axiosInstance.post('/add-note', {
            title,
            content,
            tags,
          });
           if(response.data && response.data.note){
                showToastMessage("Note Added Successfully")
                onClose()
                getAllNotes()
           }
        }catch(error){
            if (error.response && error.response.data && error.response.data.message)
            {
                setError('Erro Editar')
            }
            
        }
    }

    //Add Notes
    const updateNote = async () => {
        const noteId = NoteData._id
        try{
          const response = await axiosInstance.put('/edit-note/' + noteId, {
            title,
            content,
            tags,
          });
           if(response.data && response.data.note){
                showToastMessage("Note Updated Success")
                onClose()
                getAllNotes()
                
                
           }
        }catch(error){
            if (error.response && error.response.data && error.response.data.message)
            {
                setError('Erro Editar')
            }
            
        }
    }

    const handleNotes = async () =>{
        if(!title) {
            setError('Falta inserir o title')
            return;
        }
        if(!content) {
            setError('Falta inserir o content')
            return;
        }
        setError("")
        if(type ==='edit'){
            console.log('Edit tags',tags)
            await updateNote()
        }else{
            console.log('Add tags',tags)
            await addNewNote()
        }

    }

  return (
    <div className='relative'>
        {/*-3 top e right indica que o botão x está do outro lado da ágina*/}
        <div className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3'>
            <button className='flex flex-col gap-2' onClick={onClose}>
                <MdClose/>
            </button>
        </div>
        <div className='flex flex-col gap-2'>
            <label className='input-label' >Title</label> 
            <input
             type="text"
             className='text-2xl text-slate-250 outline-none'
             placeholder='Go to Gym At 5'
             value={title}
             onChange={({ target }) => setTitle(target.value)}
                /> 
        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label'>CONTENT</label>
            <textarea
             type="text"
             className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
             placeholder='Insert'
             rows={10}
             value={content}
             onChange={({ target }) => setContent(target.value)}
            />
        </div>
        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>
        
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button className='btn-primary font-medium mt-5 p-3' onClick={handleNotes}>
        {type === 'edit' ? 'UPDATE':'ADD'}
        </button>

    </div>
  )
}

export default AddEditNotes
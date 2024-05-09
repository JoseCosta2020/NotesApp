// eslint-disable-next-line no-unused-vars
import React from 'react'
import {MdOutlinePushPin} from "react-icons/md";
import {MdCreate, MdDelete} from "react-icons/md";

const NoteCard = ({
    key,
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote
}) => {
  return (
    <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
        <div className="flex items-center justify-between">
            <div >
                <h6>{key}</h6>
                <h6 className="text-sm font-medium">{title}</h6>
                <spam className="text-sm font-medium">{date}</spam>
            </div>
            <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary':'text-slate-200'}`} onClick={onPinNote} />
        </div>
        <p className="text-xs text-slate-600 mt-2">{content?.slice(0,60)}</p>
       
        <div className="">
            <div className='text-xs text-slate-500'>
                {tags}
            </div>
            <div className="flex items-center gap-2">
                <MdCreate
                    className="icon-btn hover:text-green-600"
                    onClick={onEdit}
                />
                <MdDelete
                    className="icon-btn hover:text-red-500"
                    onClick={onDelete}
                />
            </div>
        </div>
    </div>
  )
}

export default NoteCard
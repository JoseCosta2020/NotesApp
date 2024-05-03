// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";

const Home =() => {
    const [openAddEditModel, setOpenAddEditModel] = useState({
        isShow: false,
        type: "add",
        data: null,
    });
    return (
        <>
        <NavBar/>

        <div className="container mx-auto">
            {/* Por cada linha tenho 3 Notebooks e depois vai para baixo */}
            <div className="grid grid-cols-3 gap-4 mt-8">
                <NoteCard 
                title="Meeting on 7 April" 
                date="7 April 2020" 
                content="Primeiro content"
                tags="#Meeting"
                isPinned={true}
                onEdit={()=>{}}
                onDelete={()=>{}}
                onPinNote={()=>{}}
                />
                <NoteCard 
                title="Meeting on 7 April" 
                date="7 April 2020" 
                content="Primeiro content"
                tags="#Meeting"
                isPinned={true}
                onEdit={()=>{}}
                onDelete={()=>{}}
                onPinNote={()=>{}}
                />
                <NoteCard 
                title="Meeting on 7 April" 
                date="7 April 2020" 
                content="Primeiro content"
                tags="#Meeting"
                isPinned={true}
                onEdit={()=>{}}
                onDelete={()=>{}}
                onPinNote={()=>{}}
                />
                <NoteCard 
                title="Meeting on 7 April" 
                date="7 April 2020" 
                content="Primeiro content"
                tags="#Meeting"
                isPinned={true}
                onEdit={()=>{}}
                onDelete={()=>{}}
                onPinNote={()=>{}}
                />
            </div>
        </div>

        <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" 
        onClick={() => {
        setOpenAddEditModel({ isShow: true, type: "add", data: null});
        }}>
            <MdAdd className="text-[32px] text-white" />
        </button>

        <Modal
            isOpen={openAddEditModel.isShow}
            onRequestClose={() => {}}
            style={{
                overlay: {
                    backgroundColor: "rgba(0,0,0,0.2)",
                },
            }}
            contentLabel=""
            className="w-[40%] bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
            <AddEditNotes
                type={openAddEditModel.type}
                NoteData={openAddEditModel.data}
                onClose={() => {
                setOpenAddEditModel({ isShow: false, type: "add", data: null});
                }}
            />
        </Modal>
        </>
    )
}

export default Home
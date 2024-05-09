// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import ToastMessage from "../../components/ToastMessage/ToastMessage";

const Home =() => {
    const [openAddEditModel, setOpenAddEditModel] = useState({
        isShow: false,
        type: "add",
        data: null,
    });
    const [showToastMsg, setShowToastMsg] = useState({
        isShow: false,
        message:"",
        type:"add",
    });

    const [userInfo, setUserInfo] = useState(null);
    const [userNotes, setUserNotes] = useState([]);
    const navigate = useNavigate();

    //Handle Edit
    const handleEdit = (noteDetails) => {
        setOpenAddEditModel({ isShow:true, data: noteDetails, type:'edit'})
    }

    //Show Message
    const showToastMessage =(message, type) => {
        setShowToastMsg({
            isShow:true,
            message,
            type
        })
    }

    //Close toast
    const handleCloseToast =() => {
        setShowToastMsg({
            isShow:false,
            message:""
        })
    }

    //Get User Info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get('/get-user')
            console.log('Resposta',response.data)
            if (response.data && response.data.isUser) {
                setUserInfo(response.data.isUser);
            }
        } catch(error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
    };

    // API Call Notes
    const getNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes")
            if (response.data && response.data.notes) {
                setUserNotes(response.data.notes);
                console.log('NOTES:',response.data.notes)
            }   
          }catch(error){
            console.log("An unexpected error occurred. Please try again")
        }
     }

    // Delete Note
     const handleDelete = async (noteDetails) => {
        try{
            const noteId=noteDetails._id
            const response = await axiosInstance.delete('/delete-note/'+noteId);
             if(response.data && !response.data.error){
                  getNotes();
                  showToastMessage('Deleted Note successfully')
             }
          }catch(error){
              if (error.response && error.response.data && error.response.data.message)
              {
                  console.log('Erro Editar')
              }
              
          }
    }


    useEffect(() => {
        getUserInfo();
        getNotes();
        return () => {};
    }, []);

     


    return (
        <>
        <NavBar userInfo={userInfo}/>
        <div className="container mx-auto">
            {/* Por cada linha tenho 3 Notebooks e depois vai para baixo */}
            <div className="grid grid-cols-3 gap-4 mt-8">
                {userNotes.map((item, index) => (
                    <NoteCard 
                    key={item._id}
                    title={item.title}
                    date={moment(item.createdOn).format('Do MMM YYYY')}
                    content={item.content}
                    tags={item.tags}
                    isPinned={item.isPinned}
                    onEdit={()=>{handleEdit(item)}}
                    onDelete={()=>{handleDelete(item)}}
                    onPinNote={()=>{}}
                />
                ))}
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
                setOpenAddEditModel({ isShow: false, type: "add", data: null})
                }}
                getAllNotes={getNotes}
                showToastMessage={showToastMessage}
            />
        </Modal>

        <ToastMessage
          isShow={showToastMsg.isShow}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
        />

        </>
    )
}

export default Home
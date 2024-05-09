require('dotenv').config();

const config = require("./config.json");
const mongoose = require("mongoose");
mongoose.connect(config.connectionString);

const User = require("./Models/user.model");
const Note = require("./Models/note.model")

const express = require("express")
const cors = require("cors")
const app = express();

const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./utilities");

app.use(express.json())
app.use(cors({origin: "*",}));
const accessTokenSecret = process.env.ACESS_TOKEN_SECRET;

//Retorna assim Get
app.get("/", (req, res)=> {
    res.json({
        content:"Hello!",
        date:"12-20-2005",
    })
});

//Get User
app.get('/get-user', authenticateToken, async(req, res) => {
    const { user } = req.user;

    //Await permite que esta operação seja terminada a busca na BD antes da proxima linha de código executar
    const isUser = await User.findOne({_id:user.user._id})
    console.log('Is User',isUser)
    user_without_pass ={
        'fullName':isUser.fullName,
        'email':isUser.email,
        'id':isUser._id
    }

    res.status(200).json({error:false, message:'Este é o user', isUser:user_without_pass})
})


//Cria Conta
app.post("/create-account", async (req, res) => {
    const { fullName, email, password, confirmPassword} = req.body;

    if(!fullName) {
        return res
            .status(400)
            .json({error: true, message: "Full Name is required"});
    }

    if(!email) {
        return res.status(400).json({ error: true, message: "Email is required"})
    }

    if(!password) {
        return res.status(400).json({ error: true, message: "Password is required"})
    }
    if(password != confirmPassword){
        return res.status(400).json({erro: true, message:"Passwords Incongruentes"})
    }

    const isUser = await User.findOne({email: email});

    if(isUser) {
        return res.json({
            error: true,
            message:"User Already exist",
        })
    }

    //Se o email não estiver associado a nenhum User, cria-se um novo user para a lista, com os dados fornecidos
    //fullName, email, password
    //E guardas .save()
    const user= new User({
        fullName,
        email,
        password,       
    });
    await user.save()

    //Após criado o novo utilizador, gera-se um token de acesso usando a biblioteca jsonwebtoken.
    //Este token é assinado utilizando a chave secreta definida .ACESS_TOKEN_SECRET e contém informações do user recém criado
    //O token tem um tempo de expiração de 36000 minutos(10 horas) 
    const accessToken = jwt.sign({user}, process.env.ACESS_TOKEN_SECRET, {
        expiresIn:"36000m",
    });

    //Resposta para confirma registo!
    return res.json({
        error: false,
        user,
        accessToken,
        message:"Registration Successful!",
    })
})

//login
app.post("/login", async (req,res) => {
    const {fullName, email, password} = req.body;
    console.log(fullName,email)
    if(!fullName){
        return res.status(400).json({ message: "Preenche nome"});
    }
    if(!email){
        return res.status(400).json({ message:"Preenche email"})
    }
    if(!password){
        return res.status(400).json({ message:"Preenche password"})
    }

    //Vai ao mongodb procurar por email
    //Apenas procurar por email basta pois é único
    const userInfo = await User.findOne({email: email});

    if(!userInfo){
        res.status(400).json({error:true, message:'User not found'})
    }

    if(userInfo.fullName==fullName && userInfo.email == email && userInfo.password == password) {
        const user = {user: userInfo};
        const accessToken = jwt.sign({ user,
            }, process.env.ACESS_TOKEN_SECRET, {
            expiresIn:"36000m",
        });
        console.log('A chave secreta do token de acesso ém:', accessToken);
        res.json({
            error:false,
            message:'Credenciais corretas',
            email,
            accessToken,
        });}
    else{
            return res.status(400).json({
                error: true,
                message:'Credenciais Incorretas',
        })
        }
    }
)

//Add Note
app.post('/add-note', authenticateToken, async(req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;
    //console.log(req.user)
    if(!title){
        return res.status(400).json({ message: "Preenche o titulo!"});
    }
    if(!content){
        return res.status(400).json({ message:"Preenche o conteúdo!"})
    }
    console.log('O id do usuário é:', user.user._id);
    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user.user._id,
        });
        console.log(note)
        await note.save()
        console.log(note)
        return res.json({
            error:false,
            note,
            message: "Note added successfully"
        })
    }
    catch(error) {
    return  res.status(500).json({
            error: true,
            message:"Interner server"
        })
    }

})

//Edit Note
app.put('/edit-note/:note_id',  authenticateToken, async(req, res) => {
    const note_id = req.params.note_id;
    const {title, content, tags, isPinned} = req.body;
    const {user} = req.user;
    console.log('Note Id',note_id)
    if(!title && !content && !tags) {
        return res.status(400)
                  .json({error:true, message:"No changes provided"});
    }
    console.log(title,content,tags)

    try {
        const note = await Note.findOne({ _id: note_id, userId: user.user._id});
        console.log('Note BD', note)
        note.title = title;
        note.content = content;
        note.tags = tags;
        note.isPinned = isPinned;

        await note.save()

        return res.json({
             error: false,
            'note': note,
            message: 'Note added sucessfully'
        })
    } catch(error){
        res.json({message:'Erro claro'})
    }
    
})

//Get Note
app.get('/get-all-notes/',  authenticateToken, async(req, res) => {
    const {user} = req.user
    console.log
    try {
        const notes = await Note.find({userId : user.user._id})
        console.log('Notes',notes)
        return res.json({
            error:false,
            notes,
            message:'Notes destes ids'            
        })
    }catch(error) {
        res.json({
            error:true,
            message:"Internal server error"
        })
    }
})

//Delete Notes
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId
    const {user} = req.user

    try {
        const notes = await Note.findOne({_id:noteId, userId: user.user._id});
        
        await Note.deleteOne({_id: noteId, userId: user.user._id})

        return res.json({message:'Ola'})
    }catch(error) {
        res.json({
            error:true,
            message:'Notes'
        })
    }
})

//Update IsPinned Value
app.put('/update-note-pinned/:note_id',  authenticateToken, async(req, res) => {
    const{user} = req.user;
    const note_id= req.params.note_id;
    const {isPinned} = req.body;

    console.log(note_id)
    console.log('User note', user.user._id)
    
    try{
       const notes = await Note.findOne({_id:"6638d07a9c7e51df3e2fc82a", userId: "6635629422de9322fd53b4ab"});
       if(!notes){
        res.status(404).json({error:'Error', message:'Note nao existe'})
       }
       console.log('OKOK',notes)
       notes.isPinned = isPinned

       await notes.save()
       res.json({
        error:'false',
        message:notes
       })
       
    }catch(error){
        res.json({message:'Error'})
    }

})

app.listen(8000);
module.exports = app;

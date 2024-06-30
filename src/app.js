const express = require("express");
const app = express();

//------------------------------------- DATABASE ----------------------------- 

require("./db/conn");
const notesUser = require("./models/notesUser");
const note = require("./models/note");

// --------------------------------------- VIEW ENGINE ------------------------

const path = require("path");
const hbs = require("hbs");

const port = process.env.PORT || 8000;

// ------------------------------ PATHS ---------------------------------

const staticPath = path.join(__dirname,"../publlc");
const tempatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");



app.use(express.json());
app.use(express.urlencoded({
    extended:false
}))


app.use(express.static(staticPath));
app.set("view engine","hbs");
app.set("views",tempatePath);
hbs.registerPartials(partialsPath);






// ------------------------------------ ROUTES ----------------------------------------

app.get("/",(req,res)=>{
    res.render("login");
})

app.get("/login",(req,res)=>{
    res.render("login");
})




app.get("/registration",(req,res)=>{
    res.render("registration");
})

app.post("/registration", async(req,res)=>{
    try {
        const newPerson = new notesUser(req.body);
        const registeredPerson = await newPerson.save();
        
        // console.log(registeredPerson._id);

        res.render("login");
    } catch (error) {
        res.send(error);
    }   

})


app.post("/login",async(req,res)=>{
    try {
        const temail = req.body.email;
        const tpass = req.body.password;
    
        const dbemail = await notesUser.findOne({email:temail});
        

        if(tpass===dbemail.password){
            res.redirect(`/index?id=${dbemail._id}`);
        }
    } catch (error) {
     res.send(error); 
    }
})



// app.get("/index",async(req,res)=>{
    
//     try {
//         const userid = req.query.id;

//         if(!userNotes){
//             const userNotes = await note.find({id:userid}, (err,Notesdoc)=>{
//                 if(err){
//                     console.error(err);
//                     return res.status(500).send('Internal server error');
//                 }
//                 // console.log(Notesdoc[0]);
//                 res.render("index",{Notesdoc})
//             });
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })
app.get("/index", async (req, res) => {
    try {
      const userid = req.query.id;
  
      let userNotes = await note.find({ id: userid }).exec();
  
      if (!userNotes) {
        return res.status(404).send("Notes not found");
      }

      

      res.render("index", { Notesdoc: userNotes, userid });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  });
  
  
  
  app.get("/business", async (req,res) =>{
    try {
        
        const userid = req.query.id;
        let category = await note.find({categories:"business"})
        if (!category) {
            return res.status(404).send("Notes not found");
          }
    
          
    
          res.render("index", { Notesdoc: category, userid });
    } catch (error) {
        
    }
  } )
  app.get("/health", async (req,res) =>{
    try {
        
        const userid = req.query.id;
        let category = await note.find({categories:"health"})
        if (!category) {
            return res.status(404).send("Notes not found");
          }
    
          
    
          res.render("index", { Notesdoc: category, userid });
    } catch (error) {
        
    }
  } )
  app.get("/personal", async (req,res) =>{
    try {
        
        const userid = req.query.id;
        let category = await note.find({categories:"personal"})
        if (!category) {
            return res.status(404).send("Notes not found");
          }
    
          
    
          res.render("index", { Notesdoc: category, userid });
    } catch (error) {
        
    }
  } )
  app.get("/school", async (req,res) =>{
    try {
        
        const userid = req.query.id;
        let category = await note.find({categories:"school"})
        if (!category) {
            return res.status(404).send("Notes not found");
          }
    
          
    
          res.render("index", { Notesdoc: category, userid });
    } catch (error) {
        
    }
  } )
  app.get("/family", async (req,res) =>{
    try {
        
        const userid = req.query.id;
        let category = await note.find({categories:"family"})
        if (!category) {
            return res.status(404).send("Notes not found");
          }
    
          
    
          res.render("index", { Notesdoc: category, userid });
    } catch (error) {
        
    }
  } )
  







app.get("/add-notes/:id",(req,res)=>{
    const userid = req.params.id;
    res.render("add-notes", {userid});
})
app.post("/add-notes/:id",async(req,res)=>{
    try {
        const newNote = new note({
            id:req.params.id,
            categories:req.body.categories,
            title:req.body.title,
            notes:req.body.notes

        })
        
        const newNoteSave = await newNote.save();
        // res.redirect("/index");
        res.redirect(`/index?id=${req.params.id}`);
    
        
    } catch (error) {
        res.send(error);
    }
})





app.delete("/delete/:id", async(req,res)=>{
    try{
        const userid = req.params.id;
        await note.findByIdAndDelete(userid);
        
    }catch(err){
        console.log(err);
    }



})






app.listen(port, (req,res)=>{
    console.log("listeninig");
})
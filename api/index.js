const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const multer = require('multer');
const bodyParser = require("body-parser");
const authRouthe = require('./routhes/authRouthe');
const postRouthe = require("./routhes/postRouthe")
const userRouthe = require("./routhes/userRouthe")
 
    
 
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "./images")));
   
   
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  }) 
); 
 
mongoose 
  .connect('mongodb+srv://samir:test1234@cluster0.1v5vw.mongodb.net/Blog_figma?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true

  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);   
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  }); 
   

  app.use(authRouthe)
  app.use(postRouthe) 
  app.use(userRouthe)

 
app.listen( process.env.PORT || 4000, () => {
    console.log("Server Has Started");
  });

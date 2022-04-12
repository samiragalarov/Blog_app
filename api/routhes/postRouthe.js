const router = require('express').Router();
const Post = require('../modules/Post')
const {
    verifyToken,
    verifyTokenAndAuthorization,
  } = require(".././middelware/middelware");
const { json } = require('body-parser');

router.post('/createProduct', verifyToken ,async(req,res) =>{
    try{
        const newPost = new Post(req.body);
        const product = await newPost.save();
        res.status(200).json(product);


    }catch(err){
        console.log(err)
        res.status(500).json(err);

    }
})

router.delete('/deleteProduct/:id',verifyTokenAndAuthorization,async(req,res) =>{
    try{

        console.log(req.body.postid)
        const product = await Post.findByIdAndDelete(req.body.postid)
        
        res.status(200).json(product)
  
    }catch(err){
        console.log(err)
        res.status(500).json(err);

    }
})

router.get('/getPosts' , verifyToken,async(req,res) =>{
    try{
        const products = await Post.find()
        res.status(200).send(products);


    }catch(err){
        
        res.status(500).send(err);

    }

})
//,verifyToken


router.get("/getbyCategory" ,async(req,res)=>{
    try{
        const product = await Post.find({categories :req.query.cat})
        res.status(200).send(product);

    }catch(err){
        res.status(500).send(err);

    }
})

///get lastest products

router.get("/getlastest" , async(req,res)=>{
    try{
        const product = await Post.find().sort({$natural: -1 }).limit(6)
        res.status(200).send(product);
 
    }catch(err){
        res.status(500).send(err);

    } 
})

//get single product
router.get('/getPost/:id', verifyToken  ,async(req,res) =>{
    try{
        const products = await Post.findById(req.params.id)
        res.status(200).send(products);


    }catch(err){
        
        res.status(500).send(err);

    }

})



///pagintation
router.get("/pagination", async(req,res)=>{
    

    try{
        const a = req.query.limit 
        let startindex = req.query.startIndex
  

        const products = await Post.find().limit(JSON.parse(6)).skip(JSON.parse(startindex)).exec()
        res.status(200).send(products);

    }catch(err){
        console.log(err)
        res.status(500).send(err);

    }
})

// http://localhost:4000/getbyCategory/?cat=foorbal

module.exports = router;

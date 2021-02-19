//create mini express app
const exp = require("express");
const userApiObj = exp.Router();
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const verifyToken=require("./middlewares/verifyToken")

//import 
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")



//configure cloudinary
cloudinary.config({
    cloud_name: 'djqbwmvjg',
    api_key: '492171555336437',
    api_secret: 'OO5HtI8g0gpuIZyjR3m1jXa9-KE'
});


//configure cloudinary storage

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async (req, file) => {
        return {
        folder: 'cdb37',       
        public_id: file.fieldname + '-' + Date.now()
    }},
});

//congigure multer
var upload = multer({ storage: storage });









const errorHandler = require("express-async-handler")

//extract body of req obj
userApiObj.use(exp.json())


//post req handler for user register
userApiObj.post("/register", upload.single('photo'), errorHandler(async (req, res, next) => {


    

    //get user collectionobject
    let userCollectionObject = req.app.get("userCollectionObject")

    let userObj =  JSON.parse(req.body.userObj)

    //console.log(userObj)


    //console.log("req body is ",req.body)

 
    //check for user in db
    let user = await userCollectionObject.findOne({ username: userObj.username })

    //if user is existed
    if (user !== null) {
        res.send({ message: "user existed" })
    }
    else {

        //hash the password
        let hashedPw = await bcryptjs.hash(userObj.password, 6)
        //replace plain text pw with hashed pw
        userObj.password = hashedPw;

        //add userImagelink
        userObj.userImgLink = req.file.path;
        //create user
        let success = await userCollectionObject.insertOne(userObj)

        res.send({ message: "user created" })
    }


}))




//user login
userApiObj.post("/login", errorHandler(async (req, res, next) => {

    //get user collectionobject
    let userCollectionObject = req.app.get("userCollectionObject")

    let userCredObj = req.body;

    //verify username
    let user = await userCollectionObject.findOne({ username: userCredObj.username })

    //if user not existed
    if (user == null) {
        res.send({ "message": "Invalid username" })
    }
    else {

        //verify password
        let status = await bcryptjs.compare(userCredObj.password, user.password)

        //if pws matched
        if (status == true) {

            //create a token 
            let token = await jwt.sign({ username: user.username }, process.env.secret, { expiresIn: 10 })

            //send token
            res.send({ message: "success", signedToken: token, username: user.username })

        }
        else {
            res.send({ message: "Invalid password" })
        }

    }

}))




//get user
userApiObj.get("/getuser/:username",verifyToken,errorHandler(async (req,res,next)=>{

     //get user collectionobject
     let userCollectionObject = req.app.get("userCollectionObject")

    let userObj=await userCollectionObject.findOne({username:req.params.username})
    res.send({message:"success",user:userObj})

}))

//export
module.exports = userApiObj;
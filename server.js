//create express obj
const exp=require("express")
const app=exp();


//import dotenv
require("dotenv").config();


const path=require("path")
const mc=require("mongodb").MongoClient;


//connect angular app with web server
app.use(exp.static(path.join(__dirname,"./dist/CDB37CompleteApp")))


//import api objects
const userApiObj=require("./APIS/userApi")

const adminApiObj=require("./APIS/adminApi")


//forward req object to specific API based on path
 app.use("/user",userApiObj)

 app.use("/admin",adminApiObj)



//database url
const dburl = process.env.dburl;




//db connectivity
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{

    //get database object
    const databaseObj=client.db("cdb37db");
    const userCollectionObject=databaseObj.collection("usercollection");
    const productCollectionObject=databaseObj.collection("productcollection")
    const adminCollectionObject=databaseObj.collection("admincollection")

    //sharing collection object
    app.set("userCollectionObject",userCollectionObject)
    app.set("productCollectionObject",productCollectionObject)
    app.set("adminCollectionObject",adminCollectionObject)
    console.log("Db server started")


})
.catch(err=>console.log("err in db connection ",err))



//middleware to handle invalid paths
app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid`})
})


//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"Error occurred",reason:err.message})
})
//assign port number
const port=process.env.port||8080;
app.listen(port,()=>console.log(`Web server on port ${port}`))
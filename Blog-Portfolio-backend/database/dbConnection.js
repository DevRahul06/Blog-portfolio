import mongoose from "mongoose";

const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "MERN-BLOG-PORTFOLIO"
    }).then(()=>{
        console.log("Connected to BLOG-PORTFOLIO")
    }).catch((error)=>{
        console.log(`Failed to connect to BLOG-PORTFOLIO: ${error}`)
    })
}

export default dbConnection;
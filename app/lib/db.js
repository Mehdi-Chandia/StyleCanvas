import mongoose from 'mongoose';


const URI=process.env.MONGODB_URI

if(!URI){
    console.log("MongoDB URI doesn't exist");
    return;
}

let isConnected=false;

const dbConnect=async ()=>{
    if(isConnected)return;

    try {
        await mongoose.connect(URI);
        isConnected=true;
        console.log("mongodb connected");
    }catch(err){
        console.log("mongodb connection failed",err);
    }
}

export default dbConnect;
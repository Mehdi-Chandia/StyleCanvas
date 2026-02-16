import mongoose from "mongoose";
import Checkout from "@/models/checkout";
import dbConnect from "@/app/lib/db";

export async function POST(request){

    try {
        const {name,email,phone,address,paymentMethod,totalAmount,items}=await request.json()

        if(!name || !email || !phone || !address || !paymentMethod || !totalAmount){
            return Response.json({
                status:"error",
                message:"Missing required fields",
            },{status:400})
        }

        if(items && items.length>1){
            for(const item of items){
                if(!item.productId || !item.quantity || !mongoose.Types.ObjectId.isValid(item.productId) || item.quantity.length<1){
                    return Response.json({
                        status:"error",
                        message:"Invalid items in order",

                    },{status:400})
                }
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Response.json({
                status: "error",
                message: "Invalid email format",
            }, { status: 400 });
        }

        await dbConnect();

        const createOrder=await Checkout.create({
            name,
            email,
            phone,
            address,
            paymentMethod,
            totalAmount,
            items: items || [],
            status:"pending"
        })

        return Response.json({
            status:"success",
            message:"Successfully created order",
            orderId:createOrder._id,
            createOrder:createOrder,
        },{status:201})

    }catch(err){
        console.log(err);
        return Response.json({
            status:"error",
            message:"Error creating order",
            error:err
        },{status:500})
    }
}

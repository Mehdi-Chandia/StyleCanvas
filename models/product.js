import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    product_name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        enum: ['shirts', 'jeans', 'sneakers', 'jackets'],
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
        default:""
    }
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
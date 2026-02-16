import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    items:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity:{
            type: Number,
            required: true,
            default: 1
        },
        size:{
            type:String,
            enum:['S', 'M', 'L'],
            default:'S',
            required: true
        }
    }],
    orderDate:{
        type: Date,
        default: Date.now
    },
    totalAmount:{
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },

}, { timestamps: true });

export default mongoose.models.Checkout || mongoose.model("Checkout", checkoutSchema);
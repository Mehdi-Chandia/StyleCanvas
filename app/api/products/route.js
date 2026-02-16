import cloudinary from "@/app/lib/cloudinary";
import dbConnect from "@/app/lib/db";
import Product from "@/models/product";


export async function POST(request){
try {
    const formData=await request.formData();

    const product_name=formData.get("product_name");
    const price=formData.get("price");
    const description=formData.get("description");
    const category=formData.get("category");
    const imageFile=formData.get("image");

    if(!imageFile.type.startsWith("image/")){
        return Response.json({
            status:"error",
            message:"Please upload a valid image",

        },{status:400})
    }

    let imageUrl=""

    if(imageFile){
        const bytes=Buffer.from(await imageFile.arrayBuffer());
        const base64=`data:${imageFile.type};base64,${bytes.toString("base64")}`;

        const upload=await cloudinary.uploader.upload(base64,{
            folder:"products",
        })
        imageUrl=upload.secure_url;
    }

    await dbConnect();

    const newProduct=await Product.create({
        product_name,
        price,
        description,
        category,
        image: imageUrl,
    })

    return Response.json({
        status:"success",
        message:"Product created",
        product:newProduct,
    },{status:201})

}catch(error){
    console.log(error);
    return Response.json({
        success: false,
        error: error,
        message:"Request failed."
    },{status:500})
 }

}


export async function GET(request){
    try {
        await dbConnect();
        const products = await Product.find();
        if(products.length > 0){
            return Response.json({
                status:"success",
                message:"Product found",
                products:products,
            },{status:201})
        }
        return Response.json({
            status:"error",
            message:"no product found",
        },{status:404})

    }catch(error){
        console.log(error);
        return Response.json({
            status:"error",
            message:"Request failed.",
            error:error
        },{status:500})
    }
}
"use client"

import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import {useCart} from "@/app/context/CartContext";

const CategoryPage = () => {
    const params = useParams();
    const category = params.category;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const {addToCart,isLoading}=useCart()

    // Store selected size for EACH product
    const [selectedSizes, setSelectedSizes] = useState({});

    const sizes = ['S', 'M', 'L'];

    const images = [
        "/image1.jpg",
        "/image2.jpg",
        "/image3.jpg",
        "/image4.jpg",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    }

    const getProducts =async () => {
        try {
            setLoading(true);
            setError('');
            const response=await fetch("/api/products",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const res=await response.json();

            if(!response.ok){
                console.log(response);
                setError("error fetching products.")
                throw new Error(`HTTP ${response.status}: Failed to fetch products`);
                return;
            }
            console.log(res);
            const ProductsData= res.data || res.products || res
            const filter=ProductsData.filter((p)=> {
                return p.category == category
            });
            console.log("filtered data",filter);

            setProducts(ProductsData);
            setFilteredProducts(filter);


        }catch (error) {
            setError(error);
            console.log(error);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    },[category])

    // Handle size selection for specific product
    const handleSizeSelect = (productId, size) => {
        setSelectedSizes(prev => ({
            ...prev,
            [productId]: size
        }));
    }

    // Get size for specific product (default to 'M' if not selected)
    const getSizeForProduct = (productId) => {
        return selectedSizes[productId] || 'M';
    }

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
                    <p className="mt-4">Loading ...</p>
                </div>
            </div>
        )
    }


    return (

        <div className="min-h-screen pt-20">

            <div className="relative h-[400px] overflow-hidden rounded-md bg-gray-200">
                <div
                    className="flex h-full transition-transform duration-700 ease-in-out"
                    style={{
                        width: `${images.length * 100}%`,
                        transform: `translateX(-${currentSlide * (100 / images.length)}%)`,
                    }}
                >
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="w-full h-full"
                            style={{ width: `${100 / images.length}%` }}
                        >
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl z-10 hover:bg-black"
                >
                    ‹
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl z-10 hover:bg-black"
                >
                    ›
                </button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-4 h-4 rounded-full transition-all ${
                                index === currentSlide
                                    ? 'bg-white'
                                    : 'bg-white/60 hover:bg-white/80'
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl mt-4 font-bold text-gray-800 mb-2 capitalize">
                    {category.toUpperCase()} Collection
                </h1>
                <p className="text-gray-600 mb-8">
                    Browse our premium {category} collection
                </p>

                <div className="w-full h-full ">
                    {filteredProducts.length > 0 ?(
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 mb-8">
                            {filteredProducts.map((product, index) => {
                                const productSize = getSizeForProduct(product._id);

                                return (
                                    <div key={index} className="bg-gray-50 rounded-md border border-blue-200 p-4 shadow-md">
                                        <div className="h-40 overflow-hidden mt-3">
                                            <img src={product.image} alt={product.product_name}
                                                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />

                                        </div>
                                        <div className="mb-2 text-center">
                                            <h3 className="text-lg font-medium text-zinc-600">{product.product_name}</h3>
                                        </div>
                                        <div className="flex gap-6 justify-around items-center mb-2 border border-gray-400 rounded-md px-2">
                                            <p className=" text-lg font-medium text-gray-700">Price</p>
                                            <p>{product.price}<span className="text-green-500 font-bold">PKR</span></p>
                                        </div>
                                        <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
                                        <div className="mt-1">
                                            <div className="flex gap-2 mt-2 mb-3 p-2">
                                                {sizes.map(size => (
                                                    <button
                                                        key={size}
                                                        onClick={() => handleSizeSelect(product._id, size)}
                                                        className={`px-3 py-1 border rounded ${
                                                            productSize === size
                                                                ? 'bg-gray-800 text-white'
                                                                : 'bg-white text-gray-800'
                                                        }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mt-4">
                                            <button onClick={()=> addToCart(product, productSize)} className="w-full sm:w-auto px-3 py-2 rounded-lg text-white bg-gray-600 hover:bg-gray-700 duration-200 whitespace-nowrap text-sm sm:flex-1 text-center">
                                                Add to Cart
                                            </button>
                                            <Link onClick={()=>addToCart(product, productSize)} className="w-full sm:w-auto px-3 py-2 rounded-md text-white bg-gray-400 hover:bg-gray-500 duration-200 whitespace-nowrap text-sm sm:flex-1 text-center"
                                                  href={"/checkout"}>
                                                Buy Now
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    ):(
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 text-lg">No products found in {category} category.</p>
                            <p className="text-gray-400 mt-2">Check back soon or browse other categories.</p>
                            <Link className="text-lg mt-2 text-blue-400" href={"/"}> Back</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;
'use client'

import Image from 'next/image';
import Link from "next/dist/client/link";
import { motion } from "motion/react"

export default function Home() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const categories = [
        { id: 1, name: 'Premium Shirts', slug:"shirts", desc: 'Formal & Casual', image: '/shrts.jpg' },
        { id: 2, name: 'Denim Jeans', slug:"jeans", desc: 'Classic & Modern', image: '/jeans.jpg' },
        { id: 3, name: 'Trendy Sneakers', slug:"sneakers", desc: 'Sporty & Casual', image: '/sneaker.jpg' },
        { id: 4, name: 'Stylish Jackets', slug:"jackets", desc: 'Warm & Fashionable', image: '/jackets.jpg' },
    ];

    return (
        <div className="min-h-screen ">
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                <motion.div initial={{opacity:0 ,y:50 }} animate={{opacity:1, y:0}}
                            transition={{duration:1 , ease:"easeInOut"}} className="absolute inset-0 bg-black/50">
                    <Image
                        src="/bg.jpg"
                        alt="Background"
                        fill
                        className="object-cover opacity-70"
                        priority
                    />
                </motion.div>

                <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-6">
                        <motion.div initial={{opacity:0 ,y:50 }} animate={{opacity:1, y:0}}
                                    transition={{duration:1 ,delay:1, ease:"easeInOut"}}
                                    whileHover={{scale:1.1}} className="max-w-2xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Elevate Your Style
                            </h1>
                            <p className="text-lg text-gray-200">
                                Discover premium fashion that combines comfort with contemporary design.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="py-12 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div initial={{opacity:0 , x:50}} animate={{opacity:1, x:0}} transition={{duration:0.6 ,delay:1 , ease:"easeInOut"}} className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-600 mb-4">
                            Welcome to Modern <span className="text-yellow-400">Fashion</span>
                        </h2>
                        <p className="text-gray-400">
                            We bring you the finest collection of clothing that blends traditional
                            craftsmanship with modern aesthetics.
                        </p>
                    </motion.div>

                    <div className="mb-12">
                        <div className="text-center mb-10">
                           <div className="flex items-center justify-center">
                               <h3 className="text-2xl font-bold text-blue-400 mb-3">
                                   Shop by Category
                               </h3>
                               <img src={"/logo.gif"} width={38}/>
                           </div>
                            <p className="text-gray-600">
                                Browse our curated collections
                            </p>
                        </div>

                        <motion.div   variants={containerVariants}
                                      initial="hidden"
                                      whileInView="visible"
                                      viewport={{ once: true, amount: 0.2 }}
                                      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {categories.map((category) => (
                                <motion.div
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.05 }}
                                    key={category.id}
                                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                >
                                    {/* Image */}
                                    <div className="h-40 mb-3 overflow-hidden rounded-md">
                                        <div className="w-full h-full bg-gray-200">
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                width={200}
                                                height={160}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h4 className="font-bold text-teal-600 mb-1">
                                            {category.name}
                                        </h4>
                                        <p className="text-gray-600 text-sm mb-3">
                                            {category.desc}
                                        </p>
                                        <Link href={`/shop/${category.slug}`} className="w-full
                                         bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-md text-sm transition-colors">
                                            Shop Now
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="max-w-3xl mx-auto text-center pt-8 border-t border-gray-100">
                        <h3 className="text-3xl font-bold text-[#ce8b4c] mb-4">
                            Quality You Can Trust
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Every product undergoes rigorous quality checks for your confidence and comfort.
                        </p>
                    </div>
                </div>
                <div className="h-0.5 bg-[#ce8b4c] mx-4 md:mx-6 lg:mx-8"></div>
            </div>

            <div className="w-full h-full mt-2 p-6 bg-yellow-500">
                <div className="grid grid-cols-3 gap-4 auto-rows-auto">

                    {/* First Row - Large width image */}
                    <div className="col-span-2 row-span-1">
                        <div className="bg-gray-700 rounded-lg overflow-hidden h-[250px]">
                            <img
                                src="/1.jpg"
                                alt="Fashion 1"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* First Row - Tall height image */}
                    <div className="col-span-1 row-span-2">
                        <div className="bg-gray-700 rounded-lg overflow-hidden h-full min-h-[400px]">
                            <img
                                src="/2.jpg"
                                alt="Fashion 2"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Second Row - Normal image */}
                    <div className="col-span-1 row-span-1">
                        <div className="bg-gray-700 rounded-lg overflow-hidden h-[200px]">
                            <img
                                src="/3.jpg"
                                alt="Fashion 3"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Second Row - Another image */}
                    <div className="col-span-1 row-span-1">
                        <div className="bg-gray-700 rounded-lg overflow-hidden h-[200px]">
                            <img
                                src="/4.jpg"
                                alt="Fashion 4"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

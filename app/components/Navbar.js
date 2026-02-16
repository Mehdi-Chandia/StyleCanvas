"use client"

import React, {useState} from 'react'
import {useCart} from "@/app/context/CartContext";
import Link from "next/dist/client/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {itemsCount}=useCart();


    return (
        <>
            <nav className="fixed w-full flex gap-3 justify-around items-center z-50 p-4 bg-white/10 backdrop-blur-sm">
                <Link href={"/"}>
                    <h2 className="bg-[#ffd136] font-bold text-2xl md:text-4xl text-white border px-3 py-2 rounded-md">
                        Style <span className="text-gray-800">Canvas</span>
                    </h2>
                </Link>
<div className="hidden md:flex gap-12">

    <Link href={"/cart"} className="relative">
    <img src={"/cart.gif"} alt={"Search"} width={30}/>
    {itemsCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                        {itemsCount}
                    </span>
    )}
    </Link>
</div>
                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-4">
                 <Link href={"/"}>   <li className="text-gray-700 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer">
                        Home
                    </li></Link>
                  <Link href={"/"}>  <li className="text-gray-700 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer">
                        Shop Now
                    </li></Link>
                 <Link href={"/about"}>   <li className="text-gray-700 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer">
                        About Us
                    </li></Link>
                 <Link href={"/contact"}>  <li className="text-gray-700 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer">
                        Contact Us
                    </li></Link>
                </ul>

                {/* Mobile Menu Button */}
                <div
                    className="md:hidden flex gap-6 justify-between cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >

                    <div className="flex gap-3">

                        <Link href={"/cart"} className="relative">
                        <img src={"/cart.gif"} alt={"Search"} width={25}/>
                        {itemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {itemsCount}
                    </span>
                        )}
                        </Link>
                    </div>

                    {isOpen ? (
                        <img src={"/cross.gif"} alt="Close menu" width={30} />
                    ) : (
                        <img src={"/menu.gif"} alt="Open menu" width={30} />
                    )}
                </div>


            </nav>

            {/* Mobile Menu Dropdown - Appears BELOW navbar */}
            {isOpen && (
                <div className="fixed top-20 left-0 right-0 z-40 bg-[#ffd136] p-6 shadow-lg">
                    <ul className="flex flex-col gap-4">
                       <Link href={"/"}> <li
                            className="text-gray-800 hover:bg-white/30 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </li></Link>
                       <Link href={"/"}> <li
                            className="text-gray-800 hover:bg-white/30 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Shop Now
                        </li></Link>
                       <Link href={"/about"}> <li
                            className="text-gray-800 hover:bg-white/30 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            About Us
                        </li></Link>
                       <Link href={"/contact"}> <li
                            className="text-gray-800 hover:bg-white/30 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact Us
                        </li></Link>
                    </ul>
                </div>
            )}
        </>
    )
}

export default Navbar;

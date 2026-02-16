"use client"

import React, {createContext, useContext, useState, useEffect} from "react";
import {showSuccess,showError} from "@/app/lib/toast";

const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    // Load cart on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart)
                // Ensure it's an array
                if (Array.isArray(parsedCart)) {
                    setCart(parsedCart)
                }
            } catch(e) {
                console.error("Error parsing cart:", e)
                setCart([])
            }
        }
        setIsLoading(false)
    }, [])

    // Save cart when it changes
    useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem("cart", JSON.stringify(cart))
            } catch(e) {
                console.error("Error saving cart:", e)
            }
        }
    }, [cart, isLoading])

    // Calculate totals safely
    const itemsCount = Array.isArray(cart)
        ? cart.reduce((total, item) => total + (item?.quantity || 0), 0)
        : 0

    const totalPrice = Array.isArray(cart)
        ? cart.reduce((sum, item) => sum + ((item?.price || 0) * (item?.quantity || 0)), 0)
        : 0

    // Add to cart - FIXED
    const addToCart = (product,selectedSize='M') => {
        showSuccess(`${product.product_name} is added to cart!`)
        setCart(prev => {

            const existing = prev.find(item => item.id === product._id && item.size === selectedSize)

            if (existing) {
                return prev.map(item =>
                    item.id === product._id && item.size === selectedSize
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            } else {
                return [...prev, {
                    id: product._id,
                    name: product.product_name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                    size:selectedSize,
                    category: product.category,
                }]
            }
        })
    }

    // Remove from cart - FIXED
    const removeFromCart = (id, size) => {
        setCart(prev => prev.filter(item =>
            !(item.id === id && item.size === size)
        ));
    };

    // Update quantity - FIXED
    const updateCart = (id, newQuantity,size) => {
        if (newQuantity < 1) {
            removeFromCart(id, size)
            return
        }
        setCart(prev => prev.map(item =>
            item.id === id && item.size === size
                ? { ...item, quantity: newQuantity }
                : item
        ))
    }

    // Clear cart
    const clearCart = () => {
        setCart([])
    }

    const contextValues = {
        cart,
        itemsCount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
        isLoading,
    }

    return (
        <CartContext.Provider value={contextValues}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}
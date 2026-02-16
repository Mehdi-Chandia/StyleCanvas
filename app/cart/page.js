
"use client"

import { useCart } from '@/app/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
    const {     cart,
        itemsCount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
    isLoading} = useCart()

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4">Loading...</p>
                </div>
            </div>
        )
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-24 px-4">
                <div className="max-w-4xl mx-auto text-center py-16">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-600 mb-8">Add some products to your cart first!</p>
                    <Link
                        href="/"
                        className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {cart.map((item,index) => (
                            <div key={index} className="flex items-center border-b py-6">
                                {/* Product Image */}
                                <div className="w-24 h-24 flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="ml-6 flex-grow">
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-600">PKR{item.price}</p>
                                    <p className="text-gray-600 text-sm">Size: {item.size}</p>
                                    {/* Quantity Controls */}
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => updateCart(item.id, item.quantity - 1,item.size)}
                                            className="px-3 py-1 border rounded-l"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 border-t border-b">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateCart(item.id, item.quantity + 1,item.size)}
                                            className="px-3 py-1 border rounded-r"
                                        >
                                            +
                                        </button>

                                        <button
                                            onClick={() => removeFromCart(item.id,item.size)}
                                            className="ml-6 text-red-600 hover:text-red-800"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Item Total */}
                                <div className="text-right">
                                    <p className="font-bold">PKR{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}

                        {/* Clear Cart Button */}
                        <div className="mt-6">
                            <button
                                onClick={clearCart}
                                className="text-red-600 hover:text-red-800"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span>Items ({itemsCount})</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>PKR0.00</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t pt-3">
                                    <span>Total</span>
                                    <span>PKR{(totalPrice).toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="block w-full bg-gray-800 text-white text-center py-3 rounded-lg hover:bg-black transition-colors mb-4"
                            >
                                Proceed to Checkout
                            </Link>

                            <Link
                                href="/"
                                className="block w-full text-center text-gray-600 hover:text-gray-800"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
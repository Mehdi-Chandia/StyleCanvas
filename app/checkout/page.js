
"use client"

import { useState } from 'react'
import { useCart } from '@/app/context/CartContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart, isLoading } = useCart()
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: 'cod'
    })


    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [orderDetails, setOrderDetails] = useState([])

    const orderTotal=totalPrice;
    const orderItems=[...cart];

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }


    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format'
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
        if (!formData.address.trim()) newErrors.address = 'Address is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        if (cart.length === 0) {
            alert('Your cart is empty!')
            return
        }

        setIsSubmitting(true)

        try {

            const items = cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                priceAtPurchase: item.price,
                productName: item.name
            }))

            const orderData = {
                ...formData,
                totalAmount: totalPrice,
                items: items
            }

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            })

            const result = await response.json()

            if (response.ok) {
                setOrderId(result.orderId)
                setOrderSuccess(true)

                setOrderDetails({
                    name: formData.name,
                    email: formData.email,
                    total: orderTotal,
                    items: orderItems
                })

                clearCart()
            } else {
                alert(result.message || 'Failed to create order')
            }

        } catch (error) {
            console.error('Checkout error:', error)
            alert('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4">Loading checkout...</p>
                </div>
            </div>
        )
    }

    if (cart.length === 0 && !orderSuccess) {
        return (
            <div className="min-h-screen pt-24 px-4">
                <div className="max-w-4xl mx-auto text-center py-16">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-600 mb-8">Add some products to checkout</p>
                    <Link
                        href="/"
                        className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        )
    }

    if (orderSuccess) {
        return (
            <div className="min-h-screen pt-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                        <div className="text-6xl mb-4">✅</div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
                        <p className="text-gray-600 mb-2">Thank you for your order.</p>
                        <p className="text-gray-600 mb-6">Order ID: <span className="font-bold">{orderId}</span></p>

                        <div className="bg-white rounded-lg p-6 mb-6 max-w-md mx-auto">
                            <h3 className="font-bold mb-4">Order Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Name:</span>
                                    <span>{orderDetails?.name || formData.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Email:</span>
                                    <span>{orderDetails?.email || formData.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Amount:</span>
                                    <span className="font-bold">
                                    PKR{(orderDetails?.total || totalPrice).toFixed(2)}
                                </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-x-4">
                            <button
                                onClick={() => router.push('/')}
                                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen pt-24 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Order Summary */}
                    <div>
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                            <div className="space-y-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center border-b pb-4">
                                        <div className="w-16 h-16 flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                        <div className="ml-4 flex-grow">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-gray-600 text-sm">Qty: {item.quantity} × ${item.price}</p>
                                        </div>
                                        <div className="font-medium">
                                            PKR{(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>PKR{totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/cart"
                            className="text-gray-600 hover:text-gray-800 flex items-center"
                        >
                            ← Back to Cart
                        </Link>
                    </div>

                    {/* Right Column - Checkout Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6">
                            <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-gray-700 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-gray-700 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-gray-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter your phone number"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-gray-700 mb-2">Shipping Address *</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="3"
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter your complete address"
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <label className="block text-gray-700 mb-2">Payment Method *</label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="cod">Cash on Delivery</option>
                                        <option value="card">Credit/Debit Card</option>
                                        <option value="bank">Bank Transfer</option>
                                    </select>
                                </div>

                                {/* Terms */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        required
                                        className="mr-2"
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-600">
                                        I agree to the Terms & Conditions and Privacy Policy
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-black transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Processing Order...' : `Place Order - PKR ${totalPrice.toFixed(2)}`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
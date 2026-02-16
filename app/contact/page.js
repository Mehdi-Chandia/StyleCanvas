'use client'

import { useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        alert("Thank you for reaching out! We'll get back to you soon.")
        setFormData({ name: "", email: "", message: "" })
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Get in Touch</h1>
                    <div className="h-1 w-20 bg-yellow-400 mx-auto"></div>
                    <p className="text-gray-600 mt-4">We'd love to hear from you</p>
                </motion.div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="text-xl">📍</div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Visit Us</h3>
                                    <p className="text-gray-500 text-sm">123 Fashion Street, Design District, Karachi, Pakistan</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-xl">📧</div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Email Us</h3>
                                    <p className="text-gray-500 text-sm">hello@stylecanvas.com</p>
                                    <p className="text-gray-500 text-sm">support@stylecanvas.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-xl">📞</div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Call Us</h3>
                                    <p className="text-gray-500 text-sm">+92 300 1234567</p>
                                    <p className="text-gray-500 text-sm">+92 21 1234567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-xl">⏰</div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Working Hours</h3>
                                    <p className="text-gray-500 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p className="text-gray-500 text-sm">Saturday: 10:00 AM - 4:00 PM</p>
                                    <p className="text-gray-500 text-sm">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <h3 className="font-medium text-gray-800 mb-3">Follow Us</h3>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-gray-600 text-2xl">📘</a>
                                <a href="#" className="text-gray-400 hover:text-gray-600 text-2xl">📷</a>
                                <a href="#" className="text-gray-400 hover:text-gray-600 text-2xl">🐦</a>
                                <a href="#" className="text-gray-400 hover:text-gray-600 text-2xl">📌</a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                                <textarea
                                    required
                                    rows="5"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-black transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
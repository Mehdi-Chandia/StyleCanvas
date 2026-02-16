'use client'

import Link from "next/link"
import { motion } from "motion/react"

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Style Canvas</h1>
                    <div className="h-1 w-20 bg-yellow-400 mx-auto"></div>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Style Canvas was born from a simple idea: fashion should be a canvas for self-expression.
                            We believe that what you wear tells your story, and we're here to help you write it.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Founded in 2024, we set out to create a brand that combines contemporary design with
                            uncompromising quality. Every piece in our collection is thoughtfully curated to ensure
                            it meets our standards of style, comfort, and durability.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            From classic essentials to statement pieces, we're dedicated to bringing you fashion
                            that inspires confidence and celebrates individuality.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-4xl mb-3">✨</div>
                                <h3 className="font-medium text-gray-800 mb-2">Quality First</h3>
                                <p className="text-sm text-gray-500">Premium materials and expert craftsmanship</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-3">🎨</div>
                                <h3 className="font-medium text-gray-800 mb-2">Timeless Design</h3>
                                <p className="text-sm text-gray-500">Styles that transcend seasons</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-3">🤝</div>
                                <h3 className="font-medium text-gray-800 mb-2">Customer First</h3>
                                <p className="text-sm text-gray-500">Your satisfaction is our priority</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="text-center mt-12">
                        <Link
                            href="/"
                            className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-black transition-colors"
                        >
                            Explore Collection
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
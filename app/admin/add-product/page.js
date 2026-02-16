'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        product_name: '',
        price: '',
        category: 'shirts',
        description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('product_name', formData.product_name);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('description', formData.description);

            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            const response = await fetch('/api/products', {
                method: 'POST',
                body: formDataToSend,
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Product added successfully!');
                // Reset form
                setFormData({
                    product_name: '',
                    price: '',
                    category: 'shirts',
                    description: '',
                    image: null
                });
                // Clear file input
                document.getElementById('imageInput').value = '';

                // Optional: Redirect to products page
                // router.push('/admin/products');
            } else {
                setMessage(result.message || 'Error adding product');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className=" max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8 mt-28">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Add New Product
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Simple form to add products to your store
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
                    {/* Product Name */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-medium">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product name"
                        />
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-medium">
                            Price *
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-medium">
                            Category *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="shirts">Shirts</option>
                            <option value="jeans">Jeans</option>
                            <option value="sneakers">Sneakers</option>
                            <option value="jackets">Jackets</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-medium">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product description"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="mb-8">
                        <label className="block text-gray-700 mb-2 font-medium">
                            Product Image *
                        </label>
                        <input
                            id="imageInput"
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            required
                            accept="image/*"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            Upload a clear product image (JPG, PNG, etc.)
                        </p>
                    </div>

                    {/* Status Message */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Adding Product...' : 'Add Product'}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                {/* Preview Section (Optional) */}
                {formData.image && (
                    <div className="mt-8 bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Image Preview</h2>
                        <div className="flex justify-center">
                            <img
                                src={URL.createObjectURL(formData.image)}
                                alt="Preview"
                                className="max-h-64 rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
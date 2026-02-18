import Link from "next/link"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Style Canvas</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Your canvas for self-expression through premium fashion.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-white text-xl">📘</a>
                            <a href="#" className="text-gray-400 hover:text-white text-xl">📷</a>
                            <a href="#" className="text-gray-400 hover:text-white text-xl">🐦</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/shop/shirts" className="text-gray-400 hover:text-white">Shirts</Link></li>
                            <li><Link href="/shop/jeans" className="text-gray-400 hover:text-white">Jeans</Link></li>
                            <li><Link href="/shop/sneakers" className="text-gray-400 hover:text-white">Sneakers</Link></li>
                            <li><Link href="/shop/jackets" className="text-gray-400 hover:text-white">Jackets</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                            <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-gray-400 hover:text-white">Shipping</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>order@stylecanvas.com</li>
                            <li>+92 300 1234567</li>
                            <li>Karachi, Pakistan</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
                    <p>© {currentYear} Style Canvas. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import {CartProvider} from "@/app/context/CartContext";
import Footer from "@/app/components/Footer";
import 'react-toastify/dist/ReactToastify.css';
import ToastWrapper from "@/app/components/ToastWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Style Canvas",
  description: "Your style, your canvas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

      <CartProvider>
          <Navbar/>
        {children}
         <ToastWrapper/>
          <Footer/>
      </CartProvider>
      </body>
    </html>
  );
}

import React from 'react';
import { FiInstagram, FiTwitter, FiFacebook, FiArrowRight } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer className="bg-[#111] text-white pt-32 pb-12 px-4 md:px-12 w-full min-h-[90vh] flex flex-col justify-between relative overflow-hidden">
            {/* Massive Background Text Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white/[0.02] tracking-tighter pointer-events-none whitespace-nowrap z-0">
                STUDIO.
            </div>

            <div className="max-w-[1800px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 z-10 relative">

                {/* Brand & Mission - Takes up more space */}
                <div className="flex flex-col gap-8 lg:col-span-5 pr-0 lg:pr-16">
                    <div className="text-4xl lg:text-5xl font-bold tracking-tighter">STUDIO.</div>
                    <h3 className="text-2xl lg:text-4xl text-gray-300 font-light leading-tight tracking-tight">
                        Curating spaces that inspire <span className="italic font-serif text-gray-500">tranquility</span> and elevate daily living.
                    </h3>
                    <div className="flex gap-4 mt-8">
                        <a href="#" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform hover:scale-105"><FiInstagram size={18} /></a>
                        <a href="#" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform hover:scale-105"><FiTwitter size={18} /></a>
                        <a href="#" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform hover:scale-105"><FiFacebook size={18} /></a>
                    </div>
                </div>

                {/* Links Grids */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:col-span-7">
                    <div>
                        <h4 className="font-semibold mb-8 uppercase tracking-[0.2em] text-xs text-gray-500">Shop</h4>
                        <ul className="flex flex-col gap-5 text-gray-300 font-light text-lg">
                            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Living Room</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Bedroom</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Lighting</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Decor</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-8 uppercase tracking-[0.2em] text-xs text-gray-500">Support</h4>
                        <ul className="flex flex-col gap-5 text-gray-300 font-light text-lg">
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Care Guide</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-2 md:col-span-1 border-t border-gray-800 pt-8 md:border-t-0 md:pt-0">
                        <h4 className="font-semibold mb-8 uppercase tracking-[0.2em] text-xs text-gray-500">Insider Details</h4>
                        <p className="text-gray-400 font-light mb-8 text-base leading-relaxed">Early access to collections, private sales, and design insights.</p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-transparent border-b border-gray-700 pb-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-500 text-lg"
                            />
                            <button className="absolute right-0 top-0 h-full flex items-start pt-1 text-gray-400 group-hover:text-white transition-colors duration-300">
                                <FiArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Block */}
            <div className="max-w-[1800px] mx-auto w-full pt-16 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 font-light z-10 relative">
                <p className="flex items-center gap-2 tracking-wide uppercase text-xs">
                    <span>© {new Date().getFullYear()} STUDIO.</span>
                    <span className="hidden md:inline-block w-8 h-[1px] bg-gray-800"></span>
                    <span className="hidden md:inline">ALL RIGHTS RESERVED.</span>
                </p>
                <div className="flex gap-8 mt-6 md:mt-0 tracking-wide uppercase text-xs hover:text-white transition-colors cursor-pointer">
                    Back to Top ↑
                </div>
            </div>
        </footer>
    );
}

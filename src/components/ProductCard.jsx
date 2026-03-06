import React from 'react';

export default function ProductCard({ name, price, img, className = '' }) {
    return (
        <div className={`group cursor-pointer flex flex-col gap-4 font-sans hover:-translate-y-2 transition-transform duration-500 ease-out ${className}`}>
            {/* Image container */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 mb-2">
                <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                {/* Quick Add overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-out z-10">
                    <button className="w-full bg-white/90 backdrop-blur-sm text-black py-3 rounded-full font-medium hover:bg-black hover:text-white transition-colors shadow-lg">
                        Quick Add
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="flex justify-between items-start px-2">
                <div>
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-black transition-colors">{name}</h3>
                    <p className="text-sm text-gray-500">Minimalist Edition</p>
                </div>
                <p className="text-lg font-semibold tracking-tight">${price}</p>
            </div>
        </div>
    );
}

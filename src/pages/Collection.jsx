import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProducts } from '../hooks/useProducts';
import Footer from '../components/Footer';
import { FiFilter, FiChevronDown } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function Collection() {
    const containerRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCat = searchParams.get('category') || 'All';

    const { productsByCategory, loading } = useProducts();
    const [activeCategory, setActiveCategory] = useState(initialCat);
    const [sortOrder, setSortOrder] = useState('default'); // 'default', 'price-asc', 'price-desc'

    useEffect(() => {
        setActiveCategory(searchParams.get('category') || 'All');
    }, [searchParams]);

    const allProductsList = useMemo(() => {
        if (loading) return [];
        let list = [];
        if (activeCategory === 'All') {
            Object.values(productsByCategory).forEach(arr => {
                list = [...list, ...arr];
            });
        } else {
            list = productsByCategory[activeCategory] || [];
        }

        // Sort
        if (sortOrder === 'price-asc') {
            list.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price-desc') {
            list.sort((a, b) => b.price - a.price);
        }

        return list;
    }, [productsByCategory, activeCategory, sortOrder, loading]);

    useGSAP(() => {
        if (!loading && allProductsList.length > 0) {
            // Animate zigzag items on scroll
            const items = gsap.utils.toArray('.zigzag-item');

            items.forEach((item, i) => {
                gsap.fromTo(item,
                    { y: 100, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 80%',
                        },
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power3.out'
                    }
                );
            });
        }
    }, { scope: containerRef, dependencies: [allProductsList, loading] });

    const categories = ['All', ...Object.keys(productsByCategory)];

    return (
        <div className="min-h-screen bg-[#f9f9f9] text-[#111] pt-32" ref={containerRef}>
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8 mb-16">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12 capitalize">
                    {activeCategory === 'All' ? 'Complete Collection' : activeCategory}
                </h1>

                {/* Filters and Sorting */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-y border-gray-200 py-6 gap-6">

                    <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
                        <span className="flex items-center gap-2 text-sm uppercase tracking-widest font-medium text-gray-400">
                            <FiFilter /> Filter:
                        </span>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    const p = new URLSearchParams(searchParams);
                                    if (cat === 'All') p.delete('category');
                                    else p.set('category', cat);
                                    setSearchParams(p);
                                }}
                                className={`uppercase text-sm tracking-wider font-medium whitespace-nowrap px-4 py-2 rounded-full transition-colors ${activeCategory === cat
                                        ? 'bg-black text-white'
                                        : 'bg-white text-black border border-gray-200 hover:border-black'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 relative min-w-[200px]">
                        <span className="text-sm uppercase tracking-widest font-medium text-gray-400">Sort:</span>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="appearance-none bg-transparent border-b border-black text-black font-medium text-sm tracking-wider py-1 pr-6 focus:outline-none rounded-none cursor-pointer w-full text-right"
                        >
                            <option value="default">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                        <FiChevronDown className="absolute right-0 pointer-events-none" />
                    </div>

                </div>
            </div>

            <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pb-40">
                {loading ? (
                    <div className="py-40 flex justify-center items-center">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                    </div>
                ) : allProductsList.length === 0 ? (
                    <div className="py-40 text-center uppercase tracking-widest text-gray-500 font-medium">
                        0 Results Found
                    </div>
                ) : (
                    <div className="flex flex-col gap-32 md:gap-48 border-t border-gray-200 pt-16">
                        {allProductsList.map((product, index) => {
                            const isEven = index % 2 === 0;
                            // Add leading zero to index for high-end catalog look
                            const displayIndex = (index + 1).toString().padStart(2, '0');

                            return (
                                <div key={product.id} className={`zigzag-item flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center md:items-stretch group`}>

                                    {/* Big Image Container */}
                                    <div className="w-full md:w-[55%] relative overflow-hidden bg-[#f0f0f0] flex items-center justify-center p-12 md:p-24 aspect-[4/5] md:aspect-auto cursor-pointer">
                                        <div className="absolute top-8 left-8 text-black/20 font-bold text-5xl md:text-8xl tracking-tighter pointer-events-none z-0">
                                            No. {displayIndex}
                                        </div>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-contain mix-blend-multiply filter contrast-125 transform scale-95 group-hover:scale-100 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700 z-20 pointer-events-none"></div>
                                    </div>

                                    {/* Details Info */}
                                    <div className="w-full md:w-[45%] flex flex-col justify-center gap-10 py-8 lg:py-16">
                                        
                                        <div className="flex flex-col gap-4 border-b border-gray-200 pb-10">
                                            <div className="flex justify-between items-start gap-4">
                                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
                                                    {product.category || 'Minimalist Series'}
                                                </span>
                                                <span className="text-lg md:text-xl font-light tracking-tight text-gray-900 border border-gray-200 rounded-full px-4 py-1 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                                                    ${product.price?.toFixed(2)}
                                                </span>
                                            </div>
                                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black leading-[1.1] mt-2 group-hover:text-gray-600 transition-colors duration-500 line-clamp-3">
                                                {product.title}
                                            </h2>
                                        </div>

                                        <p className="text-gray-500 font-light leading-relaxed text-lg line-clamp-4">
                                            {product.description}
                                        </p>

                                        <div className="pt-4 flex items-center gap-4">
                                            <button className="bg-black text-white px-10 py-4 rounded-full font-medium text-xs tracking-[0.15em] uppercase hover:bg-neutral-800 transition-all duration-300 transform hover:-translate-y-1 w-fit group-hover:shadow-2xl">
                                                Add to Cart
                                            </button>
                                            <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors duration-300">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                            </button>
                                        </div>
                                        
                                        {/* Minimal Specs */}
                                        <div className="mt-auto grid grid-cols-2 gap-4 pt-12 text-xs uppercase tracking-widest text-gray-400 border-t border-gray-100">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-semibold text-gray-900">Availability</span>
                                                <span>In Stock</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-semibold text-gray-900">Delivery</span>
                                                <span>2-4 Business Days</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

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

            <div className="max-w-screen-xl mx-auto px-4 md:px-8 pb-32">
                {loading ? (
                    <div className="py-20 text-center uppercase tracking-widest text-gray-500">
                        Curating items...
                    </div>
                ) : allProductsList.length === 0 ? (
                    <div className="py-20 text-center uppercase tracking-widest text-gray-500">
                        No items found.
                    </div>
                ) : (
                    <div className="flex flex-col gap-32 md:gap-40">
                        {allProductsList.map((product, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={product.id} className={`zigzag-item flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center group`}>

                                    {/* Big Image Container */}
                                    <div className="w-full md:w-1/2 relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-2xl cursor-pointer">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover p-12 mix-blend-multiply transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                        />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                                    </div>

                                    {/* Details Info */}
                                    <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-sm font-medium tracking-[0.2em] uppercase text-gray-500">Minimalist Series</span>
                                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black group-hover:text-gray-700 transition-colors duration-300">
                                                {product.title}
                                            </h2>
                                        </div>

                                        <p className="text-xl md:text-2xl font-light text-gray-900 tracking-tight">
                                            ${product.price?.toFixed(2)}
                                        </p>

                                        <p className="text-gray-600 font-light leading-relaxed max-w-lg text-lg line-clamp-4">
                                            {product.description}
                                        </p>

                                        <div className="pt-6">
                                            <button className="bg-black text-white px-10 py-5 rounded-full font-medium text-sm tracking-widest uppercase hover:bg-neutral-800 transition-colors duration-300 w-fit">
                                                Add to Cart
                                            </button>
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

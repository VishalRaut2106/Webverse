import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';

gsap.registerPlugin(ScrollTrigger);

export default function ProductGrid() {
    const containerRef = useRef(null);
    const { productsByCategory, loading } = useProducts();

    // We re-trigger animations when loading finishes
    useGSAP(() => {
        if (!loading && Object.keys(productsByCategory).length > 0) {
            gsap.from('.prod-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                },
                y: 80,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out'
            });
            ScrollTrigger.refresh();
        }
    }, { scope: containerRef, dependencies: [loading] });

    return (
        <section ref={containerRef} id="shop" className={`py-24 px-4 md:px-8 max-w-screen-2xl mx-auto min-h-[50vh] transition-opacity duration-700 ${loading ? 'opacity-80 grayscale-[30%]' : 'opacity-100 grayscale-0'} bg-white`}>
            {
                Object.entries(productsByCategory).map(([category, products]) => (
                    <div key={category} className="mb-24 last:mb-0">
                        <div className="flex flex-col items-center mb-16 text-center">
                            <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-gray-500 mb-4 cursor-default">
                                Category {loading && <span className="ml-2 inline-block w-2 h-2 bg-gray-300 rounded-full animate-pulse"></span>}
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter capitalize">{category}</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                            {products.slice(0, 4).map((p) => (
                                <ProductCard
                                    key={p.id}
                                    name={p.title}
                                    price={p.price}
                                    img={p.image}
                                    className="prod-card"
                                />
                            ))}
                        </div>
                        {products.length > 4 && (
                            <div className="flex justify-center mt-12">
                                <Link to={`/collection?category=${encodeURIComponent(category)}`} className="text-sm uppercase tracking-widest font-medium border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
                                    View All {category}
                                </Link>
                            </div>
                        )}
                    </div>
                ))
            }
        </section>
    );
}

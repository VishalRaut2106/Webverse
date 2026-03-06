import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
    { name: 'Seating', img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Lighting', img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Tables', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Decor', img: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=1000&auto=format&fit=crop' },
];

export default function Category() {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from('.cat-card', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="collections" className="py-24 px-4 md:px-8 max-w-screen-2xl mx-auto">
            <div className="mb-12 flex items-end justify-between">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Collections</h2>
                <a href="#" className="hidden md:block uppercase tracking-widest text-sm font-medium border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">View All</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <div key={cat.name} className="cat-card group cursor-pointer relative overflow-hidden rounded-xl aspect-[4/5]">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10"></div>
                        <img
                            src={cat.img}
                            alt={cat.name}
                            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-8 z-20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-white text-3xl font-medium tracking-tight">{cat.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

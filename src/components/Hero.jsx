import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
    const containerRef = useRef(null);
    const textRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Background subtle scale
        tl.fromTo('.hero-bg', { scale: 1.1 }, { scale: 1, duration: 2.5 }, 0);

        // Stagger text reveals
        tl.fromTo(textRef.current, {
            y: 100,
            opacity: 0,
            rotateX: -15
        }, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.15,
            duration: 1.4
        }, 0.2);

        // CTA Button
        tl.fromTo('.hero-cta', {
            scale: 0.8,
            opacity: 0
        }, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'back.out(1.5)'
        }, 1.2);

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black text-white pt-20">
            {/* Background Gradient & Image */}
            <div className="hero-bg absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-neutral-900/80 to-[#111] opacity-90 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2670&auto=format&fit=crop"
                    alt="Premium Architecture"
                    className="w-full h-full object-cover opacity-80"
                />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl">
                <div className="overflow-hidden pb-2">
                    <p ref={el => textRef.current[0] = el} className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-gray-300 mb-8">
                        The Studio Collection
                    </p>
                </div>

                <div className="overflow-hidden pb-4">
                    <h1 ref={el => textRef.current[1] = el} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-white">
                        REDEFINE <br /> ELEGANCE
                    </h1>
                </div>

                <div className="overflow-hidden mt-8 mb-12">
                    <h2 ref={el => textRef.current[2] = el} className="text-base md:text-xl font-light text-gray-300 max-w-xl mx-auto">
                        Discover a curated selection of premium minimalist objects designed for the modern æsthetic.
                    </h2>
                </div>

                <button className="hero-cta bg-white text-black px-12 py-5 rounded-full font-medium text-lg hover:bg-neutral-200 transition-colors duration-300 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                    Explore Now
                </button>
            </div>
        </section>
    );
}

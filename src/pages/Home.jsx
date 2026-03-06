import React, { useMemo, useRef } from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Category from '../components/Category';
import FlyingPosters from '../components/FlyingPosters';
import { useProducts } from '../hooks/useProducts';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const { productsByCategory, loading } = useProducts();
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        // Removed buggy GSAP ScrollTrigger pin. Now using native CSS sticky for butter-smooth behavior with Lenis.
    }, { scope: containerRef });

    // Extract images from the products to feed the WebGL FlyingPosters
    const posterImages = useMemo(() => {
        const allImages = [];
        Object.values(productsByCategory).forEach(products => {
            if (Array.isArray(products)) {
                products.forEach(p => {
                    if (p && p.image) {
                        allImages.push(p.image);
                    }
                });
            }
        });

        // Fallback array just in case data is malformed
        if (allImages.length === 0) {
            return [
                "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800",
                "https://images.unsplash.com/photo-1599643478524-fb66f72807e3?q=80&w=800"
            ];
        }

        // Limit the array to the first 10 images for aesthetics and WebGL performance, then reverse for desired flow
        return allImages.slice(0, 10).reverse();
    }, [productsByCategory]);

    return (
        <div className="min-h-screen bg-[#f9f9f9] text-[#111]">
            <main>
                <Hero />
                <Marquee />
                <Category />

                {/* Replaced generic ProductGrid with FlyingPosters Interactive WebGL Experience using Native Sticky Pinning */}
                <div ref={sectionRef} className="relative w-full h-[200vh] bg-black">
                    <section className="sticky top-0 w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">
                        <div className="absolute top-20 left-0 w-full text-center z-10 pointer-events-none mix-blend-difference text-white">
                            <h2 className="text-sm font-medium tracking-[0.2em] uppercase mb-2">The Collection</h2>
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter">Featured Editorials</h3>
                        </div>

                        {posterImages.length > 0 && (
                            <div className="w-full h-full md:h-screen cursor-grab active:cursor-grabbing">
                                <FlyingPosters
                                    key={posterImages.map(img => img.slice(-10)).join('')}
                                    items={posterImages}
                                    planeWidth={300}
                                    planeHeight={420}
                                />
                            </div>
                        )}
                    </section>
                </div>

                <Testimonial />
            </main>
            <Footer />
        </div>
    );
}

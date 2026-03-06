import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: 'Sarah Jenkins',
        role: 'Interior Designer',
        text: 'The quality and attention to detail in every piece is simply unmatched. It transformed my client’s space completely.',
        img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop'
    },
    {
        name: 'Michael Chen',
        role: 'Architect',
        text: 'A perfect blend of form and function. These minimalist designs are exactly what modern architecture demands.',
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop'
    },
    {
        name: 'Emma Larson',
        role: 'Homeowner',
        text: 'Beautiful craftsmanship that feels both timeless and contemporary. The delivery and packaging were also premium.',
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&auto=format&fit=crop'
    }
];

export default function Testimonial() {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from('.test-card', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%',
            },
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 px-4 md:px-8 max-w-screen-2xl mx-auto bg-[#111] text-white">
            <div className="flex flex-col mb-24 md:mb-32">
                <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-gray-500 mb-6 cursor-default">
                    Client Perspectives
                </h2>
                <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none w-full md:w-4/5 lg:w-3/4">
                    Elevating the <span className="text-gray-500 italic font-light">standard</span> of modern living.
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-white/10 pt-16">
                {testimonials.map((t, i) => (
                    <div key={i} className="test-card flex flex-col justify-between group">
                        <div>
                            <p className="text-xl md:text-2xl font-light leading-snug tracking-tight mb-12 text-gray-300 group-hover:text-white transition-colors duration-500">
                                "{t.text}"
                            </p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                <img src={t.img} alt={t.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg tracking-tight">{t.name}</h4>
                                <p className="text-xs tracking-widest uppercase text-gray-500 mt-1">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

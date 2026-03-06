import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1 });
        tl.to('.marquee-inner', { xPercent: -50, duration: 20, ease: 'none' });

        ScrollTrigger.create({
            trigger: document.documentElement,
            start: '0',
            end: 'max',
            onUpdate: (e) => {
                // Increase speed drastically based on scroll speed
                const speed = e.getVelocity() / 300;
                gsap.to(tl, {
                    timeScale: speed ? speed * 1.5 : 1,
                    duration: 0.2,
                    overwrite: true
                });
                // Settle back to normal speed
                gsap.to(tl, { timeScale: 1, duration: 1, delay: 0.2, overwrite: 'auto' });
            }
        });
    }, { scope: containerRef });

    const text = "FREE SHIPPING WORLDWIDE • NEW ARRIVALS • LIMITED TIME DEALS • ";

    return (
        <div ref={containerRef} className="w-full overflow-hidden bg-[#111] text-white py-4 select-none border-y border-neutral-800">
            <div className="flex w-fit marquee-inner font-medium text-xl md:text-2xl tracking-[0.2em] whitespace-nowrap">
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
            </div>
        </div>
    );
}

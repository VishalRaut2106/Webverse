import { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
export function useProducts() {
  const dummyData = {
    "men's clothing": [
        {
            id: `dummy-m-0`,
            title: "OVERSIZED WOOL BLEND COAT",
            price: 890.00,
            image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
            description: "A masterclass in modern tailoring. This heavyweight wool-blend coat features dropped shoulders, a dramatic lapel, and an unstructured silhouette for effortless, draped layering."
        },
        {
            id: `dummy-m-1`,
            title: "CASHMERE TURTLENECK SWEATER",
            price: 450.00,
            image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=1000&auto=format&fit=crop",
            description: "Spun from hyper-soft Mongolian cashmere. A minimalist essential with a ribbed collar and cuffs, designed for a slim, athletic fit that retains supreme comfort."
        },
        {
            id: `dummy-m-2`,
            title: "TAILORED WIDE-LEG TROUSERS",
            price: 320.00,
            image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop",
            description: "Engineered from a fluid wool gabardine. These trousers utilize a double front pleat to generate maximum volume, falling perfectly over boots or heavy loafers."
        }
    ],
    "furniture": [
        {
            id: `dummy-f-0`,
            title: "OAK LOUNGE CHAIR",
            price: 1250.00,
            image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
            description: "Crafted from solid sustainable oak, this lounge chair features organic curves and a low-slung profile perfect for relaxed, sun-drenched reading corners."
        },
        {
            id: `dummy-f-1`,
            title: "MINIMALIST SOFA",
            price: 3400.00,
            image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000&auto=format&fit=crop",
            description: "A masterclass in modern restraint. Upholstered in premium bouclé fabric with a continuous flowing backrest supporting an incredibly deep, plush seating area."
        },
        {
            id: `dummy-f-2`,
            title: "STONE COFFEE TABLE",
            price: 890.00,
            image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1000&auto=format&fit=crop",
            description: "Hand-carved from a single block of travertine. The porous texture and brutalist geometric shape create a stunning centerpiece for any contemporary living room."
        }
    ],
    "lighting": [
        {
            id: `dummy-l-0`,
            title: "BRASS PENDANT",
            price: 450.00,
            image: "https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?q=80&w=1000&auto=format&fit=crop",
            description: "Suspended elegance. A spun brass cone that directs a warm pool of light downward, slowly developing a beautiful natural patina over years of use."
        },
        {
            id: `dummy-l-1`,
            title: "FLOOR LAMP ARCH",
            price: 720.00,
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop",
            description: "A sweeping statement piece. The delicate matte black steel arch suspends a frosted glass globe, providing ambient illumination without interrupting sightlines."
        },
        {
            id: `dummy-l-2`,
            title: "TABLE LAMP GEOMETRIC",
            price: 320.00,
            image: "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?q=80&w=1000&auto=format&fit=crop",
            description: "Built from precise cylindrical and spherical forms. This sculptural table lamp features a touch-dimmable base and emits a soft, diffused glow."
        }
    ],
    "decor": [
        {
            id: `dummy-d-0`,
            title: "CERAMIC VASE SET",
            price: 180.00,
            image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=1000&auto=format&fit=crop",
            description: "Wheel-thrown by master artisans, these three stoneware vases feature a raw, unglazed exterior that perfectly complements dried botanicals."
        },
        {
            id: `dummy-d-1`,
            title: "LINEN THROW",
            price: 140.00,
            image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop",
            description: "Woven from 100% pure Belgian flax. Exceptionally breathable yet warm, its natural crinkled texture adds an effortless, lived-in luxury to bedding or sofas."
        },
        {
            id: `dummy-d-2`,
            title: "ABSTRACT SCULPTURE",
            price: 520.00,
            image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=1000&auto=format&fit=crop",
            description: "A fluid exploration of negative space. Cast in blackened iron, this heavy tabletop sculpture changes silhouette dramatically depending on your viewing angle."
        }
    ]
  };

  const [productsByCategory, setProductsByCategory] = useState(dummyData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      try {
        const prodCollection = collection(db, 'products');
        const querySnapshot = await getDocs(prodCollection);
        
        let allProducts = [];
        
        if (querySnapshot.empty) {
          console.log("Fetching from API and populating Firebase...");
          const res = await fetch('https://fakestoreapi.com/products');
          const data = await res.json();
          
          allProducts = data;
          
          // Store in Firebase sequentially to avoid rate limits/overwhelming
          for (const item of data) {
            const docRef = doc(db, 'products', item.id.toString());
            await setDoc(docRef, item);
          }
        } else {
          console.log("Loading from Firebase...");
          querySnapshot.forEach((doc) => {
            allProducts.push(doc.data());
          });
        }
        
        
        // Group by category
        const grouped = allProducts.reduce((acc, current) => {
          const cat = current.category || 'other';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(current);
          return acc;
        }, {});
        
        if (isMounted) {
          setProductsByCategory(grouped);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    
    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { productsByCategory, loading };
}

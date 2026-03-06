import { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export function useProducts() {
  const dummyData = {
    "men's clothing": Array(4).fill(null).map((_, i) => ({
      id: `dummy-m-${i}`,
      title: "Premium Essential Collection",
      price: 120.00,
      image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop"
    })),
    "jewelery": Array(4).fill(null).map((_, i) => ({
      id: `dummy-j-${i}`,
      title: "Signature Silver Accent",
      price: 850.00,
      image: "https://images.unsplash.com/photo-1599643478524-fb66f72807e3?q=80&w=800&auto=format&fit=crop"
    }))
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

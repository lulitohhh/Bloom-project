// src/hooks/useShopItems.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase/firebaseConfig';

export const useShopItems = () => {
  const [shopItems, setShopItems] = useState({
    plants: [],
    ecosystems: [],
    accessories: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        // Obtener plantas
        const plantsSnapshot = await getDocs(collection(db, 'plants'));
        const plantsData = plantsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Obtener ecosistemas
        const ecosystemsSnapshot = await getDocs(collection(db, 'ecosystems'));
        const ecosystemsData = ecosystemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Obtener accesorios
        const accessoriesSnapshot = await getDocs(collection(db, 'accessories'));
        const accessoriesData = accessoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setShopItems({
          plants: plantsData,
          ecosystems: ecosystemsData,
          accessories: accessoriesData
        });
      } catch (err) {
        setError(err);
        console.error("Error fetching shop items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShopItems();
  }, []);

  return { shopItems, loading, error };
};
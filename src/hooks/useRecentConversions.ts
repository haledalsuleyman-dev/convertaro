"use client";

import { useState, useEffect, useCallback } from "react";

export interface RecentConversion {
  slug: string;
  title: string;
  category: string;
  lastValue?: string;
  timestamp: number;
}

const STORAGE_KEY = "convertaro_recent_conversions";
const MAX_ITEMS = 6;

export function useRecentConversions() {
  const [recent, setRecent] = useState<RecentConversion[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load initially
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecent(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to read recent conversions", e);
    }
    setIsLoaded(true);
  }, []);

  const addRecent = useCallback(
    (item: Omit<RecentConversion, "timestamp">) => {
      setRecent((prev) => {
        // Remove existing if it matches slug (or its inverse)
        // For simplicity, just exact slug match
        const filtered = prev.filter((p) => p.slug !== item.slug);
        
        const newItem: RecentConversion = {
          ...item,
          timestamp: Date.now(),
        };

        const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);
        
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.warn("Failed to save recent conversions", e);
        }
        
        return updated;
      });
    },
    []
  );

  return {
    recent,
    addRecent,
    isLoaded,
  };
}

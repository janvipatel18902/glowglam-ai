'use client';

import { useEffect, useState } from 'react';
import { getMySkinTests } from '@/lib/skin-test-api';

export type SkinTestItem = {
  id: string;
  status: string;
  summary: string | null;
  createdAt: string;
  resultJson?: {
    skincare?: {
      skinType?: string;
      sensitivity?: string;
      confidence?: number;
      concerns?: string[];
    };
  } | null;
  recommendations?: Array<{
    id?: string;
    title: string;
    description: string;
  }>;
  images?: Array<{
    imageUrl: string;
  }>;
};

function sortNewestFirst(items: SkinTestItem[]) {
  return [...items].sort((a, b) => {
    return (
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  });
}

function hasCompletedAnalysis(item: SkinTestItem) {
  return (
    item.status === 'completed' &&
    Boolean(item.resultJson?.skincare)
  );
}

export function useLatestSkinTest() {
  const [latest, setLatest] = useState<SkinTestItem | null>(null);
  const [allTests, setAllTests] = useState<SkinTestItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchLatest() {
      try {
        setLoading(true);

        const token = localStorage.getItem('accessToken');

        if (!token) {
          if (!isMounted) return;
          setLatest(null);
          setAllTests([]);
          setLoading(false);
          return;
        }

        const data = await getMySkinTests(token);
        const tests = Array.isArray(data) ? sortNewestFirst(data) : [];

        if (!isMounted) return;

        setAllTests(tests);

        const latestCompleted = tests.find(hasCompletedAnalysis);
        setLatest(latestCompleted || null);
      } catch {
        if (!isMounted) return;
        setLatest(null);
        setAllTests([]);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    fetchLatest();

    function handleAuthChanged() {
      fetchLatest();
    }

    window.addEventListener('auth-changed', handleAuthChanged);

    return () => {
      isMounted = false;
      window.removeEventListener('auth-changed', handleAuthChanged);
    };
  }, []);

  return { latest, allTests, loading };
}
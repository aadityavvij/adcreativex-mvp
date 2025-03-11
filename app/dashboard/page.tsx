'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [adsData, setAdsData] = useState(null);

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const res = await fetch('/api/ads-data');
        const data = await res.json();
        setAdsData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAdsData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">AdCreativeX Dashboard</h1>
      {adsData ? (
        <pre className="text-left">{JSON.stringify(adsData, null, 2)}</pre>
      ) : (
        <p>Loading ad data...</p>
      )}
    </main>
  );
}

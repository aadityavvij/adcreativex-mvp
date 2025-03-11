'use client';

import React from 'react';

const HomePage = () => {
  const handleConnectFacebook = () => {
    const clientId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const redirectUri = encodeURIComponent('https://adcreativex-mvp.vercel.app/api/auth/facebook-callback');

    const fbAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=ads_read,ads_management`;

    // Redirect user to FB OAuth page
    window.location.href = fbAuthUrl;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to AdCreativeX</h1>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        onClick={handleConnectFacebook}
      >
        Connect Facebook
      </button>
    </main>
  );
};

export default HomePage;

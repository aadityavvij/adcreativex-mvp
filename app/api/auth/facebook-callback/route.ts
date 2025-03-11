import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code returned from Facebook' }, { status: 400 });
  }

  try {
    const accessTokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI}&client_secret=${process.env.FACEBOOK_APP_SECRET}&code=${code}`
    );

    const accessTokenData = await accessTokenResponse.json();

    const shortLivedToken = accessTokenData.access_token;

    // Exchange for long-lived token
    const longLivedTokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&fb_exchange_token=${shortLivedToken}`
    );

    const longLivedTokenData = await longLivedTokenResponse.json();

    // Here you should save the token in your DB - demo purpose we use cookie
    const res = NextResponse.redirect('https://adcreativex-mvp.vercel.app/dashboard');
    // const res = NextResponse.redirect('http://localhost:3000/dashboard');

    // You can also store token in a cookie/session
    res.cookies.set('fb_access_token', longLivedTokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong during token exchange' }, { status: 500 });
  }
}

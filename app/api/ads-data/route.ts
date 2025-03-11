import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('fb_access_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const accountId = 'INSERT_AD_ACCOUNT_ID'; // You can fetch user account dynamically if needed

    const adInsightsRes = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}/insights?fields=impressions,clicks,spend,campaign_name&access_token=${token}`
    );

    const adInsightsData = await adInsightsRes.json();

    return NextResponse.json(adInsightsData);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch ad data' }, { status: 500 });
  }
}

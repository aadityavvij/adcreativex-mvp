export default async function handler(req, res) {
    const redirectUri = 'http://localhost:3000/api/auth/callback';
    const oauthUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
      `client_id=${process.env.FACEBOOK_APP_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=ads_read,ads_management,business_management`;
  
    res.redirect(oauthUrl);
  }
  
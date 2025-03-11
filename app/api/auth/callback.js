import axios from 'axios';

export default async function handler(req, res) {
  const { code } = req.query;

  const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token`;
  const params = {
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    redirect_uri: 'http://localhost:3000/api/auth/callback',
    code,
  };

  try {
    const response = await axios.get(tokenUrl, { params });
    const { access_token } = response.data;

    // OPTIONAL: Save access_token in DB / session
    // For now, redirect to dashboard with token (for testing)
    res.redirect(`/dashboard?token=${access_token}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'OAuth failed' });
  }
}

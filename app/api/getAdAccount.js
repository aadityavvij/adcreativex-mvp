import axios from 'axios';

export default async function handler(req, res) {
  const { token } = req.query;

  try {
    const result = await axios.get(
      `https://graph.facebook.com/v18.0/me/adaccounts`,
      { params: { access_token: token } }
    );

    res.status(200).json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch ad accounts' });
  }
}

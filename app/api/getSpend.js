export default async function handler(req, res) {
    const { token, adAccountId } = req.query;
  
    try {
      const fields = 'ad_name,impressions,clicks,spend';
      const response = await axios.get(
        `https://graph.facebook.com/v18.0/${adAccountId}/ads`,
        {
          params: {
            fields,
            access_token: token,
          },
        }
      );
  
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch ad metrics' });
    }
  }
  
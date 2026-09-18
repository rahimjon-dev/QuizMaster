export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  let supabaseStatus = 'ok';
  try {
    const response = await fetch('https://mnlhzkzsfibkujcfcqnh.supabase.co/rest/v1/', {
      headers: {
        apikey: 'sb_publishable__0zm_mdDOdomO6SdoJJVkg_BaMTVHOL',
      },
    });
    supabaseStatus = response.ok || response.status === 401 ? 'alive' : 'reachable';
  } catch (e) {
    supabaseStatus = 'ping_error';
  }

  return res.status(200).json({
    status: 'online',
    app: 'QuizMaster',
    service: '24/7 Keep-Alive & Health Check',
    supabase: supabaseStatus,
    timestamp: new Date().toISOString(),
  });
}

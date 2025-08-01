// netlify/functions/instagram-feed.js

const fetch = require('node-fetch'); // Necessário para Node.js <= 16, Netlify já tem

exports.handler = async function(event, context) {
  const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN; // Lida com o token seguro

  if (!ACCESS_TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Token de acesso do Instagram não configurado.' })
    };
  }

  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const instagramApiUrl = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${ACCESS_TOKEN}`;

  try {
    const response = await fetch(instagramApiUrl);
    const data = await response.json();

    if (data.data) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ success: true, posts: data.data })
      };
    } else {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ success: false, error: data.error.message || 'Erro desconhecido da API do Instagram.' })
      };
    }
  } catch (error) {
    console.error('Erro ao buscar posts do Instagram na função:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ success: false, error: 'Erro de servidor ao buscar posts do Instagram.' })
    };
  }
};
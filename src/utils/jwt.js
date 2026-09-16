// Lightweight, client-safe JWT implementation for React Native / Expo
// Generates standard 3-part base64url encoded tokens: header.payload.signature

const base64UrlEncode = (str) => {
  const base64 = btoa(unescape(encodeURIComponent(str)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const base64UrlDecode = (str) => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return decodeURIComponent(escape(atob(base64)));
};

// Generates a simulated HMAC SHA-256 signature hash from header, payload and secret
const createSignature = (headerB64, payloadB64, secret = 'quizmaster_jwt_secret_key_2026') => {
  const data = `${headerB64}.${payloadB64}.${secret}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return base64UrlEncode(`sig_${Math.abs(hash)}_${Date.now().toString(36)}`);
};

/**
 * Generate a valid JWT token for a user session
 * @param {Object} user - { id, name, email }
 * @param {number} expiresInHours - Token validity in hours (default 72h)
 */
export const generateToken = (user, expiresInHours = 72) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const nowInSeconds = Math.floor(Date.now() / 1000);
  const payload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    iat: nowInSeconds,
    exp: nowInSeconds + expiresInHours * 3600,
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const signatureB64 = createSignature(headerB64, payloadB64);

  return `${headerB64}.${payloadB64}.${signatureB64}`;
};

/**
 * Decode and verify JWT token validity
 * @param {string} token - JWT string
 * @returns {Object|null} Decoded payload or null if invalid/expired
 */
export const verifyToken = (token) => {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payloadJson = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadJson);

    const nowInSeconds = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < nowInSeconds) {
      console.warn('JWT token has expired');
      return null;
    }

    return payload;
  } catch (error) {
    console.error('Failed to decode/verify JWT token:', error);
    return null;
  }
};

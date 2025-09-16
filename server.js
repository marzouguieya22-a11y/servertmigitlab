// Load environment variables from a .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const admin = require('firebase-admin');

// --- Firebase Admin SDK Initialization ---
// IMPORTANT: You need a Firebase service account key.
// 1. Go to your Firebase project settings > Service accounts.
// 2. Click "Generate new private key". A JSON file will be downloaded.
// 3. Set an environment variable GOOGLE_APPLICATION_CREDENTIALS to the path of this file.
// OR, for environments like Vercel/Heroku, encode the file content to base64 and store it
// in an environment variable (e.g., FIREBASE_SERVICE_ACCOUNT_BASE64).
let serviceAccount;
try {
  if (true) {
    serviceAccount = {
  "type": "service_account",
  "project_id": "chaima-4aed2",
  "private_key_id": "298b61dbe9ceff02b7521406032ad66cbe820c5d",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC26rYsG4/dyuWx\n+CaU6eZ4xl+Im4JtPc7jmcKsJYp/WQK2GBGx0nm+DbVtWc1bp9ySyhZ799+NvC6q\n7xXq8bvrBTe1CEZXtlydAqjgrjlj9jweRaeIe5aYMqaLIYZjsWbTc0/xgkgPRQTi\nuwq/GEGeVX6c0oS6CzTHN3u7kyqrAk2v8GHziu9s/V/gv155kIL8df12Spxif+Li\nLYziIZLGFSQktMsORAD/J+QDBkV6t3YNoykbhOgTGZC78AKjqNs8i+mfBxTRvEUM\n9xTzzaG4bdEk2UDLYECL6ZlaesGwvSEjTRHVdZaOCku59LlCVeuK6obkrgZcz36r\nfd9gjijlAgMBAAECggEAASIxPEB0njdl0nD0P68lHKPs71o4gWo77doD8h4FcP1z\ny9lherEQOhST9EFjNyBWwb4fudU8IZMo1SoRSWtO8q4NvZx3X7QRLyYypEwZQGEx\n15x4UuRZLiP+yadfGtYzUxNIlNUAAHcUmtA+yPJi0knyNH7g62fzzRDTrDBXuBBu\nw+gRxI5msQmYIp0Qi/iCmVodAu24cgXviwwaPbeD7/m0nkmCBJFYGBUbKlpTKm62\nnT1gGWQ3Iuf0B9ZvmpHlIlP0Ka2jSjaST8Oa/TMWhFTvKMBtc48YVsCN91H73Z6p\njdWghIhu0FGMiPSpgT6iStyQNMelAL5M4kUzr6Ok4QKBgQDZXB9tZN0xPgq4jQSG\nhPW0qaxadaXq88ZAn8K+9mLI1oG2rP5FTvos/l6AvVOshELWBwd3k5So7EfwNHud\n231qDFjSTdZ3RE285cDdFUunyqezEsWZqgE1KsrIF0LwLSGlSXpMWHbFbAgQbF2E\nOtvuvWNTPB/U86r/Q0G1VlmX3QKBgQDXbx0/zSdrJ6dyVth1JyyuWp9yQufmz6Tt\nMC5hzL4yQnaCRdaRC5lfH/8UMWYAfPhVIyjC93ynzFtBwLMlvwfhbL62etOeRtVN\nrppTGInmH9M5jW4FU6HsOtP8p0pXNjIFTsTFv2PmXDhC6LSKuLBlkujExqKAC9ga\njnNMt7IIqQKBgQDGpcnXGYKJuXDk34ROSH+iABuThMgBJY9/ikLacaUwddKQmCO+\nRgKgUk0eDWnGVg4bOstZPlhz1ZWdcumzCGDjJaubcCXcVGFTjQqpQwgkrjJ7l2Fe\nIZ/+7j/rhE7Z3/VK8Q9DbOoHXcc080S4T26nDxEShfV1ksgpiFcqGmPBRQKBgQDL\n86mhKTvUOipQGN+7qWaneavRpH2fCZ1930tJ02eMdVd0ZWGI145PfB8kos+KTsVa\n9Ho2ec5NnS4XxbLUXVG8nBLA9u84vJ5beJ0pZeXHMwHpTneGG3MEDX17h3Tds7UP\nSU8IVvTgtRWeYmfpnIeC4d3zzIky6AOiwJFvY8jsYQKBgDXBjIWtlJbB6Tq45bIF\nNp18QzRqgtBtaXzD/Mt7ViV2LLPTF3Phb65aP/UBdu2wMFF6nUW9KC6VE7YaWig2\ny7ra6Y1BlrL6wwdXNS0/0iIiFn25yZ8ys2PcHGUvIkorywAsIoY7iWkVoRpmv+Ld\nggK4sdyR8emikDRjRcyj9mIM\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-kgo8y@chaima-4aed2.iam.gserviceaccount.com",
  "client_id": "116884836716058144352",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kgo8y%40chaima-4aed2.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
;
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    // This will use GOOGLE_APPLICATION_CREDENTIALS env var by default
    console.log('Initializing Firebase Admin with Application Default Credentials.');
  }
} catch (error) {
  console.error('Error parsing Firebase service account:', error);
  process.exit(1);
}

admin.initializeApp({
  credential: serviceAccount ? admin.credential.cert(serviceAccount) : admin.credential.applicationDefault(),
});

const db = admin.firestore();
const app = express();

// --- Middleware ---
// Use CORS to allow requests from your frontend's origin
app.use(cors({ origin: '*' })); // For development, allow all. For production, restrict to your frontend URL.
app.use(express.json());

// --- GitLab OAuth Configuration ---
// IMPORTANT: Create a GitLab application in your GitLab settings > Applications.
// - Scopes: select `api`, `read_user`, `read_repository`.
// - Redirect URI: Must match this server's callback URL (e.g., http://localhost:3000/auth/gitlab/callback)
const GITLAB_CLIENT_ID = "714ce09dcc4ced803f1d30e8005e3843cfc1351a7d0e73e20440151dbdb85d4a";
const GITLAB_CLIENT_SECRET = "gloas-977a6922ef7b3321db2b7eca54fe0814ba6aa4597ca6ae043d7e9ba4980bcad5";
const REDIRECT_URI = process.env.GITLAB_CALLBACK_URL || 'http://localhost:3000/auth/gitlab/callback';
const GITLAB_BASE_URL = 'https://gitlab.com';
const FALLBACK_FRONTEND_URL = 'https://tmiisikefeya.vercel.app';

// --- Routes ---

/**
 * Route to initiate the GitLab OAuth flow.
 * The frontend redirects the user here.
 * Expects a `userId` query parameter.
 */
app.get('/auth/gitlab', (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).send('User ID is required.');
  }

  // Use Referer header to get the frontend URL, with a fallback.
  const referer = req.headers.referer || FALLBACK_FRONTEND_URL;
  const frontendUrl = new URL(referer).origin;

  const state = Buffer.from(JSON.stringify({ userId, frontendUrl })).toString('base64');

  const authUrl = new URL(`${GITLAB_BASE_URL}/oauth/authorize`);
  authUrl.searchParams.append('client_id', GITLAB_CLIENT_ID);
  authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('scope', 'api read_user read_repository');
  authUrl.searchParams.append('state', state); // Pass the encoded state

  res.redirect(authUrl.toString());
});

/**
 * Callback route that GitLab redirects to after user authorization.
 */
app.get('/auth/gitlab/callback', async (req, res) => {
  const { code, state } = req.query;

  let frontendUrl = FALLBACK_FRONTEND_URL;
  let userId;

  if (!code || !state) {
    return res.status(400).redirect(`${frontendUrl}/#/gitlab?status=error&message=InvalidCallback`);
  }

  try {
    const decodedState = JSON.parse(Buffer.from(state, 'base64').toString('ascii'));
    userId = decodedState.userId;
    frontendUrl = decodedState.frontendUrl || frontendUrl;

    if (!userId) {
      throw new Error('User ID missing from state');
    }

    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(`${GITLAB_BASE_URL}/oauth/token`, null, {
      params: {
        client_id: GITLAB_CLIENT_ID,
        client_secret: GITLAB_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      },
    });

    const { access_token, refresh_token, expires_in } = tokenResponse.data;
    const expiresAt = Date.now() + expires_in * 1000;

    // Store the tokens securely in the user's Firestore document
    const userDocRef = db.collection('members').doc(userId);
    await userDocRef.update({
      gitlab: {
        accessToken: access_token, // In a real app, encrypt this token
        refreshToken: refresh_token, // And this one
        expiresAt,
      },
    });

    // Redirect the user back to the frontend application
    res.redirect(`${frontendUrl}/#/gitlab?status=success`);

  } catch (error) {
    console.error('Error during GitLab OAuth callback:', error.response ? error.response.data : error.message);
    res.status(500).redirect(`${frontendUrl}/#/gitlab?status=error&message=TokenExchangeFailed`);
  }
});

/**
 * Route to disconnect a user's GitLab account.
 */
app.post('/auth/gitlab/disconnect', async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
    }

    try {
        const userDocRef = db.collection('members').doc(userId);
        // Use Firestore's `FieldValue.delete()` to remove the 'gitlab' field
        await userDocRef.update({
            gitlab: admin.firestore.FieldValue.delete(),
        });
        res.status(200).json({ message: 'Successfully disconnected GitLab account.' });
    } catch (error) {
        console.error('Error disconnecting GitLab account:', error);
        res.status(500).json({ error: 'Failed to disconnect GitLab account.' });
    }
});


// --- Server Start ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

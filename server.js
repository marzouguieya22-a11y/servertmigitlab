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
  "private_key_id": "737af553f1eed084bdcde5edb70f20cfb8eaa83b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDidB1aXnq5WIj5\nwiM8mHzpl1o5I6pugN43Q9Vg5tmrnUd/BbzgQNa4JQ10hBxRbVWOLn73yAeBE+0/\nVN+OIK/ukpxyR2CJQRgTxObn40+vgCYuqbX7uYKjYbR/AFQIt+/zyxLJRVjWTBtK\n2DFqyQD1PJKJeIFA5ENR6kOimSauflIXmRp2BQt52H3qR9k2Y0tO71BNNzVdmSy5\nIE6vOx9vFKJ4yIItVryPBV35t0Zc0i41j95taNUBFoS3xAIGj0jUsfffcxtnU94F\n7wuYPC+pZ7uYKiMuupci1CPu70Ca3nLOdLh8UYe+FvlOMI1os/SAlhLsDSATg0Ql\nrlfSa021AgMBAAECggEAIvEAM3i3DoDI9+K6/adYxNFQAFeOvWjAgP4EP2S3avnE\ndabMvzx59SVwd01IMk9Av4TQngp9D+9jcN13di54fwMbxS1ayarj3G8KIvcpzT5k\nhdg1Zo84B14009DY5pR9H5yyvCApZj2Ni4Wi0GON9IkhYjlYFktyUMIpJ/5iH9O/\nKMPBJ1k3hT1AwXR+jdhC+o71nDc6yDtgHLYqQpCBsF9d0A73BVhkpFvq7v36dCkC\nWccU33y5RBw/f84Hc5G1wVDQmx1f8VAgtgPmJnJN5NtJGYOQn7ZzBX4m6cMpRzOF\naB2nDrfE1bLc6tXtEplRsg+Usa1DOc+44hOKP4JusQKBgQDxiJeknBvKKCQE+VVY\n8azwTklZnZa/w3cLnSj4JjYIeVbRx2pbBkqLI9awEk9so4Sa3oDuOe98495P1tzS\nEOAIpj0X/tBtXUq6+x5adwcVShPf9r7k0kose04AKtSEgMiBv4yoryrz/K39wHpe\nV+uBLSv50DukjPXGgLfMo4IDRQKBgQDwBE1tzFUd1xMSTJptUtY+x6n3MBvSz0LM\nCh4pG0M/DPRl1I5bzTXTQ0H85d61rUqmuycMPJKVgL33X1RhdLv7kY9WfyAufkjB\nRNYXuD4p7mOcn+B3DiELqh7sUfjzJFmbrVgXsMaqtINTv7bh4h9SFTZ4/54YBrPn\nE8daZF4PsQKBgQDFf/CnzHK40ivp2UudqDjGYu19luvOsHFmkMMQboZeVYHVlZ91\nAObxcYO6g65oYikrTefVZJBc6iM9267DIsNerzhjp5wc4V0bGf4O8SdclC8+QpCD\noSS/zK/SWTNficLqvYux31JbIfHP/ZTSEkhjX2GHK2upuQ27nEMu1UCZlQKBgQDQ\nHUruG7DqMOVOhrGYfa1bvlD4DvTxM9ndhiBk0Ejc0OTRrx7JJwS27Ki5GrCjo2EJ\ndVoEWDlZ/Mm7RyOpZUjid3JsM8q5xbJcMs3Yv17XiOdClbZSRSQOMzKhAur0GN7C\nB+pMkHGS7va4lZGEB0fVKqOTA0IX3yf7A8Fl9YVB4QKBgBmsmhbmEAAEeckvEVfG\nyNNftAtBd2rZV0e7Veco71sBQLMWnKfFD1jqZbxCOhLQOSl0mLjWAlq64BOlYNCH\nK3O9g8vRrwAHItI2UpS4YGOybFuuO9p7rKgpXPiOFAjDJ77WD2jmvmUw7Nu4KUGq\nuSsqyjQLk9Ak5RONEC1NwgQj\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-kgo8y@chaima-4aed2.iam.gserviceaccount.com",
  "client_id": "116884836716058144352",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kgo8y%40chaima-4aed2.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};
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

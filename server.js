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
 
    serviceAccount = {
  "type": "service_account",
  "project_id": "chaima-4aed2",
  "private_key_id": "189e9bfa0022f12b573d571d9f5b2c9569894d87",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDkYES6XqEU4cjm\nrlZgpo/GsLVMM++T/nM+6ic57W+u92CmPFG3ecgqN+M1vqtwFm6tUTNQPEWOdJRa\nHC8A/mlqcsck81f/ri6b9nqc6TqDQx0RVPrfwLgBVqNg9VyWFWd7oSgp2MI8yxOH\nkjmJdSHAenXJHFjPjgwfwTQvK1uAeIigQHudBOEE4HFdPM5lrNMjqlJ/yFaXJkAU\nEz2/r74i5AXV+dx8e/q4tjwOEIIOibQswJuRtNdU2Ifsqj1nMqWlwxGMSw+Obn/B\n3lPD3oThBreALdLXian22a2fgQOgue+3EW3H8v61lQYvqDVpSihXFnbcPnjvgUlk\nl8K++BWjAgMBAAECggEAFI19YfBmOsTfGbOS3nve8JiymDsMUptRr9XO1e3CYVKu\nBgfjqslw9Cu3bPzN3PaH2101awEhmWJwf3ON318GCahut6qWvtHkK/EQs9Jhi7Kc\niRTGxyBG7wfnCDDMtk0S1RN509pIEMSN62ODfhVmhjX/J6w/ad50xN7UXXJfd741\ntKHxEFC45kaay8ulH8BSt1USGM5JxEb/zuG4e2Q2fs9Macotkj/1y80iJImVvh6k\nda1CfDF1UylGKfoNauJWC0SOG79kZvCg9PToGBxFEsVtMFnwfyt4BsJBqliXj4y9\npB7DcQz/PgzYg9YYGuuRTUCWva2TmvmXDEHL+l1BwQKBgQD36tzR976r6JSGUQvr\nkP3PX9IZlJTobmcSimna6VkREwTKG5PC1Cwskh9ZLbmrtUUOzDZb1APUXrCWFuFi\ngSmgOudWhcjNoPuXRIz5Y1ZY2zZAX+F4ylfwF35Mtsg1H18rPSTY983T/PzLXMzC\nYTypDNZe1q3DuoYc2rCM6vjwMQKBgQDr0k/iJayW5quJBdWyVKoL2myalZcmK33O\nkuJGDiBs3Z5VdpNEyHORkX9zQQ5tJh7yGjyid3chfdAJTlpflsoLVm6jfK17YXfG\nIZEGebDVhANWUmzIE8sQ2GZiiEQNb4utFlYpARYi3OCEaH1Z0BM3jNZyjVImS5Yg\nkM+sv+PiEwKBgG24z2RKHmQc+mb7xafLMtmt0eGqZcD847dL9Q+CyP2Kikscq2fF\n2YscXK1uVEdPYbHr5X78tXkvMz4qADRFb/PPPgWIDlgbkF3hY/cX5OZMlpUlGjgI\nbaT/8NDo8HC6YrdTR1STT9ArnoIunxzERkGXQeUVZDBFBAgPLaYgdG5xAoGAF7Dx\nRY7zX9Wctg9YAKpwyvAOqRkOLk+APBiVkuQobcd1+LAI64gX1DAB1dpbUKvbwAbS\nwJ+v4DV7iPPOMHw9oBX214XXB+Yq2kTVBQmEsm6oxytQsmkKpY6X+p4l+BOUvLbZ\nwRTS3H3EMIkuzq8Qvyvu/2MjNaWyV2M0+e3tPvECgYAYNPwb/rihB2yZ1PbObC6W\nla4TliQYumhyWoNmaWJlXYIycPjisugq+6uHwAKeZBbr3CWBP2Vk4mFYtyUf9E1N\nbDYiGjn5fxaboRKDon8gcQfYwUeFqoQRxy9Q//lXOdi5HvjeqxQM3o+Kw1N+b7e0\nLG2ITV7+CZ5NAyGgeAYJ+g==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-kgo8y@chaima-4aed2.iam.gserviceaccount.com",
  "client_id": "116884836716058144352",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kgo8y%40chaima-4aed2.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
;

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
const GITLAB_CLIENT_ID = "3254a2395a184cd634d6d1864fb3e61e64b48aee13f372aa2ef8feb727f5831c";
const GITLAB_CLIENT_SECRET = "gloas-c9f3dcef1d3ceb4e343acc9880f94ce07c120a76f27c295d3bc052afef15c5de";
const REDIRECT_URI = 'https://servertmigitlab.onrender.com/auth/gitlab/callback';
const GITLAB_BASE_URL = 'https://gitlab.com';
const FALLBACK_FRONTEND_URL = 'https://tmiisikefeya.vercel.app';

// --- Routes ---

/**
 * Route to initiate the GitLab OAuth flow.
 * The frontend redirects the user here.
 * userId is no longer needed as credentials are now global.
 */
app.get('/auth/gitlab', (req, res) => {
  // Use Referer header to get the frontend URL, with a fallback.
  const referer = req.headers.referer || FALLBACK_FRONTEND_URL;
  const frontendUrl = new URL(referer).origin;

  // The state now only needs to contain the frontend URL to redirect back to.
  const state = Buffer.from(JSON.stringify({ frontendUrl })).toString('base64');

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

  if (!code || !state) {
    return res.status(400).redirect(`${frontendUrl}/#/gitlab?status=error&message=InvalidCallback`);
  }

  try {
    const decodedState = JSON.parse(Buffer.from(state, 'base64').toString('ascii'));
    frontendUrl = decodedState.frontendUrl || frontendUrl;

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

    // Store the tokens in a dedicated global document
    const integrationDocRef = db.collection('integrations').doc('gitlab');
    await integrationDocRef.set({
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt,
    });

    // Redirect the user back to the frontend application
    res.redirect(`${frontendUrl}/#/gitlab?status=success`);

  } catch (error) {
    console.error('Error during GitLab OAuth callback:', error.response ? error.response.data : error.message);
    res.status(500).redirect(`${frontendUrl}/#/gitlab?status=error&message=TokenExchangeFailed`);
  }
});

/**
 * Route to disconnect the global GitLab account.
 */
app.post('/auth/gitlab/disconnect', async (req, res) => {
    // No userId is needed as this is a global action.
    try {
        const integrationDocRef = db.collection('integrations').doc('gitlab');
        // Delete the document to remove all credentials.
        await integrationDocRef.delete();
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

const fs = require('fs');
const path = require('path');

function ensureEnvLoaded() {
  if (process.env.GREEN_API_ID_INSTANCE && process.env.GREEN_API_TOKEN_INSTANCE) return;
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      });
    } catch (e) {}
  }
}

module.exports = async function handler(req, res) {
  ensureEnvLoaded();

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return res.status(200).json({
    host: process.env.GREEN_API_HOST || 'https://7107.api.green-api.com',
    idInstance: process.env.GREEN_API_ID_INSTANCE || '',
    apiTokenInstance: process.env.GREEN_API_TOKEN_INSTANCE || '',
    recipientPhone: process.env.GREEN_API_RECIPIENT_PHONE || '918104184829',
    groupChatId: process.env.GREEN_API_CHAT_ID || '918104184829@c.us',
    emailAppointments: process.env.APPOINTMENTS_EMAIL || 'karansingchavan2582@gmail.com'
  });
};

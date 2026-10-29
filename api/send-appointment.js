module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { chatId, message, appointmentData, targetEmail } = req.body || {};
    if (!message && !appointmentData) {
      return res.status(400).json({ error: 'Message or appointment data is required' });
    }

    const host = process.env.GREEN_API_HOST || 'https://7107.api.green-api.com';
    const idInstance = process.env.GREEN_API_ID_INSTANCE || '710722781766';
    const apiToken = process.env.GREEN_API_TOKEN_INSTANCE || '35e4d99b93c342f591e581b893d9e4c7f5f54b167b194b10a3';
    const targetChatId = chatId || process.env.GREEN_API_CHAT_ID || '918104184829@c.us';
    const emailTo = targetEmail || 'karansingchavan2582@gmail.com';

    const tasks = [];

    // 1. WhatsApp Dispatch via Green-API
    if (message) {
      const greenApiUrl = `${host}/waInstance${idInstance}/sendMessage/${apiToken}`;
      tasks.push(
        fetch(greenApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chatId: targetChatId,
            message: message
          })
        }).then(r => r.json()).catch(err => ({ error: 'WhatsApp dispatch failed: ' + err.message }))
      );
    }

    // 2. Email Dispatch via FormSubmit with verified Origin headers
    if (appointmentData) {
      const formSubmitUrl = `https://formsubmit.co/ajax/${emailTo}`;
      tasks.push(
        fetch(formSubmitUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'https://sahastraocudent.org',
            'Referer': 'https://sahastraocudent.org/'
          },
          body: JSON.stringify({
            _subject: `🏥 Appointment Request #${appointmentData.requestId || 'REQ'} — ${appointmentData.patientName} (${appointmentData.department})`,
            _template: 'table',
            _captcha: 'false',
            'Reference ID': `#${appointmentData.requestId || 'REQ'}`,
            'Department': appointmentData.department,
            'Patient Name': appointmentData.patientName,
            'Contact Number': appointmentData.contactNumber,
            'Preferred Date': appointmentData.date,
            'Preferred Time Window': appointmentData.time,
            'Symptoms / Notes': appointmentData.message || 'General Consultation',
            'Submitted Via': 'sahastraocudent.org'
          })
        }).then(r => r.json()).catch(err => ({ error: 'Email dispatch failed: ' + err.message }))
      );
    }

    const results = await Promise.allSettled(tasks);
    return res.status(200).json({
      success: true,
      results: results.map(r => r.value || r.reason)
    });
  } catch (error) {
    console.error('Error in send-appointment handler:', error);
    return res.status(500).json({ error: error.message || 'Failed to dispatch notification' });
  }
};

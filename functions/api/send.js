/**
 * Cloudflare Pages Function: POST /api/send
 * Standard contact form → sends email via SMTP2Go (no Formspree).
 * Requires env.SMTP2GO_API_KEY in Cloudflare Pages (Settings → Environment variables).
 * Sender: japanesevehicleimports@circlebc.com.au → To: goran.tipura@circlebc.com.au, david.debono@circlebc.com.au
 */

const SENDER = 'japanesevehicleimports@circlebc.com.au';
const TO_EMAILS = ['goran.tipura@circlebc.com.au', 'david.debono@circlebc.com.au'];
const SMTP2GO_URL = 'https://api.smtp2go.com/v3/email/send';

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function buildEnquiryText(data) {
  const lines = [
    'Japanese Vehicle Imports – Enquiry',
    '-----------------------------------',
    `Contact Name: ${data.contact_name || '-'}`,
    `Phone Number: ${data.phone || '-'}`,
    `Email: ${data.email || '-'}`,
    '',
    'Description:',
    data.description || '(none)',
  ];
  return lines.join('\n');
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const apiKey = env.SMTP2GO_API_KEY;

  if (!apiKey) {
    return jsonResponse({ error: 'Server configuration error' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400);
  }

  if (body.type !== 'enquiry') {
    return jsonResponse({ error: 'Invalid type (enquiry only)' }, 400);
  }

  // Honeypot: reject if bot filled the trap field
  if (body._gotcha) {
    return jsonResponse({ ok: true }); // Pretend success to not tip off bots
  }

  const subject = 'Japanese Vehicle Imports – Enquiry';
  const textBody = buildEnquiryText(body);

  const payload = {
    sender: SENDER,
    to: TO_EMAILS,
    subject,
    text_body: textBody,
  };

  try {
    const res = await fetch(SMTP2GO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Smtp2go-Api-Key': apiKey,
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error('SMTP2Go error', res.status, data);
      return jsonResponse(
        { error: 'Failed to send email' },
        res.status >= 500 ? 502 : 400
      );
    }

    if (data.data && data.data.succeeded !== 1) {
      console.error('SMTP2Go reported failure', data);
      return jsonResponse({ error: 'Failed to send email' }, 502);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('Send error', err);
    return jsonResponse({ error: 'Failed to send email' }, 502);
  }
}

import express, { type Request, type Response } from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const DESTINATION_EMAIL = process.env.CONTACT_TO_EMAIL || 'arfamunam01@gmail.com';

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validateContactPayload(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request payload.' };
  }

  const raw = body as Record<string, unknown>;
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  const email = typeof raw.email === 'string' ? raw.email.trim() : '';
  const subject = typeof raw.subject === 'string' ? raw.subject.trim() : '';
  const message = typeof raw.message === 'string' ? raw.message.trim() : '';

  if (!name || !email || !subject || !message) {
    return { ok: false, error: 'Please complete your name, email, enquiry type, and message.' };
  }

  if (name.length > 120) {
    return { ok: false, error: 'Name must be 120 characters or fewer.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || email.length > 160) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }

  if (subject.length > 160) {
    return { ok: false, error: 'Project / enquiry type is too long.' };
  }

  if (message.length > 2000) {
    return { ok: false, error: 'Message must be 2000 characters or fewer.' };
  }

  return { ok: true, data: { name, email, subject, message } };
}

function buildEmailHtml(payload: ContactPayload): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FFF7EC; border: 1px solid #F2DEC8; border-radius: 14px; overflow: hidden; color: #101C35;">
      <div style="background: #101C35; padding: 20px 24px; color: #FFFFFF;">
        <p style="margin: 0 0 4px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #FA5538; font-weight: 700;">Portfolio Contact</p>
        <h2 style="margin: 0; font-size: 20px; font-weight: 700;">New Message from ${escapeHtml(payload.name)}</h2>
      </div>
      <div style="padding: 22px 24px; background: #FFFFFF;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #64748B; width: 140px; font-weight: 600;">Name</td>
            <td style="padding: 8px 0; color: #101C35; font-weight: 600;">${escapeHtml(payload.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Sender Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #FA5538; text-decoration: none;">${escapeHtml(payload.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Enquiry Type</td>
            <td style="padding: 8px 0; color: #101C35;">${escapeHtml(payload.subject)}</td>
          </tr>
        </table>
        <div style="background: #FFF7EC; border-left: 3px solid #FA5538; padding: 14px 16px; border-radius: 6px; font-size: 14px; line-height: 1.65; white-space: pre-wrap;">${escapeHtml(payload.message)}</div>
      </div>
    </div>
  `;
}

function buildEmailText(payload: ContactPayload): string {
  return [
    'New Portfolio Contact Message',
    '-----------------------------',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Project / Enquiry Type: ${payload.subject}`,
    '',
    'Message:',
    payload.message,
  ].join('\n');
}

function normalizeFromAddress(raw?: string): string {
  const fallback = 'Portfolio Contact <onboarding@resend.dev>';
  if (!raw) return fallback;

  const cleaned = raw.trim().replace(/^["']|["']$/g, '').trim();
  if (!cleaned) return fallback;

  const plainEmailRe = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
  const namedEmailRe = /^[^<>\r\n]+\s*<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$/;

  if (plainEmailRe.test(cleaned) || namedEmailRe.test(cleaned)) {
    return cleaned;
  }

  return fallback;
}

async function postToResend(
  apiKey: string,
  fromAddress: string,
  payload: ContactPayload
): Promise<{ ok: boolean; status: number; errText: string }> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [DESTINATION_EMAIL],
      reply_to: payload.email,
      subject: `[Portfolio] ${payload.subject} — ${payload.name}`,
      html: buildEmailHtml(payload),
      text: buildEmailText(payload),
    }),
  });

  if (res.ok) {
    return { ok: true, status: res.status, errText: '' };
  }

  const errText = await res.text().catch(() => '');
  return { ok: false, status: res.status, errText };
}

async function sendViaResend(payload: ContactPayload, apiKey: string): Promise<void> {
  const defaultFrom = 'Portfolio Contact <onboarding@resend.dev>';
  const fromAddress = normalizeFromAddress(process.env.RESEND_FROM_EMAIL);

  let attempt = await postToResend(apiKey, fromAddress, payload);

  if (!attempt.ok && (attempt.status === 422 || attempt.status === 403) && fromAddress !== defaultFrom) {
    attempt = await postToResend(apiKey, defaultFrom, payload);
  }

  if (!attempt.ok) {
    throw new Error(`Email service rejected request (${attempt.status}): ${attempt.errText || 'Unknown error'}`);
  }
}

async function sendViaSmtp(payload: ContactPayload): Promise<void> {
  const user = (process.env.SMTP_USER || process.env.GMAIL_USER || '').trim();
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error('SMTP credentials not configured.');
  }

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;

  const safeDisplayName = payload.name.replace(/[\r\n"<>]/g, ' ').trim() || 'Portfolio Visitor';

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"${safeDisplayName} via Portfolio" <${user}>`,
    to: DESTINATION_EMAIL,
    replyTo: `${safeDisplayName} <${payload.email}>`,
    subject: `[Portfolio] ${payload.subject} — ${payload.name}`,
    text: buildEmailText(payload),
    html: buildEmailHtml(payload),
  });
}

async function sendViaFormSubmit(payload: ContactPayload, req: Request): Promise<{ ok: boolean; needsActivation?: boolean; message?: string }> {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const host = req.get('host') || 'localhost:3000';
  const origin = req.get('origin') || `${protocol}://${host}`;
  const referer = req.get('referer') || `${origin}/`;

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(DESTINATION_EMAIL)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': origin,
      'Referer': referer,
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      _replyto: payload.email,
      project_type: payload.subject,
      _subject: `Portfolio Message: ${payload.subject} — from ${payload.name}`,
      message: payload.message,
      _template: 'table',
      _captcha: 'false',
    }),
  });

  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  const successFlag = data.success === true || data.success === 'true';
  const rawMessage = typeof data.message === 'string' ? data.message : '';

  if (response.ok && successFlag) {
    return { ok: true };
  }

  if (rawMessage.toLowerCase().includes('activation')) {
    return {
      ok: false,
      needsActivation: true,
      message: `One-time email activation required: please check ${DESTINATION_EMAIL} and click the FormSubmit "Activate Form" link once, then resend.`,
    };
  }

  throw new Error(rawMessage || `Relay returned HTTP ${response.status}`);
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, destination: DESTINATION_EMAIL });
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    const validation = validateContactPayload(req.body);
    if (!validation.ok) {
      res.status(400).json({ ok: false, message: validation.error });
      return;
    }

    const payload = validation.data;

    try {
      const resendKey = process.env.RESEND_API_KEY?.trim();
      const smtpUser = (process.env.SMTP_USER || process.env.GMAIL_USER || '').trim();
      const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

      if (resendKey) {
        try {
          await sendViaResend(payload, resendKey);
          res.json({ ok: true, provider: 'resend', message: 'Your message has been sent!' });
          return;
        } catch (resendErr) {
          console.warn('[contact-api] Resend failed, falling back:', resendErr instanceof Error ? resendErr.message : resendErr);
        }
      }

      if (smtpUser && smtpPass) {
        try {
          await sendViaSmtp(payload);
          res.json({ ok: true, provider: 'smtp', message: 'Your message has been sent!' });
          return;
        } catch (smtpErr) {
          console.warn('[contact-api] SMTP failed, falling back:', smtpErr instanceof Error ? smtpErr.message : smtpErr);
        }
      }

      const relayResult = await sendViaFormSubmit(payload, req);
      if (relayResult.ok) {
        res.json({ ok: true, provider: 'formsubmit', message: 'Your message has been sent!' });
        return;
      }

      if (relayResult.needsActivation) {
        res.status(409).json({
          ok: false,
          needsActivation: true,
          message: relayResult.message,
        });
        return;
      }

      res.status(502).json({
        ok: false,
        message: 'Unable to send your message right now. Please try again or email arfamunam01@gmail.com directly.',
      });
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Unexpected server error';
      console.error('[contact-api] Failed to dispatch contact email:', detail);
      res.status(502).json({
        ok: false,
        message: 'Could not deliver the message automatically right now. Please try again or email arfamunam01@gmail.com directly.',
      });
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    const publicDir = path.resolve(__dirname, 'public');
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
    }
    if (fs.existsSync(publicDir)) {
      app.use(express.static(publicDir));
    }
    app.use(express.static(__dirname));
    app.get('*', (_req: Request, res: Response) => {
      const distIndex = path.join(distDir, 'index.html');
      const rootIndex = path.join(__dirname, 'index.html');
      res.sendFile(fs.existsSync(distIndex) ? distIndex : rootIndex);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import nodemailer from 'nodemailer';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  if (req.hostname === 'www.bytemepc.com') {
    return res.redirect(301, `https://bytemepc.com${req.originalUrl}`);
  }
  next();
});

const angularApp = new AngularNodeAppEngine();

const GOOGLE_API_KEY = process.env['GOOGLE_PLACES_API_KEY'] ?? '';
const GOOGLE_PLACE_ID = process.env['GOOGLE_PLACE_ID'] ?? '';

const SMTP_HOST   = process.env['SMTP_HOST'] ?? 'smtp.gmail.com';
const SMTP_PORT   = parseInt(process.env['SMTP_PORT'] ?? '587', 10);
const SMTP_USER   = process.env['SMTP_USER'] ?? '';
const SMTP_PASS   = process.env['SMTP_PASS'] ?? '';
const CONTACT_TO  = process.env['CONTACT_TO'] ?? '';

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, message } = req.body as { name?: string; phone?: string; email?: string; message?: string };

  if (!name || (!phone && !email) || !message) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    res.status(503).json({ error: 'Email not configured' });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"ByteMe PC Website" <${SMTP_USER}>`,
      to: CONTACT_TO,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\n${phone ? `Phone: ${phone}\n` : ''}${email ? `Email: ${email}\n` : ''}\nMessage:\n${message}`,
      html: `
        <h2 style="color:#1a4fa8">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
        <hr/>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.get('/api/reviews', async (_req, res) => {
  if (!GOOGLE_API_KEY || !GOOGLE_PLACE_ID) {
    res.json({ reviews: [], rating: 0, total: 0, configured: false });
    return;
  }

  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${GOOGLE_PLACE_ID}` +
      `&fields=reviews,rating,user_ratings_total` +
      `&reviews_sort=newest` +
      `&key=${GOOGLE_API_KEY}`;

    const response = await fetch(url);
    const data = (await response.json()) as {
      status: string;
      result?: {
        reviews?: GoogleReview[];
        rating?: number;
        user_ratings_total?: number;
      };
    };

    if (data.status !== 'OK') {
      res.status(502).json({ error: 'Google Places API error', status: data.status });
      return;
    }

    res.json({
      reviews: data.result?.reviews ?? [],
      rating: data.result?.rating ?? 0,
      total: data.result?.user_ratings_total ?? 0,
      configured: true,
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
}

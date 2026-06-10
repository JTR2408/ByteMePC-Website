import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const GOOGLE_API_KEY = process.env['GOOGLE_PLACES_API_KEY'] ?? '';
const GOOGLE_PLACE_ID = process.env['GOOGLE_PLACE_ID'] ?? '';

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

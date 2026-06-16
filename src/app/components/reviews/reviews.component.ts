import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Review {
  name: string;
  rating: number;
  text: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent {
  readonly overallRating = 5.0;
  readonly totalReviews = 3;

  // TODO: replace with live ReviewsService + Google Places API when client is ready (see src/app/services/reviews.service.ts)
  readonly reviews: Review[] = [
    {
      name: 'Rachael Bach',
      rating: 5,
      text: "Great service. Highly recommended for all your technical problems. My laptop recently died, after taking a look John kindly advised me the best options for a new laptop and organised the data transfer so I didn't lose all my coursework. Brilliant price and I had my new laptop all ready in a matter of days. Thanks again, I'll definitely use your service again 🙂",
    },
    {
      name: 'Phill Hawthorne',
      rating: 5,
      text: 'Absolutely brilliant, replaced battery on my phone and was spot on with everything that was done, good price and done in quick time, will definitely recommend to friends and family and will use again.',
    },
    {
      name: "Helen O'Neil",
      rating: 5,
      text: "Nice guy. Sorted my computer out quickly. He explained what was wrong and why. All fixed on the same day. A good reasonable price. I would definitely use his services again and would recommend him to my friends and family. Very happy.",
    },
  ];

  stars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  initials(name: string): string {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { ReviewsService, Review } from '../../services/reviews.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, CarouselModule, SkeletonModule, AvatarModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent implements OnInit {
  private reviewsService = inject(ReviewsService);

  reviews = signal<Review[]>([]);
  overallRating = signal(0);
  totalReviews = signal(0);
  loading = signal(true);
  configured = signal(false);

  readonly carouselResponsive = [
    { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
    { breakpoint: '640px',  numVisible: 1, numScroll: 1 },
  ];

  ngOnInit(): void {
    this.reviewsService.getReviews().subscribe((data) => {
      this.reviews.set(data.reviews);
      this.overallRating.set(data.rating);
      this.totalReviews.set(data.total);
      this.configured.set(data.configured);
      this.loading.set(false);
    });
  }

  stars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  readonly placeholders = [
    { name: 'Sarah M.', time: 'a week ago', text: 'Incredibly fast and professional service. My laptop had a cracked screen and they had it fixed same day. Wouldn\'t go anywhere else!' },
    { name: 'James T.', time: '2 weeks ago', text: 'Got rid of a nasty virus that had slowed my PC to a crawl. Transparent pricing and they even explained what they\'d done. Great service.' },
    { name: 'Rachel K.', time: 'a month ago', text: 'Custom build came out absolutely perfect. The team clearly knew their stuff and kept me updated throughout. 100% recommend.' },
  ];

  initials(name: string): string {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}

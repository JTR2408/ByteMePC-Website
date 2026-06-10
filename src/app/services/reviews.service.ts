import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  rating: number;
  total: number;
  configured: boolean;
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private http = inject(HttpClient);

  getReviews(): Observable<ReviewsResponse> {
    return this.http.get<ReviewsResponse>('/api/reviews').pipe(
      catchError(() => of({ reviews: [], rating: 0, total: 0, configured: false })),
    );
  }
}

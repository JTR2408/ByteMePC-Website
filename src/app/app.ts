import { Component } from '@angular/core';
import { NavbarComponent }  from './components/navbar/navbar.component';
import { HeroComponent }    from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { AboutComponent }   from './components/about/about.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent }  from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    ReviewsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

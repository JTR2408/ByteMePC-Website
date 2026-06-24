import { Component, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DividerModule, DialogModule, ButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  policyVisible = signal(false);

  readonly links = [
    { label: 'Services', anchor: 'services' },
    { label: 'About',    anchor: 'about'    },
    { label: 'Reviews',  anchor: 'reviews'  },
    { label: 'Contact',  anchor: 'contact'  },
  ];

  readonly socials = [
    { icon: 'pi-facebook', href: 'https://www.facebook.com/bytemene/', label: 'Facebook' },
    { icon: 'pi-google',   href: 'https://share.google/DYClB96hYQhleEuiz', label: 'Google'   },
  ];

  scrollTo(anchor: string): void {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
  }
}

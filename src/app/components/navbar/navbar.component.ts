import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonModule, DrawerModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  scrolled = signal(false);
  mobileOpen = signal(false);

  readonly navLinks = [
    { label: 'Services', anchor: 'services' },
    { label: 'About',    anchor: 'about'    },
    { label: 'Reviews',  anchor: 'reviews'  },
    { label: 'Contact',  anchor: 'contact'  },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  scrollTo(anchor: string): void {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
    this.mobileOpen.set(false);
  }
}

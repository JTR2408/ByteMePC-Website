import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [DividerModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly stats = [
    { value: '500+', label: 'Repairs completed' },
    { value: '5★',   label: 'Average Google rating' },
    { value: '<24h', label: 'Average turnaround' },
    { value: '100%', label: 'Transparent pricing' },
  ];

  readonly highlights = [
    { icon: 'pi-clock',        text: 'Same-day repairs on most common issues' },
    { icon: 'pi-pound',        text: 'No-fix, no-fee guarantee' },
    { icon: 'pi-map-marker',   text: 'Local, walk-in friendly service' },
    { icon: 'pi-lock',         text: 'Your data stays private — always' },
  ];
}

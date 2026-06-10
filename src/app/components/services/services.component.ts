import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';

export interface Service {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  badge?: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, TagModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  activeService = signal<Service | null>(null);
  dialogVisible = signal(false);

  readonly services: Service[] = [
    {
      id: 'phone-repair',
      icon: 'pi-mobile',
      title: 'Phone Repair',
      shortDesc: 'Fast repairs for cracked screens, batteries, and more.',
      fullDesc:
        'Smashed screen, dead battery, water damage, or a charging port that won\'t work? We repair all major smartphone brands including Apple, Samsung, Google, and more — usually while you wait.',
      features: [
        'Screen & display replacements',
        'Battery replacements',
        'Charging port repairs',
        'Water damage treatment',
        'Camera & speaker repairs',
        'Button & microphone fixes',
      ],
      badge: 'Most Popular',
    },
    {
      id: 'virus',
      icon: 'pi-shield',
      title: 'Virus & Malware Removal',
      shortDesc: 'Deep cleaning and security setup to protect your system.',
      fullDesc:
        'Infected PC running slow, showing strange pop-ups, or locked by ransomware? We perform a thorough removal of all threats and set up real protection so it doesn\'t happen again.',
      features: [
        'Full system malware scan & removal',
        'Ransomware recovery (where possible)',
        'Browser hijacker cleanup',
        'Security software setup',
        'Windows performance optimisation',
        'Safe browsing advice',
      ],
    },
    {
      
      id: 'repair',
      icon: 'pi-wrench',
      title: 'PC & Laptop Repair',
      shortDesc: 'Hardware diagnosis and repair for all makes and models.',
      fullDesc:
        'From cracked screens and broken keyboards to motherboard-level repairs, we fix it all. We work on desktops, laptops, gaming rigs, and workstations across all major brands including Dell, HP, Lenovo, ASUS, Acer, and more.',
      features: [
        'Screen replacements',
        'Keyboard & trackpad repairs',
        'Motherboard diagnosis',
        'Power jack & charging port repairs',
        'Fan cleaning & thermal paste replacement',
        'Boot & startup issues',
      ],
    },
    {
      id: 'upgrades',
      icon: 'pi-bolt',
      title: 'Hardware Upgrades',
      shortDesc: 'Give your machine a new lease of life with targeted upgrades.',
      fullDesc:
        'Is your computer feeling sluggish? A RAM or SSD upgrade can make it feel brand new. We advise on the best upgrades for your budget and install everything professionally.',
      features: [
        'RAM upgrades',
        'HDD to SSD migration',
        'GPU installation & driver setup',
        'CPU upgrades & cooling',
        'Power supply replacements',
        'Storage expansion',
      ],
    },
    {
      id: 'tablet-repair',
      icon: 'pi-tablet',
      title: 'Tablet Repair',
      shortDesc: 'Screen, battery, and hardware repairs for all tablet brands.',
      fullDesc:
        'Cracked iPad screen, a sluggish Android tablet, or a charging port giving up? We repair iPads, Samsung Galaxy Tabs, and other popular tablets — getting them back to full working order fast.',
      features: [
        'iPad & Android tablet screen repairs',
        'Battery replacements',
        'Charging port & connector fixes',
        'Home button & Face ID repairs',
        'Software & OS issues',
        'Back glass replacements',
      ],
    },
    {
      id: 'builds',
      icon: 'pi-server',
      title: 'Custom PC Builds',
      shortDesc: 'Bespoke gaming rigs and workstations built to your spec.',
      fullDesc:
        'Whether you want a high-performance gaming PC, a silent home workstation, or a compact HTPC, we spec and build it to your requirements and budget. Every build is stress-tested before delivery.',
      features: [
        'Free component advice & budgeting',
        'Gaming & workstation builds',
        'Compact & silent builds',
        'RGB & custom aesthetics',
        'Full stress-test & OS install',
        'Ongoing support after purchase',
      ],
      badge: 'Custom Spec',
    },
  ];

  openDialog(service: Service): void {
    this.activeService.set(service);
    this.dialogVisible.set(true);
  }
}

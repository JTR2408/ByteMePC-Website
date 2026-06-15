import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TextareaModule, ToastModule],
  providers: [MessageService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private messageService = inject(MessageService);

  name    = signal('');
  phone   = signal('');
  message = signal('');
  sending = signal(false);

  readonly contactDetails = [
    { icon: 'pi-phone',      label: 'Phone',   value: '01234 567890',          href: 'tel:'             },
    { icon: 'pi-envelope',   label: 'Email',   value: 'repairs@bytemcpc.com',  href: 'mailto:repairs@bytemepc.com' },
    { icon: 'pi-map-marker', label: 'Address', value: 'Craghead, DH9 6EB', href: null                          },
    { icon: 'pi-clock',      label: 'Hours',   value: 'Mon–Sat: 9am – 6pm',    href: null                          },
  ];

  async submit(): Promise<void> {
    if (!this.name() || !this.phone() || !this.message()) return;
    this.sending.set(true);
    // TODO: replace with real form endpoint (Formspree, Netlify Forms, etc.)
    await new Promise((r) => setTimeout(r, 800));
    this.sending.set(false);
    this.name.set('');
    this.phone.set('');
    this.message.set('');
    this.messageService.add({
      severity: 'success',
      summary: 'Message sent!',
      detail: "We'll be in touch as soon as possible.",
      life: 5000,
    });
  }
}

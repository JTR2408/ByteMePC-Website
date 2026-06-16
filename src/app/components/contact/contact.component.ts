import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
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
  private http = inject(HttpClient);

  name    = signal('');
  phone   = signal('');
  message = signal('');
  sending = signal(false);

  readonly contactDetails = [
    { icon: 'pi-phone',      label: 'Phone',   value: '07807 174740',         href: 'tel:07807174740'              },
    { icon: 'pi-envelope',   label: 'Email',   value: 'repairs@bytemepc.com', href: 'mailto:repairs@bytemepc.com' },
    { icon: 'pi-map-marker', label: 'Address', value: 'Craghead, DH9 6EB',   href: null                          },
    { icon: 'pi-clock',      label: 'Hours',   value: 'Mon–Sat: 9am – 6pm',   href: null                          },
  ];

  async submit(): Promise<void> {
    if (!this.name() || !this.phone() || !this.message()) return;
    this.sending.set(true);

    try {
      await firstValueFrom(
        this.http.post('/api/contact', {
          name:    this.name(),
          phone:   this.phone(),
          message: this.message(),
        })
      );
      this.name.set('');
      this.phone.set('');
      this.message.set('');
      this.messageService.add({
        severity: 'success',
        summary:  'Message sent!',
        detail:   "We'll be in touch as soon as possible.",
        life:     5000,
      });
    } catch {
      this.messageService.add({
        severity: 'error',
        summary:  'Something went wrong',
        detail:   'Please try calling us directly or try again later.',
        life:     7000,
      });
    } finally {
      this.sending.set(false);
    }
  }
}

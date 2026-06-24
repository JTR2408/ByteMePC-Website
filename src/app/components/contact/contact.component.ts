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
  email   = signal('');
  message = signal('');
  sending = signal(false);

  get hasContact(): boolean {
    return !!(this.phone() || this.email());
  }

  get phoneValid(): boolean {
    if (!this.phone()) return true;
    const digits = this.phone().replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 11 && digits.startsWith('07');
  }

  get emailValid(): boolean {
    if (!this.email()) return true;
    const at = this.email().indexOf('@');
    return at > 0 && at < this.email().length - 1;
  }

  get formValid(): boolean {
    return !!(this.name() && this.hasContact && this.message() && this.phoneValid && this.emailValid);
  }

  readonly contactDetails = [
    { icon: 'pi-phone',      label: 'Phone',   value: '07807 174740',         href: 'tel:07807174740'              },
    { icon: 'pi-envelope',   label: 'Email',   value: 'repairs@bytemepc.com', href: 'mailto:repairs@bytemepc.com' },
    { icon: 'pi-map-marker', label: 'Address', value: 'Craghead, DH9 6EB',   href: 'https://www.google.com/maps/place/BYTE+ME+PC+%2F+SMARTPHONE+REPAIRS+NORTH+EAST/@54.8532784,-1.6639249,162m/data=!3m1!1e3!4m6!3m5!1s0x487e7ed70100db97:0x4db77da3aef1c15e!8m2!3d54.8532934!4d-1.6637798!16s%2Fg%2F11bc96j3b6?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D' },
    { icon: 'pi-clock',      label: 'Hours',   value: 'Mon–Sat: 9am – 6pm',   href: null                          },
  ];

  async submit(): Promise<void> {
    if (!this.formValid) return;
    this.sending.set(true);

    try {
      await firstValueFrom(
        this.http.post('/api/contact', {
          name:    this.name(),
          phone:   this.phone(),
          email:   this.email(),
          message: this.message(),
        })
      );
      this.name.set('');
      this.phone.set('');
      this.email.set('');
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

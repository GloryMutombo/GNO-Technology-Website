import { NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CONTACT_CARDS, SERVICE_OPTIONS } from '../../content/contact.content';

interface ContactResponse {
  readonly ok: boolean;
  readonly errors?: Readonly<Record<string, string>>;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LucideAngularModule, NgOptimizedImage, ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly destroyRef = inject(DestroyRef);
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly startedAt = Date.now();

  protected readonly contactCards = CONTACT_CARDS;
  protected readonly serviceOptions = SERVICE_OPTIONS;
  protected readonly status = signal<FormStatus>('idle');
  protected readonly serverMessage = signal('');
  protected readonly form = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', { nonNullable: true }),
    service: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    website: new FormControl('', { nonNullable: true }),
  });

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const service = params.get('service');
      if (service && this.serviceOptions.some((option) => option.value === service)) {
        this.form.controls.service.setValue(service);
      }
    });
  }

  protected submit(): void {
    if (this.form.invalid || this.status() === 'sending') {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');
    this.serverMessage.set('');
    this.http
      .post<ContactResponse>('/api/contact.php', {
        ...this.form.getRawValue(),
        elapsedMs: Date.now() - this.startedAt,
      })
      .subscribe({
        next: (response) => {
          if (response.ok) {
            this.status.set('success');
          } else {
            this.status.set('error');
            this.serverMessage.set('Please review your details and try again.');
          }
        },
        error: () => {
          this.status.set('error');
          this.serverMessage.set(
            'We could not send your request. Please email info@gnod-tech.co.za.',
          );
        },
      });
  }

  protected showError(controlName: keyof Contact['form']['controls']): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}

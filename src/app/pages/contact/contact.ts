import { NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CONTACT_CARDS, SERVICE_OPTIONS } from '../../content/contact.content';
import { SITE_CONFIG } from '../../core/site.config';

/** FormSubmit's AJAX API returns `success` as a string ("true" / "false"). */
interface FormSubmitResponse {
  readonly success: string | boolean;
  readonly message?: string;
}

/** Bots usually submit instantly; humans need at least a few seconds. */
const MINIMUM_FILL_TIME_MS = 3000;

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

    const { firstName, lastName, email, phone, service, message, website } =
      this.form.getRawValue();

    // Spam: honeypot filled or submitted too fast. Pretend success so bots learn nothing.
    if (website || Date.now() - this.startedAt < MINIMUM_FILL_TIME_MS) {
      this.status.set('success');
      return;
    }

    const serviceLabel =
      this.serviceOptions.find((option) => option.value === service)?.label ?? service;

    this.status.set('sending');
    this.serverMessage.set('');
    this.http
      .post<FormSubmitResponse>(
        SITE_CONFIG.formEndpoint,
        {
          name: `${firstName} ${lastName}`,
          email,
          phone: phone || 'Not provided',
          service: serviceLabel,
          message,
          _subject: `New website quote request: ${serviceLabel}`,
          _replyto: email,
          _template: 'table',
          _captcha: 'false',
          _honey: website,
        },
        { headers: { Accept: 'application/json' } },
      )
      .subscribe({
        next: (response) => {
          if (String(response.success) === 'true') {
            this.status.set('success');
          } else {
            this.status.set('error');
            this.serverMessage.set(
              `We could not send your request. Please email ${SITE_CONFIG.email}.`,
            );
          }
        },
        error: () => {
          this.status.set('error');
          this.serverMessage.set(
            `We could not send your request. Please email ${SITE_CONFIG.email}.`,
          );
        },
      });
  }

  protected showError(controlName: keyof Contact['form']['controls']): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}

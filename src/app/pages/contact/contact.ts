import { NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { from, switchMap } from 'rxjs';
import { Icon } from '../../shared/ui/icon/icon';
import { CONTACT_CARDS, SERVICE_OPTIONS } from '../../content/contact.content';
import { AnalyticsService } from '../../core/analytics.service';
import { RecaptchaService } from '../../core/recaptcha.service';
import { SITE_CONFIG } from '../../core/site.config';

/** Response of public/api/contact.php. */
interface ContactResponse {
  readonly ok: boolean;
  readonly errors?: Readonly<Record<string, string>>;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [Icon, NgOptimizedImage, ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly destroyRef = inject(DestroyRef);
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly analytics = inject(AnalyticsService);
  private readonly recaptcha = inject(RecaptchaService);
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
    // reCAPTCHA loads only on this page (browser only), so its badge shows on /contact only.
    afterNextRender(() => this.recaptcha.activate());
    this.destroyRef.onDestroy(() => this.recaptcha.deactivate());

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

    // The token is created at submit time: the server must assess it within two minutes.
    from(this.recaptcha.token().catch(() => null))
      .pipe(
        switchMap((recaptchaToken) =>
          this.http.post<ContactResponse>(SITE_CONFIG.formEndpoint, {
            ...this.form.getRawValue(),
            elapsedMs: Date.now() - this.startedAt,
            recaptchaToken,
          }),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response) => {
          if (response.ok) {
            this.status.set('success');
            this.analytics.event('generate_lead');
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

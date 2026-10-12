import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SITE_CONFIG } from './site.config';

interface RecaptchaEnterprise {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

type RecaptchaWindow = Window & { grecaptcha?: { enterprise?: RecaptchaEnterprise } };

const SCRIPT_ID = 'gnod-recaptcha';
/** Hides Google's badge on pages other than /contact (the script stays loaded after a visit). */
const BADGE_OFF_CLASS = 'recaptcha-badge-off';

/**
 * Score-based reCAPTCHA for the contact form (AGENTS.md §9). The script is loaded only when
 * the contact page is shown, so the badge appears on /contact only. While the site keys in
 * SITE_CONFIG are empty, nothing loads and no token is sent.
 */
@Injectable({ providedIn: 'root' })
export class RecaptchaService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private loading: Promise<RecaptchaEnterprise | null> | null = null;

  /** The development key on localhost, otherwise the production key; null while empty. */
  private siteKey(): string | null {
    const host = this.document.location?.hostname ?? '';
    const local = host === 'localhost' || host === '127.0.0.1';
    const { productionSiteKey, developmentSiteKey } = SITE_CONFIG.recaptcha;
    return (local ? developmentSiteKey : productionSiteKey) || null;
  }

  /** Loads the script (once) and shows the badge. Call from the contact page's `afterNextRender`. */
  activate(): void {
    this.document.body.classList.remove(BADGE_OFF_CLASS);
    void this.load();
  }

  /** Hides the badge again when the visitor leaves the contact page. */
  deactivate(): void {
    if (this.isBrowser) {
      this.document.body.classList.add(BADGE_OFF_CLASS);
    }
  }

  /** A fresh token for the "contact" action, created at submit time; null when inactive. */
  async token(): Promise<string | null> {
    const siteKey = this.siteKey();
    const recaptcha = siteKey ? await this.load() : null;
    if (!siteKey || !recaptcha) {
      return null;
    }

    await new Promise<void>((resolve) => recaptcha.ready(resolve));
    return recaptcha.execute(siteKey, { action: 'contact' });
  }

  private load(): Promise<RecaptchaEnterprise | null> {
    const siteKey = this.siteKey();
    const view = this.document.defaultView as RecaptchaWindow | null;
    if (!siteKey || !view) {
      return Promise.resolve(null);
    }

    this.loading ??= new Promise((resolve) => {
      const script = this.document.createElement('script');
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(siteKey)}`;
      script.onload = () => resolve(view.grecaptcha?.enterprise ?? null);
      script.onerror = () => {
        this.loading = null;
        resolve(null);
      };
      this.document.head.appendChild(script);
    });
    return this.loading;
  }
}

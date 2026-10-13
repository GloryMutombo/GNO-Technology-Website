import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

type Gtag = (command: 'event', eventName: string, params?: Record<string, string>) => void;

/**
 * Lead events for GA4 (AGENTS.md §8.4). `window.gtag` comes from the snippet in index.html, which
 * only configures GA4 on the live domain, so events go nowhere locally; no-op during prerendering.
 * Page views are counted by GA4's enhanced measurement: never send `page_view` from here.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private listening = false;

  /** Sends a GA4 event when analytics is loaded. */
  event(eventName: string, params?: Record<string, string>): void {
    const gtag = (this.document.defaultView as (Window & { gtag?: Gtag }) | null)?.gtag;
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }

  /** One document-level listener for phone and email links. Call from `afterNextRender`. */
  listenForContactClicks(): void {
    if (this.listening) {
      return;
    }
    this.listening = true;

    this.document.addEventListener('click', (event) => {
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="tel:"], a[href^="mailto:"]')
          : null;

      if (link) {
        const isPhone = link.href.startsWith('tel:');
        this.event(isPhone ? 'phone_click' : 'email_click', { link_url: link.href });
      }
    });
  }
}

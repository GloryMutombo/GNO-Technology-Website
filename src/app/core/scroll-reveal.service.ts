import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ApplicationRef, DestroyRef, inject, Injectable, PLATFORM_ID } from '@angular/core';

/**
 * Blocks that fade up as they scroll into view. Purely progressive: the prerendered
 * HTML is fully visible, and only blocks that start below the fold are hidden (by JS)
 * until they intersect, so there is no flash and nothing is lost without JS.
 */
const REVEAL_SELECTORS = [
  // Home
  '.section-intro',
  '.trust__story',
  '.trust-point',
  '.services__grid > *',
  '.services__action',
  '.tailored__copy',
  '.system-panel',
  '.process__steps > li',
  '.work__grid > *',
  '.work__note',
  '.support__grid > *',
  '.map-card',
  '.presence__copy',
  '.perspectives__intro',
  '.perspectives__grid > *',
  '.faq__intro',
  '.accordion__item',
  '.quote-cta__panel',
  // Inner pages
  '.sub-heading',
  '.about-map',
  '.about-presence__inner > div',
  '.timeline > li',
  '.journey__image',
  '.team__grid > *',
  '.culture-card',
  '.mission__statement',
  '.values > *',
  '.about-cta__inner > *',
  '.lifecycle__grid > *',
  '.engineering__inner > div:first-child',
  '.engineering__values > *',
  '.process-cta__panel',
  '.contact-cards__grid > *',
  '.quote-form',
  '.contact-info > *',
].join(',');

const STAGGER_MS = 70;
const MAX_STAGGER_STEPS = 5;

@Injectable({ providedIn: 'root' })
export class ScrollRevealService {
  private readonly document = inject(DOCUMENT);
  private readonly appRef = inject(ApplicationRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly pending = new Set<HTMLElement>();
  private observer: IntersectionObserver | null = null;
  private scrollFrame = 0;

  private readonly onScroll = (): void => {
    this.scrollFrame ||= requestAnimationFrame(() => {
      this.scrollFrame = 0;
      this.revealPassed();
    });
  };

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.observer?.disconnect();
      this.document.defaultView?.removeEventListener('scroll', this.onScroll);
    });
  }

  /** Scans the page once the routed view (and hydration) has settled. */
  scheduleScan(): void {
    if (this.isBrowser) {
      void this.appRef.whenStable().then(() => requestAnimationFrame(() => this.scan()));
    }
  }

  /** Marks below-the-fold blocks on the current page and reveals them on scroll. */
  private scan(): void {
    const view = this.document.defaultView;

    if (
      !view ||
      !('IntersectionObserver' in view) ||
      view.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    // Blocks from the previous page are gone; forget them.
    this.pending.forEach((element) => {
      if (!element.isConnected) {
        this.observer?.unobserve(element);
        this.pending.delete(element);
      }
    });

    const observer = (this.observer ??= new IntersectionObserver(
      (entries) =>
        this.reveal(
          entries
            .filter((entry) => entry.isIntersecting || entry.boundingClientRect.bottom < 0)
            .map((entry) => entry.target as HTMLElement),
        ),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    ));
    const foldLine = view.innerHeight * 0.92;

    this.document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS).forEach((element) => {
      if (element.classList.contains('reveal') || element.getBoundingClientRect().top < foldLine) {
        return;
      }

      element.classList.add('reveal');
      this.pending.add(element);
      observer.observe(element);
    });

    if (this.pending.size) {
      view.addEventListener('scroll', this.onScroll, { passive: true });
    }
  }

  /** Jumps (anchor links, fast scrolls) can skip a block without it ever intersecting. */
  private revealPassed(): void {
    this.reveal([...this.pending].filter((element) => element.getBoundingClientRect().bottom < 0));
  }

  /** Items that enter together are staggered in document order; late arrivals start at once. */
  private reveal(elements: HTMLElement[]): void {
    elements
      .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
      .forEach((element, index) => {
        const delay = Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS;
        element.style.setProperty('--reveal-delay', `${delay}ms`);
        element.classList.add('reveal--in');
        this.observer?.unobserve(element);
        this.pending.delete(element);
      });

    if (!this.pending.size) {
      this.document.defaultView?.removeEventListener('scroll', this.onScroll);
    }
  }
}

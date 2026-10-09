import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ApplicationRef, DestroyRef, inject, Injectable, PLATFORM_ID } from '@angular/core';

/**
 * Blocks that animate in as they scroll into view, each with an entrance direction.
 * Purely progressive: the prerendered HTML is fully visible, and only blocks that start
 * below the fold are hidden (by JS) until they intersect, so there is no flash and
 * nothing is lost without JS.
 *
 * `cycle` alternates left / up / right by position in the parent (for 3-column grids).
 */
type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'cycle';

const REVEALS: readonly (readonly [selector: string, variant: RevealVariant])[] = [
  // Home
  ['.section-intro--split > :first-child', 'left'],
  ['.section-intro--split > :last-child', 'right'],
  ['.section-intro:not(.section-intro--split)', 'down'],
  ['.trust__story', 'left'],
  ['.trust-point', 'up'],
  ['.services__grid > *', 'zoom'],
  ['.services__action', 'up'],
  ['.tailored__copy', 'left'],
  ['.system-panel', 'right'],
  ['.process__steps > li', 'right'],
  ['.work__grid > *', 'cycle'],
  ['.work__note', 'up'],
  ['.support__grid > *', 'zoom'],
  ['.map-card', 'left'],
  ['.presence__copy', 'right'],
  ['.perspectives__intro', 'down'],
  ['.perspectives__grid > *', 'cycle'],
  ['.faq__intro', 'left'],
  ['.accordion__item', 'right'],
  ['.quote-cta__panel', 'zoom'],
  // Inner pages
  ['.sub-heading', 'down'],
  ['.about-map', 'left'],
  ['.about-presence__inner > div', 'right'],
  ['.timeline > li', 'left'],
  ['.journey__image', 'right'],
  ['.team__grid > *', 'zoom'],
  ['.culture-card', 'zoom'],
  ['.mission__statement:first-child', 'left'],
  ['.mission__statement:nth-child(2)', 'right'],
  ['.values > *', 'cycle'],
  ['.about-cta__inner > :first-child', 'left'],
  ['.about-cta__inner > :last-child', 'right'],
  ['.lifecycle__grid > *', 'zoom'],
  ['.engineering__inner > div:first-child', 'left'],
  ['.engineering__values > *', 'right'],
  ['.process-cta__panel', 'zoom'],
  ['.contact-cards__grid > *', 'cycle'],
  ['.quote-form', 'left'],
  ['.contact-info > *', 'right'],
];

const CYCLE: readonly RevealVariant[] = ['left', 'up', 'right'];

const STAGGER_MS = 120;
const MAX_STAGGER_STEPS = 6;

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

    for (const [selector, variant] of REVEALS) {
      this.document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        if (
          element.classList.contains('reveal') ||
          element.getBoundingClientRect().top < foldLine
        ) {
          return;
        }

        element.dataset['reveal'] =
          variant === 'cycle' ? CYCLE[this.indexInParent(element) % CYCLE.length] : variant;
        element.classList.add('reveal');
        this.pending.add(element);
        observer.observe(element);
      });
    }

    if (this.pending.size) {
      view.addEventListener('scroll', this.onScroll, { passive: true });
    }
  }

  private indexInParent(element: HTMLElement): number {
    return element.parentElement ? [...element.parentElement.children].indexOf(element) : 0;
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

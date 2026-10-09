import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  numberAttribute,
} from '@angular/core';

const DURATION_MS = 2000;

/** True when the element is already showing on screen (in view and not faded out). */
function isOnScreen(element: HTMLElement, view: Window): boolean {
  const rect = element.getBoundingClientRect();
  if (rect.bottom <= 0 || rect.top >= view.innerHeight) {
    return false;
  }

  let opacity = 1;
  for (let node: Element | null = element; node; node = node.parentElement) {
    opacity *= Number(view.getComputedStyle(node).opacity);
  }
  return opacity > 0.05;
}

/**
 * Counts a number up from 0 when it scrolls into view, keeping any prefix/suffix
 * (e.g. "82%", "10+").
 *
 * - Real content (`<strong appCountUp>10+</strong>`): the prerendered text holds the
 *   final value for SEO and no-JS visitors. If the app becomes interactive after the
 *   number is already on screen (slow device), it is left alone, never reset to 0.
 * - Decorative mock-ups (`<strong appCountUp countTo="18">0</strong>`): the HTML shows
 *   0 and always counts up to `countTo`, so a late start can never jump backwards.
 *
 * Reduced-motion users get the final value without animation.
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective {
  /**
   * Delay (ms) before counting, to line up with an entrance animation. Measured from
   * page load for numbers already in view at load, otherwise from when they scroll in.
   */
  readonly delay = input(0, {
    alias: 'appCountUp',
    transform: (value: unknown) => Number(value) || 0,
  });

  /** Target for decorative numbers whose HTML starts at 0. */
  readonly countTo = input(NaN, { transform: (value: unknown) => numberAttribute(value, NaN) });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const element = this.host.nativeElement;
      const view = element.ownerDocument.defaultView;
      const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
      const match = textNode?.nodeValue?.match(/^(\D*)(\d+)(.*)$/s);

      if (!view || !textNode || !match) {
        return;
      }

      const [, prefix, digits, suffix] = match;
      const fromZero = !Number.isNaN(this.countTo());
      const target = fromZero ? this.countTo() : Number(digits);
      const render = (value: number) => (textNode.nodeValue = `${prefix}${value}${suffix}`);

      if (
        !('IntersectionObserver' in view) ||
        view.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        render(target);
        return;
      }

      if (!fromZero && isOnScreen(element, view)) {
        return;
      }

      let frame = 0;
      let timer = 0;
      let firstCheck = true;

      render(0);

      const observer = new IntersectionObserver(
        ([entry]) => {
          const inViewAtLoad = firstCheck;
          firstCheck = false;

          if (!entry?.isIntersecting) {
            return;
          }

          observer.disconnect();
          const elapsed = inViewAtLoad ? view.performance.now() : 0;
          timer = view.setTimeout(
            () => {
              const start = view.performance.now();
              const tick = (now: number) => {
                // rAF timestamps can be slightly earlier than `start`; clamp so it never goes negative.
                const progress = Math.min(Math.max((now - start) / DURATION_MS, 0), 1);
                render(Math.round(target * (1 - Math.pow(1 - progress, 3))));
                frame = progress < 1 ? view.requestAnimationFrame(tick) : 0;
              };
              frame = view.requestAnimationFrame(tick);
            },
            Math.max(0, this.delay() - elapsed),
          );
        },
        { threshold: 0.6 },
      );
      observer.observe(element);

      destroyRef.onDestroy(() => {
        observer.disconnect();
        view.clearTimeout(timer);
        view.cancelAnimationFrame(frame);
      });
    });
  }
}

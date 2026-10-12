import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { Icon } from '../../../../shared/ui/icon/icon';
import { PROCESS_STEPS } from '../../../../content/home.content';

/** How long each process step stays highlighted (keep in sync with --step-duration in _motion.scss). */
const STEP_INTERVAL_MS = 2800;

/** Home › Delivery process with the auto-advancing step highlight. Rendered inside its host `<section>` in home.html. */
@Component({
  selector: 'section[appProcessSection]',
  standalone: true,
  imports: [Icon],
  templateUrl: './process-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessSection {
  protected readonly processSteps = PROCESS_STEPS;
  protected readonly activeStep = signal(0);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private stepTimer = 0;
  private stepsVisible = false;
  private stepsHovered = false;

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Walk through the delivery steps while they are on screen (browser only).
    afterNextRender(() => {
      const view = this.host.nativeElement.ownerDocument.defaultView;
      const steps = this.host.nativeElement.querySelector('.process__steps');

      if (
        !view ||
        !steps ||
        !('IntersectionObserver' in view) ||
        view.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          this.stepsVisible = !!entry?.isIntersecting;
          this.syncStepTimer();
        },
        { threshold: 0.35 },
      );
      observer.observe(steps);

      destroyRef.onDestroy(() => {
        observer.disconnect();
        view.clearInterval(this.stepTimer);
      });
    });
  }

  protected highlightStep(index: number): void {
    this.stepsHovered = true;
    this.activeStep.set(index);
    this.syncStepTimer();
  }

  protected resumeSteps(): void {
    this.stepsHovered = false;
    this.syncStepTimer();
  }

  private syncStepTimer(): void {
    const view = this.host.nativeElement.ownerDocument.defaultView;
    const shouldRun = this.stepsVisible && !this.stepsHovered;

    if (!view || shouldRun === !!this.stepTimer) {
      return;
    }

    if (shouldRun) {
      this.stepTimer = view.setInterval(
        () => this.activeStep.update((step) => (step + 1) % this.processSteps.length),
        STEP_INTERVAL_MS,
      );
    } else {
      view.clearInterval(this.stepTimer);
      this.stepTimer = 0;
    }
  }
}

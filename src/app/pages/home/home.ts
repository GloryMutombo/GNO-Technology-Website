import { NgOptimizedImage } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import {
  CASE_STUDIES,
  FAQS,
  PERSPECTIVES,
  PROCESS_STEPS,
  SERVICES,
  SUPPORT_SERVICES,
} from '../../content/home.content';
import { ButtonDirective } from '../../shared/ui/button/button.directive';
import { CountUpDirective } from '../../shared/ui/count-up/count-up.directive';

/** How long each process step stays highlighted (keep in sync with --step-duration in _motion.scss). */
const STEP_INTERVAL_MS = 2800;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonDirective, CountUpDirective, LucideAngularModule, NgOptimizedImage, RouterLink],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly caseStudies = CASE_STUDIES;
  protected readonly faqs = FAQS;
  protected readonly perspectives = PERSPECTIVES;
  protected readonly processSteps = PROCESS_STEPS;
  protected readonly services = SERVICES;
  protected readonly supportServices = SUPPORT_SERVICES;
  protected readonly openFaq = signal(0);
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

  protected toggleFaq(index: number): void {
    this.openFaq.update((current) => (current === index ? -1 : index));
  }
}

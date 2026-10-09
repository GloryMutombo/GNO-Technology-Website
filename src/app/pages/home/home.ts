import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonDirective, LucideAngularModule, NgOptimizedImage, RouterLink],
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

  protected toggleFaq(index: number): void {
    this.openFaq.update((current) => (current === index ? -1 : index));
  }
}

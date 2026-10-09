import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ENGINEERING_VALUES, LIFECYCLE_STEPS } from '../../content/process.content';
import { ButtonDirective } from '../../shared/ui/button/button.directive';

@Component({
  selector: 'app-our-process',
  standalone: true,
  imports: [ButtonDirective, LucideAngularModule, NgOptimizedImage, RouterLink],
  templateUrl: './our-process.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OurProcess {
  protected readonly engineeringValues = ENGINEERING_VALUES;
  protected readonly lifecycleSteps = LIFECYCLE_STEPS;
}

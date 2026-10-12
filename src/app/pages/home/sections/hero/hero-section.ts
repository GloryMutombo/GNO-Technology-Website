import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/ui/icon/icon';
import { ButtonDirective } from '../../../../shared/ui/button/button.directive';
import { DashboardMockup } from '../../mockups/dashboard/dashboard-mockup';

/** Home › Hero: headline, calls to action and the dashboard visual. Rendered inside its host `<section>` in home.html. */
@Component({
  selector: 'section[appHeroSection]',
  standalone: true,
  imports: [ButtonDirective, DashboardMockup, Icon, RouterLink],
  templateUrl: './hero-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {}

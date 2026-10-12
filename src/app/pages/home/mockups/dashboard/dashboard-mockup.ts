import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../../../shared/ui/icon/icon';
import { CountUpDirective } from '../../../../shared/ui/count-up/count-up.directive';

/** Hero dashboard visual (decorative, aria-hidden on the host). */
@Component({
  selector: 'div[appDashboardMockup]',
  standalone: true,
  imports: [Icon, CountUpDirective],
  templateUrl: './dashboard-mockup.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMockup {}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../../../../shared/ui/icon/icon';
import { CountUpDirective } from '../../../../shared/ui/count-up/count-up.directive';

/** App window visual for the case-study cards (decorative). */
@Component({
  selector: 'div[appAppWindow]',
  standalone: true,
  imports: [Icon, CountUpDirective],
  templateUrl: './app-window.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWindow {
  /** Window title, e.g. "Operations workspace". */
  readonly heading = input.required<string>();
}

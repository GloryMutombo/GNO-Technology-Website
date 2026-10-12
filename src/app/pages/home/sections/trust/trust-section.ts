import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../../../shared/ui/icon/icon';
import { CountUpDirective } from '../../../../shared/ui/count-up/count-up.directive';

/** Home › Experience and reach: the 10+ years tile and three trust points. Rendered inside its host `<section>` in home.html. */
@Component({
  selector: 'section[appTrustSection]',
  standalone: true,
  imports: [CountUpDirective, Icon],
  templateUrl: './trust-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrustSection {}

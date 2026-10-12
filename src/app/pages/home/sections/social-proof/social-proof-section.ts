import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../../../shared/ui/icon/icon';
import { PERSPECTIVES } from '../../../../content/home.content';

/** Home › "What good partnership feels like": representative perspectives. Rendered inside its host `<section>` in home.html. */
@Component({
  selector: 'section[appSocialProofSection]',
  standalone: true,
  imports: [Icon],
  templateUrl: './social-proof-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialProofSection {
  protected readonly perspectives = PERSPECTIVES;
}

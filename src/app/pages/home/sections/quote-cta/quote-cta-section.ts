import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/ui/icon/icon';
import { ButtonDirective } from '../../../../shared/ui/button/button.directive';

/** Home › Closing "Get a free quote" call to action. Rendered inside its host `<section>` in home.html. */
@Component({
  selector: 'section[appQuoteCtaSection]',
  standalone: true,
  imports: [ButtonDirective, Icon, RouterLink],
  templateUrl: './quote-cta-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteCtaSection {}

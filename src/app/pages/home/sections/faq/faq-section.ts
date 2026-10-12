import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/ui/icon/icon';
import { FAQS } from '../../../../content/home.content';
import { ButtonDirective } from '../../../../shared/ui/button/button.directive';

/** Home › Common questions: accessible accordion (first item open). Rendered inside its host `<section>` in home.html. */
@Component({
  selector: 'section[appFaqSection]',
  standalone: true,
  imports: [ButtonDirective, Icon, RouterLink],
  templateUrl: './faq-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqSection {
  protected readonly faqs = FAQS;
  protected readonly openFaq = signal(0);

  protected toggleFaq(index: number): void {
    this.openFaq.update((current) => (current === index ? -1 : index));
  }
}

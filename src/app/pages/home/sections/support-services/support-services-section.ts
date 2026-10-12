import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/ui/icon/icon';
import { SUPPORT_SERVICES } from '../../../../content/home.content';

/** Home › "One partner beyond the product": supporting services. Rendered inside its host `<section>` in home.html. */
@Component({
  selector: 'section[appSupportServicesSection]',
  standalone: true,
  imports: [Icon, RouterLink],
  templateUrl: './support-services-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportServicesSection {
  protected readonly supportServices = SUPPORT_SERVICES;
}

import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/ui/icon/icon';
import { SERVICES } from '../../../../content/home.content';
import { ButtonDirective } from '../../../../shared/ui/button/button.directive';

/** Home › "What we build": the core capability card and service cards. Rendered inside its host `<section>` in home.html. */
@Component({
  selector: 'section[appServicesSection]',
  standalone: true,
  imports: [ButtonDirective, Icon, NgOptimizedImage, RouterLink],
  templateUrl: './services-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSection {
  protected readonly services = SERVICES;
}

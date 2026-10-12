import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/ui/icon/icon';
import { ButtonDirective } from '../../../../shared/ui/button/button.directive';

/** Home › "Here in Gauteng. Ready for anywhere.": map and working principles. Rendered inside its host `<section>` in home.html. */
@Component({
  selector: 'section[appLocalPresenceSection]',
  standalone: true,
  imports: [ButtonDirective, Icon, NgOptimizedImage, RouterLink],
  templateUrl: './local-presence-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalPresenceSection {}

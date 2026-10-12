import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon/icon';
import { JOURNEY, TEAM, VALUES } from '../../content/about.content';
import { ButtonDirective } from '../../shared/ui/button/button.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ButtonDirective, Icon, NgOptimizedImage, RouterLink],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly journey = JOURNEY;
  protected readonly team = TEAM;
  protected readonly values = VALUES;
}

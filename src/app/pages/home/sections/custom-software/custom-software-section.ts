import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/ui/icon/icon';
import { ButtonDirective } from '../../../../shared/ui/button/button.directive';
import { ArchitectureDiagram } from '../../mockups/architecture-diagram/architecture-diagram';

/** Home › "Custom software, properly tailored" with the architecture diagram. Rendered inside its host `<section>` in home.html. */
@Component({
  selector: 'section[appCustomSoftwareSection]',
  standalone: true,
  imports: [ArchitectureDiagram, ButtonDirective, Icon, RouterLink],
  templateUrl: './custom-software-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSoftwareSection {}

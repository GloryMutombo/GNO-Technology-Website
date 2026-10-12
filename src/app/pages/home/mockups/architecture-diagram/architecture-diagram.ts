import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../../../shared/ui/icon/icon';

/** "Your connected business system" diagram in the custom software section (decorative). */
@Component({
  selector: 'div[appArchitectureDiagram]',
  standalone: true,
  imports: [NgOptimizedImage, Icon],
  templateUrl: './architecture-diagram.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureDiagram {}

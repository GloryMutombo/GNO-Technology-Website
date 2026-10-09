import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { SITE_CONFIG } from '../../core/site.config';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBar {
  protected readonly site = SITE_CONFIG;
}

import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon/icon';
import { FOOTER_COLUMNS } from '../../content/site.content';
import { SITE_CONFIG } from '../../core/site.config';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [Icon, NgOptimizedImage, RouterLink],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  protected readonly columns = FOOTER_COLUMNS;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly site = SITE_CONFIG;
}

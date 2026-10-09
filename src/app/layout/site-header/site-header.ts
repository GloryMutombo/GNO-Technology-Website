import { DOCUMENT, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { A11yModule } from '@angular/cdk/a11y';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { filter } from 'rxjs';
import { PRIMARY_NAV_LINKS } from '../../content/site.content';
import { ButtonDirective } from '../../shared/ui/button/button.directive';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [
    A11yModule,
    ButtonDirective,
    LucideAngularModule,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  protected readonly navLinks = PRIMARY_NAV_LINKS;
  protected readonly menuOpen = signal(false);

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
      }
    });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.closeMenu());

    this.destroyRef.onDestroy(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.document.body.style.overflow = '';
      }
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}

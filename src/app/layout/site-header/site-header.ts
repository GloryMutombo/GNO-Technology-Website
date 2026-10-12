import { DOCUMENT, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { A11yModule } from '@angular/cdk/a11y';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../../shared/ui/icon/icon';
import { filter } from 'rxjs';
import { PRIMARY_NAV_LINKS } from '../../content/site.content';
import { ButtonDirective } from '../../shared/ui/button/button.directive';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [A11yModule, ButtonDirective, Icon, NgOptimizedImage, RouterLink, RouterLinkActive],
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
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

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

  /** Esc closes the panel and hands focus back to the button that opened it. */
  protected closeMenuFromKeyboard(): void {
    this.closeMenu();
    this.menuButton()?.nativeElement.focus();
  }
}

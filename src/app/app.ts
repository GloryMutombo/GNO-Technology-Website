import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { SeoService } from './core/seo.service';
import { JsonLdService } from './core/json-ld.service';
import { ScrollRevealService } from './core/scroll-reveal.service';
import type { SeoRouteData } from './core/site.config';
import { SiteFooter } from './layout/site-footer/site-footer';
import { SiteHeader } from './layout/site-header/site-header';
import { TopBar } from './layout/top-bar/top-bar';

@Component({
  imports: [RouterOutlet, SiteFooter, SiteHeader, TopBar],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly jsonLd = inject(JsonLdService);
  private readonly scrollReveal = inject(ScrollRevealService);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.updateSeo(this.router.routerState.snapshot.root, event.urlAfterRedirects);
        this.scrollReveal.scheduleScan();
      });
  }

  private updateSeo(route: ActivatedRouteSnapshot, url: string): void {
    let activeRoute = route;

    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    const title = activeRoute.data['title'];
    const description = activeRoute.data['description'];

    if (typeof title === 'string' && typeof description === 'string') {
      const path = url.split(/[?#]/, 1)[0] || '/';
      const noindex = activeRoute.data['noindex'] === true;
      const canonical = activeRoute.data['canonical'] !== false;
      this.seo.update({ title, description, noindex, canonical } satisfies SeoRouteData, path);
      this.jsonLd.update(path);
    }
  }
}

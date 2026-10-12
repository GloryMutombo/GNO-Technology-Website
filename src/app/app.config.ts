import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

function leafRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  return route.firstChild ? leafRoute(route.firstChild) : route;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withComponentInputBinding(),
      withViewTransitions({
        // Crossfade between pages only; in-page anchor jumps keep the smooth scroll.
        onViewTransitionCreated: ({ transition, from, to }) => {
          if (leafRoute(from).routeConfig === leafRoute(to).routeConfig) {
            transition.skipTransition();
          }
        },
      }),
    ),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
  ],
};

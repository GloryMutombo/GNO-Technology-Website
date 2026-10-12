import { Routes } from '@angular/router';

const descriptions = {
  home: 'GNOD designs, builds and supports custom software, web and mobile apps, cloud, security and managed IT for businesses in Centurion, Pretoria and Johannesburg.',
  about:
    'Meet the team behind GNOD Technologies, a Centurion-based custom software and IT services company helping South African businesses since 2023.',
  process:
    'From discovery to ongoing support: how GNOD plans, designs, builds, tests and launches custom software with you.',
  contact:
    'Request a proposal for custom software or IT services. Call 012 663 3699 or email info@gnod-tech.co.za.',
} as const;

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((component) => component.Home),
    data: {
      title: 'Custom Software & IT Services in Centurion | GNOD',
      description: descriptions.home,
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((component) => component.About),
    data: {
      title: 'About GNOD Technologies | Software & IT Team in Centurion',
      description: descriptions.about,
    },
  },
  {
    path: 'our-process',
    loadComponent: () =>
      import('./pages/our-process/our-process').then((component) => component.OurProcess),
    data: {
      title: 'Our Software Development Process | GNOD Technologies',
      description: descriptions.process,
    },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((component) => component.Contact),
    data: {
      title: 'Get a Free Quote | Contact GNOD Technologies, Centurion',
      description: descriptions.contact,
    },
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy').then((component) => component.Privacy),
    data: {
      title: 'Privacy Policy | GNOD Technologies',
      description: 'Privacy policy placeholder for GNOD Technologies in Centurion, South Africa.',
      // Kept out of search results until the owner supplies the final text (AGENTS.md §8.2).
      noindex: true,
    },
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms').then((component) => component.Terms),
    data: {
      title: 'Terms | GNOD Technologies',
      description: 'Terms and conditions placeholder for the GNOD Technologies website.',
      noindex: true,
    },
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((component) => component.NotFound),
    data: {
      title: 'Page Not Found | GNOD Technologies',
      description: 'The requested page could not be found on the GNOD Technologies website.',
      noindex: true,
      canonical: false,
    },
  },
  { path: '**', redirectTo: '404' },
];

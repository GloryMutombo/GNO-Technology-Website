import { Routes } from '@angular/router';

const descriptions = {
  home: 'Custom software, managed IT, cyber security and cloud services for companies in Centurion, Pretoria, Johannesburg and South Africa. Call 012 663 3699.',
  about:
    'Meet GNOD Technologies: software developers and IT specialists in Centurion, working with companies in Pretoria, Johannesburg and across South Africa.',
  process:
    'From discovery to ongoing support: how GNOD plans, designs, builds, tests and launches custom software with you.',
  contact:
    'Call 012 663 3699 or email info@gnod-tech.co.za. Visit us at 59 Blinkblaar, Zwartkop, Centurion. Free quotes for software and IT projects.',
} as const;

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((component) => component.Home),
    data: {
      title: 'Software Development & IT Services in Centurion | GNOD',
      description: descriptions.home,
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((component) => component.About),
    data: {
      title: 'About GNOD Technologies | IT Company in Centurion',
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
      title: 'Contact GNOD Technologies | Centurion IT Company',
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

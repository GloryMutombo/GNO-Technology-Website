export interface SiteLink {
  readonly label: string;
  readonly routerLink: string;
  readonly fragment?: string;
}

export interface FooterColumn {
  readonly title: string;
  readonly links: readonly SiteLink[];
}

export const PRIMARY_NAV_LINKS: readonly SiteLink[] = [
  { label: 'Services', routerLink: '/', fragment: 'services' },
  { label: 'Custom software', routerLink: '/', fragment: 'custom-software' },
  { label: 'Our process', routerLink: '/our-process' },
  { label: 'Work', routerLink: '/', fragment: 'work' },
  { label: 'About', routerLink: '/about' },
];

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: 'SOFTWARE',
    links: [
      { label: 'Custom development', routerLink: '/', fragment: 'services' },
      { label: 'Web applications', routerLink: '/', fragment: 'services' },
      { label: 'Mobile applications', routerLink: '/', fragment: 'services' },
      { label: 'Systems integration', routerLink: '/', fragment: 'services' },
      { label: 'Software modernisation', routerLink: '/', fragment: 'services' },
    ],
  },
  {
    title: 'IT SERVICES',
    links: [
      { label: 'Managed IT', routerLink: '/', fragment: 'support' },
      { label: 'Security', routerLink: '/', fragment: 'support' },
      { label: 'Cloud', routerLink: '/', fragment: 'support' },
      { label: 'Data & reporting', routerLink: '/', fragment: 'support' },
      { label: 'Consulting', routerLink: '/', fragment: 'support' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'Our process', routerLink: '/our-process' },
      { label: 'Selected work', routerLink: '/', fragment: 'work' },
      { label: 'About GNOD', routerLink: '/about' },
      { label: 'Contact', routerLink: '/contact' },
      { label: 'Get a free quote', routerLink: '/contact', fragment: 'quote' },
    ],
  },
];

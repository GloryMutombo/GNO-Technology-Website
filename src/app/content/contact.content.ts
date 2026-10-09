interface ContactCard {
  readonly icon: 'phone' | 'mail' | 'map-pin' | 'clock';
  readonly title: string;
  readonly value: string;
  readonly note: string;
  readonly href?: string;
}

export const CONTACT_CARDS: readonly ContactCard[] = [
  {
    icon: 'phone',
    title: 'Call Us',
    value: '012 663 3699',
    note: 'Mon-Fri, 08:00 - 17:00',
    href: 'tel:+27126633699',
  },
  {
    icon: 'mail',
    title: 'Email Us',
    value: 'info@gnod-tech.co.za',
    note: 'Average response: 2 hours',
    href: 'mailto:info@gnod-tech.co.za',
  },
  {
    icon: 'map-pin',
    title: 'Visit Our Office',
    value: 'Centurion, ZA',
    note: '59 Blinkblaar, Zwartkop',
  },
  {
    icon: 'clock',
    title: 'Support Hours',
    value: '24/7 Monitoring',
    note: 'For managed service clients',
  },
];

export const SERVICE_OPTIONS = [
  { value: 'custom-software', label: 'Custom software development' },
  { value: 'web-apps', label: 'Web apps' },
  { value: 'mobile-apps', label: 'Mobile apps' },
  { value: 'systems-integration', label: 'Systems integration' },
  { value: 'software-modernisation', label: 'Software modernisation' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'security', label: 'Security' },
  { value: 'managed-it', label: 'Managed IT' },
  { value: 'data-reporting', label: 'Data & reporting' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

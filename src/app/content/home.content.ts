export interface ServiceCardContent {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly service: string;
}

export interface ProcessStepContent {
  readonly number: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

export interface CaseStudyContent {
  readonly visual: 'workspace' | 'phone' | 'reporting';
  readonly tags: readonly string[];
  readonly title: string;
  readonly need: string;
  readonly outcome: string;
}

export interface PerspectiveContent {
  readonly quote: string;
  readonly role: string;
}

export interface FaqContent {
  readonly question: string;
  readonly answer: string;
}

export const SERVICES: readonly ServiceCardContent[] = [
  {
    icon: 'monitor-smartphone',
    title: 'Web apps',
    description: 'Fast, accessible platforms for customers and teams.',
    service: 'web-apps',
  },
  {
    icon: 'smartphone',
    title: 'Mobile apps',
    description: 'Useful native and cross-platform experiences.',
    service: 'mobile-apps',
  },
  {
    icon: 'headphones',
    title: 'Managed IT',
    description: 'Responsive day-to-day support and proactive care.',
    service: 'managed-it',
  },
  {
    icon: 'shield-check',
    title: 'Security',
    description: 'Practical protection across systems and people.',
    service: 'security',
  },
  {
    icon: 'cloud-cog',
    title: 'Cloud',
    description: 'Secure, scalable environments and migrations.',
    service: 'cloud',
  },
  {
    icon: 'database-zap',
    title: 'Data',
    description: 'Dashboards, integrations and trustworthy reporting.',
    service: 'data-reporting',
  },
  {
    icon: 'compass',
    title: 'Consulting',
    description: 'Clear technology direction grounded in business goals.',
    service: 'consulting',
  },
];

export const PROCESS_STEPS: readonly ProcessStepContent[] = [
  {
    number: '01',
    icon: 'search',
    title: 'Discover',
    description: 'We unpack the business challenge, users, constraints and success criteria.',
  },
  {
    number: '02',
    icon: 'pencil-ruler',
    title: 'Shape',
    description:
      'Together we define the smallest valuable release and a clear technical direction.',
  },
  {
    number: '03',
    icon: 'code-xml',
    title: 'Build',
    description:
      'Short, visible delivery cycles keep quality high and decisions close to the work.',
  },
  {
    number: '04',
    icon: 'refresh-cw',
    title: 'Evolve',
    description: 'After launch, we support, measure and improve the product as your needs change.',
  },
];

export const CASE_STUDIES: readonly CaseStudyContent[] = [
  {
    visual: 'workspace',
    tags: ['Operations', 'Web platform'],
    title: 'A shared operations hub for a growing service business',
    need: 'Critical jobs, approvals and documents lived across inboxes and spreadsheets.',
    outcome:
      'One dependable workspace now gives teams a clear view of work, responsibility and next actions.',
  },
  {
    visual: 'phone',
    tags: ['Field teams', 'Mobile app'],
    title: 'A field app that keeps work moving off-site',
    need: 'Remote teams needed simpler job capture, evidence and sign-off while on the road.',
    outcome:
      'A focused mobile workflow reduces repeat admin and keeps office and field information in sync.',
  },
  {
    visual: 'reporting',
    tags: ['Data', 'Decision support'],
    title: 'A reporting layer that turns scattered data into direction',
    need: 'Leadership spent too much time reconciling different operational reports.',
    outcome:
      'A trusted dashboard brings key signals together and makes recurring decisions easier to prepare for.',
  },
];

export const SUPPORT_SERVICES: readonly ServiceCardContent[] = [
  {
    icon: 'headphones',
    title: 'Managed IT',
    description: 'Proactive care, practical helpdesk support and dependable technology operations.',
    service: 'managed-it',
  },
  {
    icon: 'shield-check',
    title: 'Security',
    description: 'Risk-aware protection, secure configuration and habits your team can sustain.',
    service: 'security',
  },
  {
    icon: 'cloud',
    title: 'Cloud',
    description: 'Right-sized cloud architecture, migration and ongoing optimisation.',
    service: 'cloud',
  },
  {
    icon: 'database',
    title: 'Data',
    description: 'Connected information, cleaner reporting and dashboards people can trust.',
    service: 'data-reporting',
  },
  {
    icon: 'compass',
    title: 'Consulting',
    description: 'Clear priorities, roadmaps and technology decisions without the jargon.',
    service: 'consulting',
  },
];

export const PERSPECTIVES: readonly PerspectiveContent[] = [
  {
    quote:
      '“The strongest partner is the one who asks about the operation before suggesting the technology.”',
    role: 'Operations lead • established services business',
  },
  {
    quote:
      '“We value a team that can make a complex system understandable and keep us close to the decisions.”',
    role: 'Product owner • enterprise team',
  },
  {
    quote:
      '“Good support feels personal: the context is remembered, and the next step is always clear.”',
    role: 'Managing director • growing company',
  },
];

export const FAQS: readonly FaqContent[] = [
  {
    question: 'What kinds of custom software do you build?',
    answer:
      'Business platforms, customer and partner portals, workflow tools, integrations, mobile apps, data products and modernised versions of ageing systems. The common thread is a solution tailored to a real operational need.',
  },
  {
    question: 'Can you help if our idea is not fully defined?',
    answer:
      'Yes. Many projects start with a bottleneck, an opportunity or a rough idea. We begin with a short discovery to clarify the goal, the users and the smallest valuable first release.',
  },
  {
    question: 'Do you work with both small businesses and enterprises?',
    answer:
      'Yes. We work with small and growing businesses as well as large enterprises. The approach scales: the same practical process, sized to your team, budget and risk.',
  },
  {
    question: 'Can you improve or replace an existing system?',
    answer:
      'Yes. We can extend, integrate or modernise what you already have, or plan a careful step-by-step replacement that keeps your operations running.',
  },
  {
    question: 'Do you support software after launch?',
    answer:
      'Yes. After launch we support, monitor and keep improving the product as your needs change, with ongoing maintenance and managed IT options.',
  },
  {
    question: 'Do you only work in Centurion?',
    answer:
      'No. We are based in Zwartkop, Centurion and work with clients in Pretoria, Johannesburg, across South Africa and internationally.',
  },
];

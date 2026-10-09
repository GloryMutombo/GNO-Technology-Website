export const LIFECYCLE_STEPS = [
  {
    number: '01',
    icon: 'lightbulb',
    title: 'Discovery & Strategy',
    description:
      'We deep-dive into your business objectives, user needs, and technical constraints to build a robust project foundation.',
    checklist: [
      'Stakeholder Interviews',
      'Requirements Gathering',
      'Feasibility Analysis',
      'Technology Selection',
    ],
  },
  {
    number: '02',
    icon: 'settings-2',
    title: 'Planning & Design',
    description:
      'Our architects and designers translate requirements into high-fidelity prototypes and technical blueprints.',
    checklist: [
      'UI/UX Prototyping',
      'Database Architecture',
      'API Documentation',
      'Sprint Roadmap',
    ],
  },
  {
    number: '03',
    icon: 'code-xml',
    title: 'Agile Development',
    description:
      'Clean, efficient code is written in iterative sprints, ensuring transparency and frequent feedback loops.',
    checklist: [
      'Frontend & Backend Coding',
      'Unit Testing',
      'Continuous Integration',
      'Sprint Reviews',
    ],
  },
  {
    number: '04',
    icon: 'shield-check',
    title: 'Quality Assurance',
    description:
      'Rigorous testing protocols ensure your software is secure, performant, and bug-free before reaching production.',
    checklist: [
      'Regression Testing',
      'Security Audits',
      'Performance Stress Tests',
      'User Acceptance Testing',
    ],
  },
  {
    number: '05',
    icon: 'rocket',
    title: 'Deployment & Launch',
    description:
      'We manage the transition to production environments, ensuring zero downtime and smooth user migration.',
    checklist: [
      'Cloud Infrastructure Setup',
      'Data Migration',
      'Production Deployment',
      'Go-live Support',
    ],
  },
  {
    number: '06',
    icon: 'clipboard-check',
    title: 'Ongoing Support',
    description:
      'Post-launch, we provide proactive maintenance and scale your solution as your business grows.',
    checklist: [
      '24/7 Monitoring',
      'Regular Security Updates',
      'Feature Enhancements',
      'Performance Tuning',
    ],
  },
] as const;

export const ENGINEERING_VALUES = [
  {
    icon: 'zap',
    title: 'Agile Mindset',
    description:
      'We embrace change and prioritize iterative delivery to get your product to market faster without sacrificing quality.',
  },
  {
    icon: 'users-round',
    title: 'User-Centric Design',
    description:
      'Every line of code serves the end-user. We build intuitive interfaces that drive engagement and solve real problems.',
  },
  {
    icon: 'shield-check',
    title: 'Security First',
    description:
      'Data integrity is non-negotiable. We implement enterprise-grade security protocols at every layer of the application.',
  },
] as const;

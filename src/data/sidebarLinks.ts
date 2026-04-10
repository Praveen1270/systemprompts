export interface SidebarLinkCardItem {
  id: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

/**
 * Edit these arrays to change the left / right sidebar cards.
 * Styling uses the site brand palette only (see SidebarLinkCard).
 */
export const leftSidebarCards: SidebarLinkCardItem[] = [
  {
    id: 'featurebot',
    title: 'FeatureBot',
    description: 'Stop guessing what to build. AI-powered feedback with revenue signals.',
    href: 'https://featurebot.io/',
  },
  {
    id: 'requesty',
    title: 'Requesty',
    description: 'Your central AI gateway to support every AI request.',
    href: 'https://requesty.ai/',
  },
  {
    id: 'growsurf',
    title: 'GrowSurf',
    description: '$0/mo affiliate program software for SaaS.',
    href: 'https://growsurf.com/',
  },
  {
    id: 'baremetrics',
    title: 'Baremetrics',
    description: 'Subscription metrics made simple. Beautiful dashboards and insights.',
    href: 'https://baremetrics.com/',
  },
  {
    id: 'postopus',
    title: 'Postopus',
    description: 'Post everywhere, all at once. Become a Founding Tentacle.',
    href: 'https://postopus.com/',
  },
];

export const rightSidebarCards: SidebarLinkCardItem[] = [
  {
    id: 'newsletters-ai',
    title: 'Newsletters.ai',
    description: 'Weekly AI catch-up for lazy readers.',
    href: 'https://newsletters.ai/',
  },
  {
    id: 'startupsubmit',
    title: 'StartupSubmit',
    description: 'Get your startup listed on 300+ directories to boost traffic.',
    href: 'https://startupsubmit.co/',
  },
  {
    id: 'rankloop',
    title: 'RankLoop',
    description: 'Stop begging for backlinks.',
    href: 'https://rankloop.com/',
  },
  {
    id: 'waitforit',
    title: 'WaitForIt',
    description: 'Build a waitlist for your idea in minutes.',
    href: 'https://waitforit.me/',
  },
  {
    id: 'admn',
    title: 'ADMN',
    description: '10x Linux server administration.',
    href: 'https://admn.app/',
  },
];

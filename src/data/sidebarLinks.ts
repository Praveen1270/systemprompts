export type SidebarLinkCardTone =
  | 'cyan'
  | 'lavender'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'yellow'
  | 'slate'
  | 'gray';

export interface SidebarLinkCardItem {
  id: string;
  title: string;
  description: string;
  href: string;
  tone: SidebarLinkCardTone;
  badge?: string;
}

/**
 * Edit these arrays to change the left / right sidebar cards.
 * These are intended to be "ads / other tools" like the reference screenshot.
 */
export const leftSidebarCards: SidebarLinkCardItem[] = [
  {
    id: 'featurebot',
    title: 'FeatureBot',
    description: 'Stop guessing what to build. AI-powered feedback with revenue signals.',
    href: 'https://featurebot.io/',
    tone: 'cyan',
  },
  {
    id: 'requesty',
    title: 'Requesty',
    description: 'Your central AI gateway to support every AI request.',
    href: 'https://requesty.ai/',
    tone: 'lavender',
  },
  {
    id: 'growsurf',
    title: 'GrowSurf',
    description: '$0/mo affiliate program software for SaaS.',
    href: 'https://growsurf.com/',
    tone: 'blue',
  },
  {
    id: 'baremetrics',
    title: 'Baremetrics',
    description: 'Subscription metrics made simple. Beautiful dashboards and insights.',
    href: 'https://baremetrics.com/',
    tone: 'purple',
  },
  {
    id: 'postopus',
    title: 'Postopus',
    description: 'Post everywhere, all at once. Become a Founding Tentacle.',
    href: 'https://postopus.com/',
    tone: 'pink',
  },
];

export const rightSidebarCards: SidebarLinkCardItem[] = [
  {
    id: 'newsletters-ai',
    title: 'Newsletters.ai',
    description: 'Weekly AI catch-up for lazy readers.',
    href: 'https://newsletters.ai/',
    tone: 'yellow',
  },
  {
    id: 'startupsubmit',
    title: 'StartupSubmit',
    description: 'Get your startup listed on 300+ directories to boost traffic.',
    href: 'https://startupsubmit.co/',
    tone: 'lavender',
  },
  {
    id: 'rankloop',
    title: 'RankLoop',
    description: 'Stop begging for backlinks.',
    href: 'https://rankloop.com/',
    tone: 'slate',
  },
  {
    id: 'waitforit',
    title: 'WaitForIt',
    description: 'Build a waitlist for your idea in minutes.',
    href: 'https://waitforit.me/',
    tone: 'gray',
  },
  {
    id: 'admn',
    title: 'ADMN',
    description: '10x Linux server administration.',
    href: 'https://admn.app/',
    tone: 'blue',
  },
];



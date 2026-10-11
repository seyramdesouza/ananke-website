export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const INTERSTICE = '/projects/publications/interstice/';

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Projects',
    href: '/projects/',
    children: [
      { label: 'Publications', href: '/projects/publications/' },
      { label: 'Exhibitions', href: '/projects/exhibitions/' },
      { label: 'Research', href: '/projects/research/' },
      { label: 'Community Projects', href: '/projects/community/' },
    ],
  },
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'About Ananke', href: '/about/' },
      { label: 'Founder', href: '/about/founder/' },
      { label: 'Approach', href: '/about/approach/' },
    ],
  },
  { label: 'Contact', href: '/contact/' },
];

export const intersticeNav: NavItem[] = [
  { label: 'Interstice', href: INTERSTICE },
  { label: 'Issues', href: `${INTERSTICE}issues/` },
  { label: 'Contributors', href: `${INTERSTICE}contributors/` },
  { label: 'Editorial Team', href: `${INTERSTICE}editorial-team/` },
  { label: 'Submit', href: '/projects/publications/submissions/' },
];

/** Normalise a path so "/about" and "/about/" compare equal. */
export function normalise(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

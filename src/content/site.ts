import type { SiteContent } from '../lib/content-schema';

// Edit text here. Layout, colors, and animations stay in the page components.
export const site = {
  name: 'Vihaan Dutta',
  authorName: 'Vihaan Dutta',
  tagline: 'B.S.E. in Computer Science & Robotics',
  subtitle: 'Double Major',
  pageTitle: 'Vihaan Dutta - Portfolio',
  description: 'Personal portfolio showcasing my projects and experience',
  sections: {
    projects: { label: 'Selected work', title: 'Projects' },
    contributions: { label: 'Open Source', title: 'Contributions' },
    publications: { label: 'Research', title: 'Publications' },
    education: { label: 'Academic background', title: 'Education' },
  },
  education: {
    school: 'University of Michigan',
    logo: '/umich-logo.svg',
    degrees: ['B.S.E. in Computer Science', 'B.S.E. in Robotics'],
    courseworkLabel: 'Relevant Coursework',
    courses: [
      'Data Structures and Algorithms',
      'Operating Systems',
      'Localization, Mapping, and Navigation (SLAM)',
      'Software Engineering',
    ],
  },
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/vihdutta' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/vihdutta' },
  ],
  footer: {
    copyright: 'All rights reserved.',
    credits: ['Built with React & TypeScript', 'Deployed on GitHub Pages'],
  },
} satisfies SiteContent;

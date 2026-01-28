interface TeamMember {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  image?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    name: 'PDF Tools Team',
    role: 'Development Team',
    bio: 'A passionate team of developers dedicated to making PDF processing accessible to everyone. We believe in privacy, security, and open-source software.',
    expertise: ['Web Development', 'PDF Processing', 'User Experience', 'Security'],
  },
];

export const organizationInfo = {
  name: 'PDF Tools',
  url: 'https://combinepdffree.net',
  logo: 'https://combinepdffree.net/logo.png',
  description: 'Free online PDF tools for everyone. Merge, split, compress, and process PDF files directly in your browser.',
  founded: '2024',
  founders: 'PDF Tools Team',
  sameAs: [
    'https://github.com/pdftools',
  ],
};

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organizationInfo.name,
    "url": organizationInfo.url,
    "logo": organizationInfo.logo,
    "description": organizationInfo.description,
    "foundingDate": organizationInfo.founded,
    "founders": [
      {
        "@type": "Person",
        "name": organizationInfo.founders,
      }
    ],
    "sameAs": organizationInfo.sameAs,
  };
}

export function getPersonSchema(member: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "jobTitle": member.role,
    "description": member.bio,
    "knowsAbout": member.expertise,
    ...(member.social?.github && {
      "sameAs": [`https://github.com/${member.social.github}`],
    }),
  };
}

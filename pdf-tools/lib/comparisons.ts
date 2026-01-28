interface ToolComparison {
  id: string;
  title: string;
  description: string;
  features: {
    ourTool: string[];
    competitors: string[];
  };
  pricing: {
    ourTool: string;
    competitors: string[];
  };
  security: {
    ourTool: string;
    competitors: string[];
  };
}

export const comparisons: ToolComparison[] = [
  {
    id: 'online-vs-desktop',
    title: 'Online PDF Tools vs Desktop Software',
    description: 'Compare web-based PDF processing with traditional desktop applications.',
    features: {
      ourTool: [
        'No installation required',
        'Works on any device',
        'Automatic updates',
        'Cross-platform compatibility',
        'Cloud-free processing',
      ],
      competitors: [
        'Requires download and installation',
        'Platform-specific (Windows/Mac)',
        'Manual updates needed',
        'Takes up storage space',
        'Possible compatibility issues',
      ],
    },
    pricing: {
      ourTool: '100% Free - No hidden costs or subscriptions',
      competitors: ['One-time purchase ($50-$500)', 'Subscription models ($10-$50/month)', 'Free trials with limitations'],
    },
    security: {
      ourTool: 'Local browser processing - files never leave your device',
      competitors: ['Files may be uploaded to servers', 'Privacy concerns with cloud processing', 'Dependent on vendor security practices'],
    },
  },
  {
    id: 'pdf-vs-word',
    title: 'PDF vs Word Document Format',
    description: 'When to use PDF versus Word documents for your projects.',
    features: {
      ourTool: [
        'Universal compatibility',
        'Preserves formatting',
        'Professional appearance',
        'Print-ready quality',
        'Security features available',
      ],
      competitors: [
        'Easy to edit and modify',
        'Collaboration features',
        'Track changes',
        'Template flexibility',
        'Better for drafts',
      ],
    },
    pricing: {
      ourTool: 'Free PDF tools included',
      competitors: ['Microsoft Word subscription ($6.99/month)', 'One-time purchase options available'],
    },
    security: {
      ourTool: 'Password protection and encryption available',
      competitors: ['Password protection available', 'Editing may expose tracked changes'],
    },
  },
];

export function getComparison(id: string): ToolComparison | undefined {
  return comparisons.find(c => c.id === id);
}

export function getAllComparisons(): ToolComparison[] {
  return comparisons;
}

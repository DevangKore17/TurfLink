export const settingsGroups = [
  {
    title: 'MY ACCOUNT',
    items: [
      { id: 'account-info', label: 'Account Information', type: 'link' },
      { id: 'match-prefs', label: 'Match Preferences', type: 'link' },
      { id: 'subscriptions', label: 'Manage Subscriptions', type: 'link' },
      { id: 'payments', label: 'Payment Methods', type: 'link' },
    ],
  },
  {
    title: 'APP SETTINGS',
    items: [
      { id: 'notifications', label: 'Notifications', type: 'toggle', enabled: true },
      { id: 'location', label: 'Location', type: 'link', value: 'Chennai' },
      { id: 'appearance', label: 'Dark Mode', type: 'toggle', enabled: false },
    ],
  },
  {
    title: 'LEGAL',
    items: [
      { id: 'terms', label: 'Terms & Privacy', type: 'link' },
      { id: 'help', label: 'Help & Support', type: 'link' },
    ],
  },
]

export type LocalAreaStatus = 'candidate' | 'confirmed';

export type LocalArea = {
  slug: string;
  name: string;
  status: LocalAreaStatus;
  evidence: string[];
  publish: boolean;
};

// Candidate areas stay out of the sitemap until service relevance is confirmed.
export const localAreas: LocalArea[] = [
  { slug: 'vimercate', name: 'Vimercate', status: 'candidate', evidence: ['Curriculum: attività didattiche svolte presso scuole elementari di Vimercate.'], publish: false },
  { slug: 'monza-brianza', name: 'Monza e Brianza', status: 'candidate', evidence: ['ABBO APS e Digital Heroes sono descritti come attività attive in Brianza.'], publish: false },
  { slug: 'mezzago', name: 'Mezzago', status: 'candidate', evidence: [], publish: false },
  { slug: 'merate', name: 'Merate', status: 'candidate', evidence: [], publish: false },
];

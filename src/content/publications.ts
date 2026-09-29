import type { Publication } from '../lib/content-schema';

export const publications = [
  {
    title:
      'Autonomous Vehicle Collision Avoidance With Racing Parameterized Deep Reinforcement Learning',
    venue: 'MECC 2026',
    author: 'Second Author',
    authors: ['Shathushan Sivashangaran', 'Vihaan Dutta', 'Apoorva Khairnar', 'Sepideh Gohari', 'Azim Eskandarian'],
    arxivId: '2604.16702',
    url: 'https://arxiv.org/abs/2604.16702',
  },
  {
    title:
      'Physics-Informed Reinforcement Learning of Spatial Density Velocity Potentials for Map-Free Racing',
    venue: 'Robotics and Autonomous Systems',
    author: null,
    authors: ['Shathushan Sivashangaran', 'Apoorva Khairnar', 'Sepideh Gohari', 'Vihaan Dutta', 'Azim Eskandarian'],
    arxivId: '2604.09499',
    url: 'https://arxiv.org/abs/2604.09499',
  },
] satisfies Publication[];

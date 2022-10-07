export const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO',
    },
    content: [
      { type: 'paragraph', content: 'Fala ae guys!', },
      { type: 'paragraph', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc libero odio, ullamcorper ac enim semper, aliquet sodales tortor. Aliquam ac risus sit amet urna cursus posuere. Vivamus fringilla fringilla feugiat.'},      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-09-26 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/brunomestanza.png',
      name: 'Bruno Mestanza',
      role: 'Software Enginner',
    },
    content: [
      { type: 'paragraph', content: 'Fala ae guys!', },
      { type: 'paragraph', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc libero odio, ullamcorper ac enim semper, aliquet sodales tortor. Aliquam ac risus sit amet urna cursus posuere. Vivamus fringilla fringilla feugiat.'},      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-05-10 20:00:00'),
  },
];

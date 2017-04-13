// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Videos } from '../../api/videos/videos.js';

Meteor.startup(() => {
  // if the Links collection is empty
  if (Videos.find().count() === 0) {
    const data = [
      {
        title: 'Main',
        url: 'http://zavodmedia.com/assets/show-f544c88ec3a3618d8c235825112d3493.mp4',
        group: 'main',
        createdAt: new Date(),
      },
      {
        title: 'Короткометражный комедийно-корпоративный фильм, снятый по заказу Лаборатории Касперского, о борьбе с кибер-преступниками.',
        url: 'https://www.youtube.com/embed/WsxE3LIbt04',
        group: 'movies',
        createdAt: new Date(),
      },
      {
        title: 'HOTWHEELS A.I. Будущее гонок уже наступило!',
        url: 'https://www.youtube.com/embed/dmQX4N-l-Vg',
        group: 'ads',
        createdAt: new Date(),
      },
      {
        title: '"ПОСЛЕДНИЕ ИЗ...": АВТОМОБИЛЬ. Герои программы вспомнили, как копили деньги на первую машину, как продавали родину за гараж, как гордились советским автопромом, ставили капканы на воров и делились секретами тюнинга своими руками. Режиссёр Владимир Сумашедов. Производство ЕМГ для телеканала "Москва Доверие".',
        url: 'https://www.youtube.com/embed/bN4GDN494vw',
        group: 'tv',
        createdAt: new Date(),
      },
      {
        title: 'END THE CIRCLE - музыкальный видео-арт',
        url: 'https://www.youtube.com/embed/TTGYAN6ascw',
        group: 'clips',
        createdAt: new Date(),
      },
      {
        title: 'УАЗ ПАТРИОТ',
        url: 'https://www.youtube.com/embed/E9YentbYVWc',
        group: 'backstages',
        createdAt: new Date(),
      },
      {
        title: 'Сценарий видео-ролика, информирующий геймеров о необходимости использования антивирусного программного обеспечения.',
        url: 'https://www.youtube.com/embed/S4Eh85rdTcI',
        group: 'creative',
        createdAt: new Date(),
      },
      {
        title: 'МОСКВА С ВЫСОТЫ ПТИЧЬЕГО ПОЛЕТА',
        url: 'https://www.youtube.com/embed/QS4QGOmyySc',
        group: 'aero',
        createdAt: new Date(),
      }
    ];

    data.forEach(video => Videos.insert(video));
  }
});

// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Videos } from '../../api/videos/videos.js';

Meteor.startup(() => {
  // Set the mail SMTP variable
  process.env.MAIL_URL = "smtp://postmaster%40sandboxe25f63c8067f4f5fb093a393818f5919.mailgun.org:80141f9897f2ee0402301b30ea8d2ab3@smtp.mailgun.org:587";
  // Add initial Admin users
  if (Meteor.users.find().count() < 1) {
    Accounts.createUser({username: 'Admin', password: '~}!5Khk&'});
    Accounts.createUser({username: 'Admin0', password: '&r!S89mB'});
  }
  // if the Links collection is empty
  if (Videos.find().count() === 0) {
    const data = [
      {
        title: 'Showreel',
        url: 'https://www.youtube.com/embed/m-9pXxWvlBY',
        groups: ['showreel'],
        createdAt: new Date(),
      },
      {
        title: 'Короткометражный комедийно-корпоративный фильм, снятый по заказу Лаборатории Касперского, о борьбе с кибер-преступниками.',
        url: 'https://www.youtube.com/embed/WsxE3LIbt04',
        groups: ['movies', 'creative'],
        createdAt: new Date(),
      },
      {
        title: 'HOTWHEELS A.I. Будущее гонок уже наступило!',
        url: 'https://www.youtube.com/embed/dmQX4N-l-Vg',
        groups: ['ads'],
        createdAt: new Date(),
      },
      {
        title: '"ПОСЛЕДНИЕ ИЗ...": АВТОМОБИЛЬ. Герои программы вспомнили, как копили деньги на первую машину, как продавали родину за гараж, как гордились советским автопромом, ставили капканы на воров и делились секретами тюнинга своими руками. Режиссёр Владимир Сумашедов. Производство ЕМГ для телеканала "Москва Доверие".',
        url: 'https://www.youtube.com/embed/bN4GDN494vw',
        groups: ['tv'],
        createdAt: new Date(),
      },
      {
        title: 'END THE CIRCLE - музыкальный видео-арт',
        url: 'https://www.youtube.com/embed/TTGYAN6ascw',
        groups: ['clips'],
        createdAt: new Date(),
      },
      {
        title: 'УАЗ ПАТРИОТ',
        url: 'https://www.youtube.com/embed/E9YentbYVWc',
        groups: ['backstages'],
        createdAt: new Date(),
      },
      {
        title: 'Сценарий видео-ролика, информирующий геймеров о необходимости использования антивирусного программного обеспечения.',
        url: 'https://www.youtube.com/embed/S4Eh85rdTcI',
        groups: ['creative'],
        createdAt: new Date(),
      },
      {
        title: 'МОСКВА С ВЫСОТЫ ПТИЧЬЕГО ПОЛЕТА',
        url: 'https://www.youtube.com/embed/QS4QGOmyySc',
        groups: ['aero'],
        createdAt: new Date(),
      }
    ];

    data.forEach(video => Videos.insert(video));
  }
});

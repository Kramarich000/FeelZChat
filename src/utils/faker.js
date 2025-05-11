import { faker } from "@faker-js/faker";

export const generateFakeComments = (count = 5) => {
  return Array.from({ length: count }).map(() => {
    faker.locale = localStorage.getItem("i18nextLng") === "ru" ? "ru" : "en";

    const russianPhrases = [
      "Отличный мессенджер: быстрый и удобный в использовании!",
      "Очень нравится функция групповых чатов и стикеров.",
      "Интерфейс лаконичный, всё понятно с первого взгляда.",
      "Надёжное шифрование и нет задержек в доставке сообщений.",
      "Очень удобно пересылать файлы и картинки прямо в чате.",
      "Уведомления приходят мгновенно, не пропускаю ни одно сообщение.",
      "Люблю тёмную тему и возможность гибко настроить звук уведомлений.",
      "Стикеры и смайлы поднимают настроение, рекомендую друзьям.",
      "Бета-функции появляются часто, разработчики прислушиваются к отзывам.",
      "Поддержка работает быстро и решает проблемы в течение часа.",
    ];
    const englishPhrases = [
      "Great messenger: fast and easy to use!",
      "I really like the group chat and sticker features.",
      "The interface is sleek, everything is clear at first glance.",
      "Reliable encryption and no message delivery delays.",
      "It's very convenient to forward files and pictures directly in the chat.",
      "Notifications arrive instantly, I never miss a message.",
      "I love the dark theme and the ability to customize notification sounds.",
      "Stickers and emojis brighten up my mood, I recommend it to friends.",
      "Beta features appear frequently, the developers listen to feedback.",
      "Support responds quickly and resolves issues within an hour.",
    ];

    const seed = faker.string.alphanumeric(10);
    const avatar = `http://picsum.photos/seed/${seed}/250/250`;

    const phrases = faker.locale === "ru" ? russianPhrases : englishPhrases;

    const rawDate = faker.date.past();
    const options = { day: "2-digit", month: "long", year: "numeric" };
    let formattedDate = rawDate
      .toLocaleDateString(faker.locale === "ru" ? "ru-RU" : "en-US", options)
      .replace(/,/g, "");
    return {
      name: faker.person.fullName(),
      avatar: avatar,
      rating: faker.number.int({ min: 3, max: 5 }),
      text: faker.helpers.arrayElement(phrases),
      date: formattedDate,
    };
  });
};

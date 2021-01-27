import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const fetchMeetups = () =>
  fetch('./api/meetups.json').then((res) => res.json());

export const app = new Vue({
  el: '#app',
  data() {
    return {
      rawMeetups: null,
      timetableDefault: [
        {
          type: 'organisation',
          name: 'Регистрация',
          iconId: 'key',
        },
        {
          type: 'organisation',
          name: 'Открытие',
          iconId: 'cal-sm',
        },
        {
          type: 'talk',
          name: 'Выступленя',
          iconId: 'list',
          talk: true,
        },
        {
          type: 'organisation',
          name: 'Перерыв',
          iconId: 'clock',
        },
        {
          type: 'talk',
          name: 'Выступленя',
          iconId: 'list',
          talk: true,
        },
        {
          type: 'organisation',
          name: 'Coffee Break',
          iconId: 'coffee',
        },
        {
          type: 'talk',
          name: 'Выступленя',
          iconId: 'list',
          talk: true,
        },
        {
          type: 'organisation',
          name: 'Закрытие',
          iconId: 'key',
        },
        {
          type: 'organisation',
          name: 'Afterparty',
          iconId: 'cal-sm',
        },
      ],
    };
  },

  mounted() {
    // Требуется получить данные митапа с API
    fetchMeetups().then((meetups) => {
      this.rawMeetups = meetups;
    });
  },

  computed: {
    meetups() {
      if (!this.rawMeetups) {
        return null;
      }

      return this.rawMeetups.map((meetup) => ({
        ...meetup,
        date: new Date(meetup.date),
        cover: meetup.imageId
          ? `url(https://course-vue.javascript.ru/api/images/${meetup.imageId}`
          : null,
        coverStyle: meetup.imageId
          ? {
              '--bg-url': `url(https://course-vue.javascript.ru/api/images/${meetup.imageId}`,
            }
          : undefined,
        iconUrl: '',
        localDate: new Date(meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        dateOnlyString: new Date(meetup.date).toISOString().split('T')[0],
      }));
    },
  },

  methods: {
    // Получение данных с API предпочтительнее оформить отдельным методом,
    // а не писать прямо в mounted()
    formatData(date) {
      return new Date(date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
});
app.$mount('#app');

window.app = app;

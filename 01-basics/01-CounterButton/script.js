import Vue from './vue.esm.browser.js';

// const app = ...
// Рекомендуется использовать МЕТОД в качестве обработчика события

const app = new Vue({
  template: `#app`,
  data() {
    return {
      counter: 0,
    };
  },
});

app.$mount('#app');

window.app = app;

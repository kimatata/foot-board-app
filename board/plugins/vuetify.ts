import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import colors from 'vuetify/util/colors';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: colors.green.accent3,
            secondary: colors.amber.accent1,
            // primary: // '#16C47F',
            // secondary: // '#FFD65A',
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});

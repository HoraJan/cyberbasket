import { createInstance } from 'i18next';
import { initReactI18next, WithTranslation } from 'react-i18next';
import ICU from 'i18next-icu';
import cz from '../translations/cz';

const resources = {
  cs: {
    cyberbasket: {
      ...cz,
    },
  },
  // en: {
  //   cyberbasket: {
  //     ...cz,
  //   },
  // },
};

const i18n = createInstance({
  lng: 'cs',
  ns: ['cyberbasket'],
  defaultNS: 'cyberbasket',
  resources,
  fallbackLng: 'cs',
});

i18n
  .use(initReactI18next)
  .use(ICU)
  .init();

export default i18n;

export type TranslationFunction<T extends 'cyberbasket'> = WithTranslation<T>['t'];

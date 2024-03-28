import cyberbasket from './translations/cz';
import 'i18next';

export type CyberbasketTranslations = typeof cyberbasket;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'cyberbasket';
    resources: {
      cyberbasket: CyberbasketTranslations;
    }
  }
}

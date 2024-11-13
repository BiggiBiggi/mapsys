// in src/i18nProvider.js
import polyglotI18nProvider from "ra-i18n-polyglot";
import fr from "ra-language-french";
import simpleRestProvider from "ra-data-simple-rest";

const translations = { fr };

export const i18nProvider = polyglotI18nProvider(
  (locale) => translations[locale],
  "fr" // default locale
);

export const dataProvider = simpleRestProvider("http://localhost:5000/api");

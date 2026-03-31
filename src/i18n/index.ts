import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home_title_1: "Search",
      home_title_2: "d_evs",
      search_placeholder: "Search",
      search_button: "Search",
      user_not_found: "There are no users with this name",
    },
  },
  pt: {
    translation: {
      home_title_1: "Buscar",
      home_title_2: "d_evs",
      search_placeholder: "Buscar",
      search_button: "Buscar",
      user_not_found: "Não há usuários com esse nome",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
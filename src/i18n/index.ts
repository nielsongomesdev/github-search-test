import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Home & Header
      home_title_1: "Search",
      home_title_2: "d_evs",
      search_placeholder: "Search",
      search_button: "Search",
      user_not_found: "There are no users with this name",

      // Profile Page
      followers: "followers",
      following: "following",
      contact: "Contact",
      website: "Website",
      twitter: "Twitter",
      repositories: "Repositories",
      sort_updated: "Last Updated",
      sort_created: "Creation Date",
      sort_pushed: "Last Push",
      sort_alphabetical: "Alphabetical",
      updated_on: "Updated on",
      end_of_list: "End of repositories",
    },
  },
  pt: {
    translation: {
      // Home & Header
      home_title_1: "Buscar",
      home_title_2: "d_evs",
      search_placeholder: "Buscar",
      search_button: "Buscar",
      user_not_found: "Não há usuários com esse nome",

      // Profile Page
      followers: "seguidores",
      following: "seguindo",
      contact: "Contato",
      website: "Site",
      twitter: "Twitter",
      repositories: "Repositórios",
      sort_updated: "Última Atualização",
      sort_created: "Data de Criação",
      sort_pushed: "Último Push",
      sort_alphabetical: "Ordem Alfabética",
      updated_on: "Atualizado em",
      end_of_list: "Fim dos repositórios",
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

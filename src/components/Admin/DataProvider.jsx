// in src/i18nProvider.js
import polyglotI18nProvider from "ra-i18n-polyglot";
import fr from "ra-language-french";
import { fetchUtils } from "react-admin";

const translations = { fr };

export const i18nProvider = polyglotI18nProvider(
  (locale) => translations[locale],
  "fr" // default locale
);

const apiUrl = "http://localhost:5000/api";
const httpClient = fetchUtils.fetchJson;

export const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      if (!headers.has("content-range")) {
        throw new Error(
          "The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?"
        );
      }
      return {
        data: json.map((resource) => ({
          ...resource,
          id: resource.id || resource.ID,
        })),
        total: parseInt(headers.get("content-range").split("/").pop(), 10),
      };
    });
  },

  // Ajoutez ici les autres méthodes (getOne, update, create, delete, etc.)
};

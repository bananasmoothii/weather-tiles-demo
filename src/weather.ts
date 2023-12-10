import OpenWeatherMap from "openweathermap-ts";
import type { Language } from "openweathermap-ts/dist/types";

export const api = new OpenWeatherMap({
  // I know it is bad to put the API key in the code that will be sent to clients, but this key is free and I have no
  // server to hide it in
  apiKey: "dae9b75aa4ca07bb8e00650e76922f16",
  units: "metric",
});

api.setUnits("metric");

const availableLanguages: Language[] = [
  "af",
  "al",
  "ar",
  "az",
  "bg",
  "ca",
  "cz",
  "da",
  "de",
  "el",
  "en",
  "eu",
  "fa",
  "fi",
  "fr",
  "gl",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "kr",
  "la",
  "lt",
  "mk",
  "no",
  "nl",
  "pl",
  "pt",
  "pt_br",
  "ro",
  "ru",
  "sv",
  "se",
  "sk",
  "sl",
  "sp",
  "es",
  "sr",
  "th",
  "tr",
  "ua",
  "uk",
  "vi",
  "zh_cn",
  "zh_tw",
  "zu",
];

const fallbackLanguage: Language = "en";

let navLangs = navigator.languages.map((l) => l.toLowerCase());

// using a function to be able to use return and break from both loops
(function () {
  for (let lang of navLangs) {
    for (let availableLang of availableLanguages) {
      if (lang.includes(availableLang)) {
        api.setLanguage(availableLang);
        console.log("Weather api language set to " + availableLang);
        return;
      }
    }
  }
  api.setLanguage(fallbackLanguage);
})();

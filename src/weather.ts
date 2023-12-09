import OpenWeatherMap from "openweathermap-ts";

export const api = new OpenWeatherMap({
  // I know it is bad to put the API key in the code that will be sent to clients, but this key is free and I have no
  // server to hide it in
  apiKey: "dae9b75aa4ca07bb8e00650e76922f16",
  language: "fr",
  units: "metric",
});

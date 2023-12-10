import { reactive, watch } from "vue";

export type City = {
  name: string;
  randomId: number;
  localized?: string;
};

let defaultCities: City[] = [
  "Paris",
  "Grenoble",
  "Vienna",
  "Hamburg",
  "Berlin",
  "London",
  "New York",
  "Tokyo",
  "Moscow",
  "Copenhagen",
  "Stockholm",
  "Amsterdam",
  "Montreal",
  "Beijing",
  "Sydney",
  "Cairo",
  "Madrid",
  "Lisbon",
  "Athens",
  "Dubai",
].map(nameToCity);

let localCities = localStorage.getItem("cities");
export const cities: City[] = reactive(localCities ? JSON.parse(localCities) : defaultCities);

export function nameToCity(name: string): City {
  return { name: name, randomId: Math.random() };
}

watch(cities, (newCities) => {
  localStorage.setItem("cities", JSON.stringify(newCities));
});

export function resetCities() {
  cities.splice(0, cities.length, ...defaultCities);
}

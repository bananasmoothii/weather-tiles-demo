import { ref } from "vue";

export type City = {
  name: string;
  randomId: number;
  localized?: string;
};

export const cities = ref(
  [
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
  ].map((name) => ({ name: name, randomId: Math.random() })) as City[],
);

export function nameToCity(name: string): City {
  return { name: name, randomId: Math.random() };
}

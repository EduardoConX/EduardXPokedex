import { describe, expect, it } from "vitest";
import { countPokemonStatus, filterPokemons, PokemonStatus } from "./pokemonFilters.ts";
import type { PokemonInfo } from "../interfaces/PokemonInfo";

const samplePokemons: PokemonInfo[] = [
  { pokemon: "Bulbasaur", occurrences: 1, pokedex: true, position: 1 },
  { pokemon: "Charmander", occurrences: 2, pokedex: false, position: 2 },
  { pokemon: "Squirtle", occurrences: 0, pokedex: false, position: 3 },
  { pokemon: "Pikachu", occurrences: 1, pokedex: false, position: 4 },
  { pokemon: "Eevee", occurrences: 0, pokedex: true, position: 5 },
  { pokemon: "Mew", occurrences: 3, pokedex: false, position: 6 },
];

describe("pokemonFilters", () => {
  it("filters by name ignoring case", () => {
    const result = filterPokemons(samplePokemons, "pik", "");
    expect(result).toHaveLength(1);
    expect(result[0].pokemon).toBe("Pikachu");
  });

  it("returns catched pokemons", () => {
    const result = filterPokemons(samplePokemons, "", PokemonStatus.Catched);
    expect(result).toEqual([
      samplePokemons[0],
      samplePokemons[1],
      samplePokemons[3],
      samplePokemons[4],
      samplePokemons[5],
    ]);
  });

  it("returns pending pokemons", () => {
    const result = filterPokemons(samplePokemons, "", PokemonStatus.Pending);
    expect(result).toEqual([samplePokemons[2]]);
  });

  it("returns repeated pokemons", () => {
    const result = filterPokemons(samplePokemons, "", PokemonStatus.Repeated);
    expect(result).toEqual([
      samplePokemons[0],
      samplePokemons[1],
      samplePokemons[5],
    ]);
  });

  it("counts the status totals", () => {
    expect(countPokemonStatus(samplePokemons, PokemonStatus.Catched)).toBe(5);
    expect(countPokemonStatus(samplePokemons, PokemonStatus.Pending)).toBe(1);
    expect(countPokemonStatus(samplePokemons, PokemonStatus.Repeated)).toBe(3);
  });
});

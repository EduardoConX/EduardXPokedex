import type { PokemonInfo } from "../interfaces/PokemonInfo";

export enum PokemonStatus {
  Catched = "catched",
  Pending = "pending",
  Repeated = "repeated",
}

export const filterPokemons = (
  pokemons: PokemonInfo[],
  searchQuery: string,
  filter: string | PokemonStatus = ""
): PokemonInfo[] => {
  const query = searchQuery.trim().toLowerCase();
  const searchedPokemons = query
    ? pokemons.filter((pokemon) =>
        pokemon.pokemon.toLowerCase().includes(query)
      )
    : pokemons;

  switch (filter) {
    case PokemonStatus.Catched:
      return searchedPokemons.filter(
        (pokemon) => pokemon.occurrences !== 0 || pokemon.pokedex
      );
    case PokemonStatus.Pending:
      return searchedPokemons.filter(
        (pokemon) => pokemon.occurrences === 0 && !pokemon.pokedex
      );
    case PokemonStatus.Repeated:
      return searchedPokemons.filter(
        (pokemon) =>
          (pokemon.occurrences !== 0 && pokemon.occurrences !== 1) ||
          (pokemon.occurrences === 1 && pokemon.pokedex)
      );
    default:
      return searchedPokemons;
  }
};

export const countPokemonStatus = (
  pokemons: PokemonInfo[],
  status: PokemonStatus
): number => {
  return filterPokemons(pokemons, "", status).length;
};

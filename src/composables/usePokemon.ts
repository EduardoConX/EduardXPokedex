import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { child, get, ref as firebaseRef } from "firebase/database";
import type { PokemonInfo } from "../interfaces/PokemonInfo";
import { database } from "./../database/config";

const dbRef = firebaseRef(database);

const getPokemon = async (id: string) => {
  let data = [];
  const realId = parseInt(id) - 1;
  try {
    const snapshot = await get(child(dbRef, "/pokemon/" + realId));
    if (snapshot.exists()) {
      data = snapshot.val();
    }
    return snapshot.val();
  } catch (error) {
    console.error(error);
  }

  return data;
};

const usePokemon = (id: string) => {
  const pokemon = ref<PokemonInfo>({
    pokemon: "",
    occurrences: 0,
    pokedex: false,
    position: 0,
  });

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemon(id),
  });

  watch(
    data,
    () => {
      if (data.value) pokemon.value = data.value;
    },
    { immediate: true }
  );

  return {
    pokemon,
    isLoading,
    isError,
    error,
  };
};

export default usePokemon;

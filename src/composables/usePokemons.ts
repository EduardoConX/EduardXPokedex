import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import type { PokemonInfo } from "../interfaces/PokemonInfo";
import { database } from "./../database/config";
import { child, get, ref as firebaseRef } from "firebase/database";

const dbRef = firebaseRef(database);

const getPokemons = async () => {
  try {
    const snapshot = await get(child(dbRef, "/pokemon"));
    if (snapshot.exists()) return snapshot.val();
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const usePokemons = () => {
  const pokemons = ref<PokemonInfo[]>([]);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemons(),
  });
  watch(
    data,
    () => {
      if (data.value) pokemons.value = data.value;
    },
    { immediate: true }
  );

  return {
    isLoading,
    pokemons,
    isError,
    error,
  };
};

export default usePokemons;

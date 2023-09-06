import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { child, get, ref as firebaseRef } from "firebase/database";
import { PokemonInfo } from "../interfaces/PokemonInfo";
import { database } from "./../database/config";

const dbRef = firebaseRef(database);

const getPokemon = async (id: string) => {
  let data = [];
  try {
    const snapshot = await get(child(dbRef, "/pokemon/" + id));
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
  });

  const { isLoading, data, isError } = useQuery(
    ["pokemon", id],
    () => getPokemon(id),
    {
      retry: false,
      onError(error: any) {
        console.error(error);
      },
    }
  );

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
  };
};

export default usePokemon;

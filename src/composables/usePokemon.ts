import { ref, watch } from "vue";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { child, get, ref as firebaseRef, set } from "firebase/database";
import { PokemonInfo } from "../interfaces/PokemonInfo";
import { database } from "./../database/config";
import router from "../router";

const dbRef = firebaseRef(database);

const getPokemon = async (id: string) => {
  let data = [];
  try {
    const snapshot = await get(child(dbRef, id));
    if (snapshot.exists()) {
      data = snapshot.val();
    }
    return snapshot.val();
  } catch (error) {
    console.error(error);
  }

  return data;
};

const updatePokemon = async (
  pokemon: PokemonInfo,
  newOccurrences: number,
  id: string
) => {
  const newPokemon = {
    pokemon: pokemon.pokemon,
    occurrences: pokemon.occurrences + newOccurrences,
    pokedex: pokemon.pokedex,
  };

  await set(firebaseRef(database, id), {
    ...newPokemon,
  });
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

  const updatePokemonMutation = useMutation(
    (newOcurrences: number) => updatePokemon(pokemon.value, newOcurrences, id),
    {
      onSuccess() {
        router.push("/");
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
    updatePokemonMutation,
    isLoading,
    isError,
    updatePokemon: updatePokemonMutation.mutate,
  };
};

export default usePokemon;

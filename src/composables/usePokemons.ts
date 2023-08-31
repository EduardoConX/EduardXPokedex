import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { PokemonInfo } from "../interfaces/PokemonInfo";
import { database } from "./../database/config";
import { child, get, ref as firebaseRef } from "firebase/database";

const dbRef = firebaseRef(database);

const getPokemons = async () => {
  let data = [];
  try {
    const snapshot = await get(child(dbRef, "/"));
    if (snapshot.exists()) {
      data = snapshot.val();
    }
    return snapshot.val();
  } catch (error) {
    console.error(error);
  }

  return data;
};

const usePokemons = () => {
  const pokemons = ref<PokemonInfo[]>([]);

  const { isLoading, data } = useQuery(["pokemons"], () => getPokemons());

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
  };
};

export default usePokemons;

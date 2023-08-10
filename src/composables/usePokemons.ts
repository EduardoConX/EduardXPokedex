import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getPokemonsAPI } from '../api/pokemon';
import { PokemonInfo } from '../interfaces/PokemonInfo';

const getPokemons = async () => {
    const { data } = await getPokemonsAPI();
    return data;
}

const usePokemons = () => {
    const pokemons = ref<PokemonInfo[]>([]);

    const { isLoading, data } = useQuery(
        ['pokemons'],
        () => getPokemons()
    );

    watch(data, () => {
        if (data.value) pokemons.value = data.value;
    }, { immediate: true })

    return {
        isLoading,
        pokemons
    }
}

export default usePokemons;

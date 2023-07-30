import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getOccurrencesAPI } from '../api/pokemon';

const getOccurrences = async () => {
    const { data } = await getOccurrencesAPI();
    return data;
}

const usePokemons = () => {
    const occurrences = ref<string[]>([]);

    const { isLoading, data } = useQuery(
        ['communities'],
        () => getOccurrences()
    );

    watch(data, () => {
        if (data.value) occurrences.value = data.value;
    }, { immediate: true })

    return {
        isLoading,
        occurrences
    }
}

export default usePokemons;

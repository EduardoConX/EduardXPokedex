<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

import usePokemon from "../composables/usePokemon";

const { params } = useRoute();
const id = params.id;
const { isLoading, pokemon, updatePokemonMutation } = usePokemon(id as string);

const newOccurrences = ref(0);

const addOccurrence = () => newOccurrences.value++;

const save = () => {
  updatePokemonMutation.mutate(newOccurrences.value)
}
</script>

<template>
  <p v-if="isLoading">Cargando...</p>
  <div v-else>
    <h1 class="text-3xl md:text-6xl font-bold mb-4">{{ pokemon?.pokemon }}</h1>
    <img
      class="mx-auto"
      height="500"
      width="500"
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        +id + 1
      }.png`"
      :alt="`${+id + 1}`"
    />
    <p class="text-2xl">
      Disponibles: {{ pokemon?.occurrences + newOccurrences }}
    </p>
    <p class="text-2xl">
      ¿En PC de EduardX? {{ pokemon?.pokedex ? "Si" : "No" }}
    </p>
    <div class="w-1/3 mx-auto mt-4 flex flex-row justify-between">
      <button @click="addOccurrence">Agregar Pokémon</button>
      <button @click="save">Guardar</button>
    </div>
  </div>
</template>

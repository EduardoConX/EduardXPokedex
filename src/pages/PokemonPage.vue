<script setup lang="ts">
import { useRoute } from "vue-router";

import usePokemon from "../composables/usePokemon";
import usePositions from "../composables/usePositions";

const { params } = useRoute();
const id = params.id;
const { isLoading, pokemon } = usePokemon(id as string);
const { isLoading: isLoadingPositions, positions } = usePositions();
const ocurrences = positions.value.filter(
  (position) => position.id == Number(id) + 1
);
</script>

<template>
  <p v-if="isLoading || isLoadingPositions">Cargando...</p>
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
      ¿En PC de EduardX? {{ pokemon?.pokedex ? "Si" : "No" }}
    </p>
    <div v-if="ocurrences.length">
      <p class="text-2xl">Disponibles:</p>
      <ul>
        <li v-for="ocurrence in ocurrences" class="text-xl">
          - Nivel: {{ ocurrence.level }} Posición: {{ ocurrence.position }}
        </li>
      </ul>
    </div>
  </div>
</template>

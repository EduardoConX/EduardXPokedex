<script setup lang="ts">
import usePokemons from "../composables/usePokemons";
const { isLoading, pokemons } = usePokemons();

const countCondition = (condition: string) => {
  let filteredArray = [];
  if (condition == "catched") {
    filteredArray = pokemons.value.filter(
      (p) => p.occurrences != "0" || p.pokedex
    );
  }
  if (condition == "repeated") {
    filteredArray = pokemons.value.filter(
      (p) =>
        (p.occurrences != "0" && p.occurrences != "1") ||
        (p.occurrences == "1" && p.pokedex)
    );
  }
  if (condition == "pending") {
    filteredArray = pokemons.value.filter(
      (p) => p.occurrences == "0" && !p.pokedex
    );
  }

  return filteredArray.length;
};
</script>

<template>
  <h1 class="text-3xl md:text-6xl font-bold mb-4">Pokedex de EduardX</h1>
  <p v-if="isLoading">Cargando...</p>
  <div v-else>
    <div class="flex w-full mb-4">
      <div class="w-1/3">
        <p class="text-2xl">Atrapados: {{ countCondition("catched") }}</p>
      </div>
      <div class="w-1/3">
        <p class="text-2xl">Pendientes: {{ countCondition("pending") }}</p>
      </div>
      <div class="w-1/3">
        <p class="text-2xl">Repetidos: {{ countCondition("repeated") }}</p>
      </div>
    </div>
    <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
      <div
        v-for="(pokemon, i) in pokemons"
        :key="pokemon.pokemon"
        :class="`flex flex-col border-4 ${
          pokemon.pokedex
            ? 'border-yellow-500'
            : pokemon.occurrences == '0'
            ? 'border-red-500'
            : pokemon.occurrences == '1'
            ? 'border-green-500'
            : 'border-blue-500'
        }`"
      >
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            i + 1
          }.png`"
          :alt="`${i + 1}`"
        />
        <RouterLink
          class="text-sm md:text-2xl text-white"
          :to="`/pokemon/${i}`"
        >
          {{ i + 1 }} - {{ pokemon.pokemon }}
          {{ `(${pokemon.occurrences})` }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

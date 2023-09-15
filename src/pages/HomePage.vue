<script setup lang="ts">
import { computed, ref } from "vue";
import usePokemons from "../composables/usePokemons";
const { isLoading, pokemons } = usePokemons();

const countCondition = (condition: string) => {
  let filteredArray = [];
  if (condition == "catched") {
    filteredArray = pokemons.value.filter(
      (p) => p.occurrences != 0 || p.pokedex
    );
  }
  if (condition == "repeated") {
    filteredArray = pokemons.value.filter(
      (p) =>
        (p.occurrences != 0 && p.occurrences != 1) ||
        (p.occurrences == 1 && p.pokedex)
    );
  }
  if (condition == "pending") {
    filteredArray = pokemons.value.filter(
      (p) => p.occurrences == 0 && !p.pokedex
    );
  }

  return filteredArray.length;
};

const filter = ref("");

const filteredPokemons = computed(() => {
  if (filter.value === "catched") {
    return pokemons.value.filter((p) => p.occurrences !== 0 || p.pokedex);
  }

  if (filter.value === "pending") {
    return pokemons.value.filter((p) => p.occurrences === 0 && !p.pokedex);
  }

  if (filter.value === "repeated") {
    return pokemons.value.filter(
      (p) =>
        (p.occurrences !== 0 && p.occurrences !== 1) ||
        (p.occurrences === 1 && p.pokedex)
    );
  }

  return pokemons.value;
});
</script>

<template>
  <h1 class="text-3xl md:text-6xl font-bold mb-4">Pokedex de EduardX</h1>
  <p v-if="isLoading">Cargando...</p>
  <div v-else>
    <RouterLink class="text-sm md:text-2xl text-white" to="/posiciones">
      Ver ordenados por captura
    </RouterLink>
    <div class="flex w-full my-4">
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
    <select name="filter" v-model="filter">
      <option value="">Mostrar todos</option>
      <option value="catched">Mostrar atrapados</option>
      <option value="pending">Mostrar pendientes</option>
      <option value="repeated">Mostrar repetidos</option>
    </select>
    <div class="grid grid-cols-3 md:grid-cols-6 gap-4 mt-4">
      <div
        v-for="pokemon in filteredPokemons"
        :key="pokemon.pokemon"
        :class="`flex flex-col border-4 ${
          pokemon.pokedex
            ? 'border-yellow-500'
            : pokemon.occurrences == 0
            ? 'border-red-500'
            : pokemon.occurrences == 1
            ? 'border-green-500'
            : 'border-blue-500'
        }`"
      >
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.position}.png`"
          :alt="`${pokemon.pokemon}`"
        />
        <RouterLink
          class="text-sm md:text-2xl text-white"
          :to="`/pokemon/${pokemon.position - 1}`"
        >
          {{ pokemon.position }} - {{ pokemon.pokemon }}
          {{ `(${pokemon.occurrences})` }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

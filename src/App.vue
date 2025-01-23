<script setup lang="ts">
import { computed, ref } from "vue";

import usePokemons from "./composables/usePokemons";
import PokemonCard from "./components/PokemonCard.vue";
const { isLoading, pokemons, isError, error } = usePokemons();

const isDark = ref(false);
const searchQuery = ref("");
const filter = ref("");

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("darkMode", isDark.value.toString());
};

const filteredPokemons = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const searchedPokemons = pokemons.value.filter((pokemon) =>
    pokemon.pokemon.toLowerCase().includes(query)
  );

  if (filter.value === "catched") {
    return searchedPokemons.filter((p) => p.occurrences !== 0 || p.pokedex);
  }

  if (filter.value === "pending") {
    return searchedPokemons.filter((p) => p.occurrences === 0 && !p.pokedex);
  }

  if (filter.value === "repeated") {
    return searchedPokemons.filter(
      (p) =>
        (p.occurrences !== 0 && p.occurrences !== 1) ||
        (p.occurrences === 1 && p.pokedex)
    );
  }

  return searchedPokemons;
});
</script>

<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition-colors duration-200"
  >
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1
          class="text-4xl font-bold text-center text-gray-900 dark:text-white"
        >
          Pokédex de EduardX
        </h1>
        <button
          @click="toggleDarkMode"
          class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {{ isDark ? "🌞 Light" : "🌙 Dark" }}
        </button>
      </div>

      <div class="mb-8 space-y-4">
        <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar Pokémon"
            class="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          />
          <select
            v-model="filter"
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors capitalize"
          >
            <option value="">Mostrar todos</option>
            <option value="catched">Mostrar atrapados</option>
            <option value="pending">Mostrar pendientes</option>
            <option value="repeated">Mostrar repetidos</option>
          </select>
        </div>        
      </div>

      <div
        v-if="isLoading"
        class="text-center text-xl text-gray-900 dark:text-white"
      >
        Cargando...
      </div>
      <div v-else-if="isError" class="text-center text-red-500 text-xl">
        {{ error }}
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
        <PokemonCard
          v-for="pokemon in filteredPokemons"
          :key="pokemon.position"
          :pokemon="pokemon"
        />
      </div>
    </div>
  </div>
</template>

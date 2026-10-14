<script setup lang="ts">
import { computed, ref } from "vue";
import usePokemons from "../composables/usePokemons";
import PokemonCard from "../components/PokemonCard.vue";
import StatusCount from "../components/StatusCount.vue";
import {
  countPokemonStatus,
  filterPokemons,
  PokemonStatus,
} from "../utils/pokemonFilters";

const { isLoading, pokemons, isError, error } = usePokemons();

const searchQuery = ref("");
const filter = ref("");

const statusToCount = [
  {
    status: "Atrapados",
    count: computed(() => countPokemonStatus(pokemons.value, PokemonStatus.Catched)),
  },
  {
    status: "Pendientes",
    count: computed(() => countPokemonStatus(pokemons.value, PokemonStatus.Pending)),
  },
  {
    status: "Repetidos",
    count: computed(() => countPokemonStatus(pokemons.value, PokemonStatus.Repeated)),
  },
];

const filteredPokemons = computed(() =>
  filterPokemons(pokemons.value, searchQuery.value, filter.value as PokemonStatus | "")
);
</script>

<template>
  <div class="mb-8 space-y-4">
    <RouterLink class="text-white" to="/positions">Ver por orden de captura</RouterLink>
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
    <div class="flex w-full my-4">
      <StatusCount
        v-for="status in statusToCount"
        :key="status.status"
        :status-text="status.status"
        :status-count="status.count.value"
      />
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
</template>

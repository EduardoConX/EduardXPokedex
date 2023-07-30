<script setup lang="ts">
import pokemon from "./enums/pokemon";
import usePokemons from "./composables/usePokemons";
const { isLoading, occurrences } = usePokemons();
</script>

<template>
  <h1 class="text-3xl md:text-6xl font-bold mb-4">Pokedex Nacional</h1>
  <p v-if="isLoading">Cargando...</p>
  <div v-else class="grid grid-cols-3 md:grid-cols-6 gap-4">
    <div
      v-for="i in pokemon.length"
      :key="i"
      :class="`flex flex-col border-4 ${
        occurrences[i] == '0'
          ? 'border-red-500'
          : occurrences[i] == '1'
          ? 'border-green-500'
          : 'border-blue-500'
      }`"
    >
      <img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`"
        :alt="`${i}`"
      />
      <p class="text-sm md:text-2xl">
        {{ i }} - {{ pokemon[i - 1] }} ({{ occurrences[i] }})
      </p>
    </div>
  </div>
</template>

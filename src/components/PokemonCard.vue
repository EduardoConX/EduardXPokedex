<script setup lang="ts">
import type { PokemonInfo } from "../interfaces/PokemonInfo";

defineProps<{
  pokemon: PokemonInfo;
}>();

const getTypeColor = (occurrences: number) => {
  const colors: Record<string, string> = {
    0: "ring-red-500",
    1: "ring-green-500",
  };
  return colors[occurrences] || "ring-blue-400";
};
</script>

<template>
  <div
    :class="[
      pokemon.pokedex ? 'ring-yellow-400' : getTypeColor(pokemon.occurrences),
      'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-all ring-4',
    ]"
  >
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.position}.png`"
      :alt="pokemon.pokemon"
      class="w-32 h-32 mx-auto"
    />
    <h3
      class="text-lg font-semibold capitalize text-center mb-2 text-gray-900 dark:text-white"
    >
      N° {{ pokemon.position }}
    </h3>
    <h2
      class="text-xl font-bold capitalize text-center mb-2 text-gray-900 dark:text-white"
    >
      {{ pokemon.pokemon }}
    </h2>
    <div class="flex justify-center gap-2 mb-2">
      <span
        class="px-3 py-1 rounded-full text-gray-900 dark:text-white text-sm capitalize font-bold"
      >
        ({{ pokemon.occurrences }})
      </span>
    </div>
  </div>
</template>

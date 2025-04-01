<script setup lang="ts">
import type { Position } from "../interfaces/Position";
const props = defineProps<{
  position: Position;
}>();
</script>

<template>
  <div
    class="ring-blue-400 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-all ring-4 cursor-pointer"
  >
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${position.id}.png`"
      :alt="position.pokemon"
      class="w-32 h-32 mx-auto"
    />
    <h3
      class="text-lg font-semibold capitalize text-center mb-2 text-gray-900 dark:text-white"
    >
      N° {{ position.position }}
    </h3>
    <h2
      class="text-xl font-bold capitalize text-center mb-2 text-gray-900 dark:text-white"
    >
      {{ position.pokemon }}
    </h2>
  </div>
</template>

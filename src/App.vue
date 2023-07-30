<script setup lang="ts">
import pokemon from "./enums/pokemon";
import occurrences from "./enums/occurrences";
</script>

<template>
  <h1 class="text-6xl font-bold mb-4">Pokedex Nacional</h1>
  <div class="grid grid-cols-6 gap-4">
    <div
      v-for="i in pokemon.length"
      :key="i"
      :class="`flex flex-col border-4 ${
        occurrences[i - 1] == '0'
          ? 'border-red-500'
          : occurrences[i - 1] == '1'
          ? 'border-green-500'
          : 'border-blue-500'
      }`"
    >
      <img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`"
        :alt="`${i}`"
      />
      <p class="text-2xl">{{ i }} - {{ pokemon[i - 1] }}</p>
    </div>
  </div>
</template>

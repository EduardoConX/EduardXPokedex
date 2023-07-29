<script setup lang="ts">
import pokemon from "./enums/pokemon";
</script>

<template>
  <div class="grid grid-cols-6 gap-4">
    <div class="flex flex-col" v-for="i in pokemon.length" :key="i">
      <img
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`"
        :alt="`${i}`"
      />
      <p class="text-2xl">{{ i }} - {{ pokemon[i - 1] }}</p>
    </div>
  </div>
</template>

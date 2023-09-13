<script setup lang="ts">
import usePositions from "../composables/usePositions";

const { isLoading, positions } = usePositions();
</script>

<template>
  <h1 class="text-3xl md:text-6xl font-bold mb-4">Pokedex de EduardX</h1>
  <p v-if="isLoading">Cargando...</p>
  <div v-else>
    <RouterLink class="text-sm md:text-2xl text-white" to="/">
      Ver por posición en la Pokedex Nacional
    </RouterLink>
    <div class="grid grid-cols-3 md:grid-cols-6 gap-4 mt-4">
      <div
        v-for="position in positions"
        :key="position.position"
        class="flex flex-col border-4 border-green-500"
      >
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${position.id}.png`"
          :alt="`${position.pokemon}`"
        />
        <p class="text-sm md:text-2xl text-white">
          {{ position.position }} - {{ position.pokemon }}
        </p>
        <p class="text-sm md:text-xl text-white">
          {{ `(Nvl. ${position.level})` }}
        </p>
      </div>
    </div>
  </div>
</template>

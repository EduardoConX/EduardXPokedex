<script setup lang="ts">
import usePositions from "../composables/usePositions";
import PositionCard from "../components/PositionCard.vue";
const { isLoading, positions, error, isError } = usePositions();
</script>

<template>
  <div class="mb-8 space-y-4">
    <RouterLink class="text-white" to="/"
      >Ver por posición en la Pokédex</RouterLink
    >
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
    <PositionCard
      v-for="position in positions"
      :key="position.position"
      :position="position"
    />
  </div>
</template>

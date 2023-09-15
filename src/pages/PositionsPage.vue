<script setup lang="ts">
import usePositions from "../composables/usePositions";
import { ref, computed } from "vue";

const { isLoading, positions } = usePositions();

const search = ref("");

const filteredPositions = computed(() => {
  if (search.value !== "") {
    return positions.value.filter((p) =>
      p.pokemon.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
    );
  }

  return positions.value;
});
</script>

<template>
  <h1 class="text-3xl md:text-6xl font-bold mb-4">Pokedex de EduardX</h1>
  <p v-if="isLoading">Cargando...</p>
  <div v-else>
    <RouterLink class="text-sm md:text-2xl text-white" to="/">
      Ver por posición en la Pokedex Nacional
    </RouterLink>
    <div class="flex justify-center my-4">
      <input type="text" name="search" v-model="search" />
    </div>
    <div class="grid grid-cols-3 md:grid-cols-6 gap-4 mt-4">
      <div
        v-for="position in filteredPositions"
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

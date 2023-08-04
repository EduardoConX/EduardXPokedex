<script setup lang="ts">
import pokemon from "../enums/pokemon";
import usePokemons from "../composables/usePokemons";
const { isLoading, occurrences } = usePokemons();

const countCondition = (condition: string) => {
  let filteredArray = [];
  if (condition == "catched") {
    filteredArray = occurrences.value.filter((o) => o != "0");
  }
  if (condition == "repeated") {
    filteredArray = occurrences.value.filter(
      (o) => o != "0" && o != "-" && o != "1"
    );
  }
  if (condition == "pending") {
    filteredArray = occurrences.value.filter((o) => o == "0");
  }

  return filteredArray.length;
};
</script>

<template>
  <h1 class="text-3xl md:text-6xl font-bold mb-4">Pokedex de EduardX</h1>
  <p v-if="isLoading">Cargando...</p>
  <div v-else>
    <div class="flex w-full mb-4">
      <div class="w-1/3">
        <p class="text-2xl">Atrapados: {{ countCondition("catched") }}</p>
      </div>
      <div class="w-1/3">
        <p class="text-2xl">Pendientes: {{ countCondition("pending") }}</p>
      </div>
      <div class="w-1/3">
        <p class="text-2xl">Repetidos: {{ countCondition("repeated") }}</p>
      </div>
    </div>
    <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
      <div
        v-for="i in pokemon.length"
        :key="i"
        :class="`flex flex-col border-4 ${
          occurrences[i] == '-'
            ? 'border-yellow-500'
            : occurrences[i] == '0'
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
        <p class="text-sm md:text-2xl text-white">
          {{ i }} - {{ pokemon[i - 1] }}
          {{ occurrences[i] == "-" ? "☆" : `(${occurrences[i]})` }}
        </p>
      </div>
    </div>
  </div>
</template>

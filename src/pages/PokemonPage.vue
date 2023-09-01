<script setup lang="ts">
import { useRoute } from "vue-router";
import pokemon from "../enums/pokemon";

const { params } = useRoute();
const id = +params.id;
</script>

<template>
  <h1 class="text-3xl md:text-6xl font-bold mb-4">{{ pokemon[id] }}</h1>
  <img
    class="mx-auto"
    height="500"
    width="500"
    :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      id + 1
    }.png`"
    :alt="`${id + 1}`"
  />
</template>

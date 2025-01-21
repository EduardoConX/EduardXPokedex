<script setup lang="ts">
import { ref } from "vue";

const isDark = ref(false);
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("darkMode", isDark.value.toString());
};
</script>

<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition-colors duration-200"
  >
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1
          class="text-4xl font-bold text-center text-gray-900 dark:text-white"
        >
          Pokédex de EduardX
        </h1>
        <button
          @click="toggleDarkMode"
          class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {{ isDark ? "🌞 Light" : "🌙 Dark" }}
        </button>
      </div>

      <div class="mb-8">
        <input
          type="text"
          placeholder="Buscar Pokémon"
          class="w-full max-w-md mx-auto block px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        />
      </div>
    </div>
  </div>
</template>

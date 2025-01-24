<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";

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
      <RouterView />
    </div>
  </div>
</template>

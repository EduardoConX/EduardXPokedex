<script setup lang="ts">
defineProps<{
  statusText: string;
  statusCount: number;
}>();
</script>

<template>
  <div class="w-1/3">
    <p
      class="text-center text-lg font-semibold text-gray-600 dark:text-gray-300"
    >
      {{ statusText }}: {{ statusCount }}
    </p>
  </div>
</template>

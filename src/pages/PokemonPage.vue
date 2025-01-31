<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import usePokemon from "../composables/usePokemon";
import usePositions from "../composables/usePositions";
import { ref, watch } from "vue";
import type { Position } from "../interfaces/Position";

const { params } = useRoute();
const router = useRouter();
const id = params.id;

const { isLoading, pokemon, error, isError } = usePokemon(id as string);
const { isLoading: isLoadingPositions, positions } = usePositions();
const ocurrences = ref<Position[]>([]);
ocurrences.value = positions.value.filter((position) => position.id == +id);
watch(positions, (newValue, _oldValue) => {
  if (newValue && newValue.length > 0) {
    ocurrences.value = newValue.filter((position) => position.id == +id);
  }
});

const searchPokemon = () => {
  navigator.clipboard.writeText(
    `@Pokétwo#8236 m s --n ${pokemon.value.pokemon} --o price`
  );
};

const tradePokemon = (position: number) => {
  navigator.clipboard.writeText(
    `@Pokétwo#8236 trade add ${position}`
  );
};
</script>

<template>
  <div>
    <button
      @click="router.push('/')"
      class="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      ← Regresar
    </button>
    <div
      v-if="isLoading || isLoadingPositions"
      class="text-center text-xl text-gray-900 dark:text-white"
    >
      Cargando...
    </div>

    <div v-else-if="isError" class="text-center text-red-500 text-xl">
      {{ error }}
    </div>
    <div
      v-else-if="pokemon"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
    >
      <div class="flex flex-col md:flex-row gap-8 items-center">
        <div class="flex-shrink-0">
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`"
            :alt="`${+id + 1}`"
            class="w-48 h-48 object-contain"
          />
        </div>

        <div class="flex-grow">
          <h1
            class="text-4xl font-bold capitalize mb-4 text-gray-900 dark:text-white"
          >
            #{{ id }} {{ pokemon.pokemon }}
          </h1>

          <div class="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <div>
              <h2 class="text-xl font-semibold mb-2">Disponibles:</h2>
              <div v-if="!ocurrences.length">
                <span class="mr-4">No disponible</span>
                <span @click="searchPokemon" class="font-bold cursor-pointer"
                  >(Buscar en el mercado)</span
                >
              </div>
              <ul v-else>
                <li v-for="ocurrence in ocurrences" class="text-xl">
                  <span class="mr-4"
                    >- Nivel: {{ ocurrence.level }} Posición:
                    {{ ocurrence.position }}</span
                  >
                  <span
                    @click="() => tradePokemon(ocurrence.position)"
                    class="font-bold cursor-pointer"
                    >(Agregar al trade)</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

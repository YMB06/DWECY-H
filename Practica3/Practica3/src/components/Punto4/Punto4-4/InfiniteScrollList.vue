<template>
    <div ref="scrollContainer" class="scroll-container">
        <div v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-item">
            {{ pokemon.name }}
        </div>
        <div v-if="isLoading" class="loading">Cargando más Pokémon...</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePokemonFetcher } from '@/composables/usePokemonFetcher';
import { useScrollDetector } from '@/composables/useScrollDetector';

const { pokemons, isLoading, loadMorePokemons } = usePokemonFetcher();
const currentPage = ref(1);
const scrollContainer = ref<HTMLElement | null>(null);

async function handleScrollEnd() {
    if (!isLoading.value) {
        currentPage.value++;
        await loadMorePokemons(currentPage.value);
        history.replaceState({ page: currentPage.value }, '', `?page=${currentPage.value}`);
    }
}

useScrollDetector(scrollContainer, handleScrollEnd);

onMounted(() => {
    loadMorePokemons(currentPage.value);
});
</script>

<style scoped>
.scroll-container {
    height: 400px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    padding: 10px;
}

.pokemon-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
    text-transform: capitalize;
}

.loading {
    text-align: center;
    padding: 20px;
    font-style: italic;
}
</style>
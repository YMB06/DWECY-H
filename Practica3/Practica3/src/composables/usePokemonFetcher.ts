import { ref } from 'vue';

interface Pokemon {
    name: string;
    url: string;
}

export function usePokemonFetcher() {
    const pokemons = ref<Pokemon[]>([]);
    const isLoading = ref(false);

    async function loadMorePokemons(page: number) {
        isLoading.value = true;
        try {
            const offset = (page - 1) * 20;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
            const data = await response.json();
            pokemons.value.push(...data.results);
        } catch (error) {
            console.error('Error loading Pokemon:', error);
        } finally {
            isLoading.value = false;
        }
    }

    return {
        pokemons,
        isLoading,
        loadMorePokemons
    };
}
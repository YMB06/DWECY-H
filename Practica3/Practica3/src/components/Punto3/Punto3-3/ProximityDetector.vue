<template>
    <div>
        VEN Y SANA MI DOOOOOOLOOOOOR
        <p>Coords: {{ coords }}</p>
        <p>Error: {{ error }}</p>
        <h2>Amigos cercanos (a menos de {{ proximityRadiusKm }} km):</h2>
        <p v-if="nearbyFriends.length === 0">Nadie cerca por ahora. ¡Sigue moviéndote!</p>
        <ul>
            <li v-for="friend in nearbyFriends" :key="friend.id">
                {{ friend.name }}
            </li>
        </ul>

    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGeolocation } from '../../../composables/useGeolocation';
import { friends } from '@/data/mockFriends';
import { calculateDistance } from '@/utils/distanceCalculator';

const { coords, error } = useGeolocation();
const proximityRadiusKm = 20;




const nearbyFriends = computed(() => {
    // Mock para probar coordenadas si no tengo la geolocalizacion habilitada
    const currentCoords = coords.value || { latitude: 40.4169, longitude: -3.7035 };

    return friends.filter((friend) => {
        const distance = calculateDistance(
            currentCoords,
            { latitude: friend.latitude, longitude: friend.longitude }
        );
        return distance <= proximityRadiusKm;
    });
});

//no tengo la geolocalizacion habilitada, metodo si tuviese la geolocalizacion:
/**const nearbyFriends = computed(() => {
    if (!coords.value) {
        return [];
    } else if (error.value) {
        return [];
    }

    return friends.filter((friend) => {
        const distance = calculateDistance(
            coords.value!,
            { latitude: friend.latitude, longitude: friend.longitude }
        );
        return distance <= proximityRadiusKm;
    });
}); */
</script>

<style scoped>

</style>
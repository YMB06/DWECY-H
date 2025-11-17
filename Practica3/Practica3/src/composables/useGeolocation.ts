import { ref, onUnmounted, onMounted } from 'vue';

interface Coordinates {
    latitude: number;
    longitude: number;
}

export function useGeolocation() {
    const coords = ref<Coordinates | null>(null);
    const error = ref<string | null>(null);
    let watchId: number | null = null;
    
    onMounted(() => {
        if ('geolocation' in navigator) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    coords.value = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    error.value = null;
                },
                (err) => {
                    error.value = `Error de geolocalización: ${err.message}`;
                    coords.value = null;
                },
                {
                    
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                }
            );
        } else {
            error.value = 'Geolocalización no soportada por este navegador';
        }
    });
    
    onUnmounted(() => {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
        }
    });
    
    return {
        coords,
        error
    };
}
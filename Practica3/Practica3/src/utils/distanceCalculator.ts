export function calculateDistance(
    coords1: { latitude: number; longitude: number },
    coords2: { latitude: number; longitude: number }
): number {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);
    const R = 6371; // Radio de la Tierra en kilómetros

    const dLat = toRadians(coords2.latitude - coords1.latitude);
    const dLon = toRadians(coords2.longitude - coords1.longitude);
    const lat1Rad = toRadians(coords1.latitude);
    const lat2Rad = toRadians(coords2.latitude);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distancia en km
}

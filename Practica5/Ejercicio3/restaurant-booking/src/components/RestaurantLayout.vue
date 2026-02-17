<template>
  <div class="restaurant-layout">
    <TableMap />
    <ReservationForm />
  </div>
</template>

<script setup lang="ts">
import TableMap from './TableMap.vue'
import ReservationForm from './ReservationForm.vue'
</script>

<style scoped>
.restaurant-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .restaurant-layout {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>

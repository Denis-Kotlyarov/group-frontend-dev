<template>
  <q-card class="my-card">
    <img src="https://loremflickr.com/640/560" class="card-img">

    <q-card-section>
      <div class="text-h6 q-pb-none">1.999₽</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ lorem }}
    </q-card-section>

    <q-card-section class="q-pt-none q-w-100 row q-gutter-x-sm">
      <q-btn class="col-9" color="primary" label="Купить" />
      <q-icon 
        name="favorite" 
        size="md"
        class="favorite-icon cursor-pointer col-2" 
        :class="favoriteToggler ? 'text-red-10' : 'text-grey-7'" 
        @click="favoriteToggler = !favoriteToggler"/>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue"
  let lorem ='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  if (lorem.length > 100) lorem = lorem.slice(0, 200) + '...';

  let favoriteToggler = ref(false)
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 280px

  .card-img
    max-width: 280px
    max-height: 300px
  
  .favorite-icon
    transition: color 0.3s ease-in-out
</style>
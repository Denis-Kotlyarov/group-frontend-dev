<template>
  <q-card class="my-card">
    <img src="https://loremflickr.com/640/560" class="card-img">

    <q-card-section>
      <div class="text-h6 q-pb-none">1.999₽</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ lorem }}
    </q-card-section>

    <q-card-section class="q-pt-none q-w-100">
      <q-btn class="full-width" color="primary" label="Купить" />
    </q-card-section>
  </q-card>
</template>

<script setup>
  let lorem ='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  if (lorem.length > 100) lorem = lorem.slice(0, 200) + '...';
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 280px

  .card-img
    max-width: 280px
    max-height: 300px
</style>
<template>
  <q-card class="my-card">
    <img src="https://loremflickr.com/640/560" class="card-img">
    <q-card-section>
      <div class="my-card-text text-h6 q-pb-none">{{ nameTrimmedText }}</div>
    </q-card-section>

    <q-card-section>
      <div class="my-card-text text-h6 q-pb-none">1.999₽</div>
    </q-card-section>

    <q-card-section class="my-card-text q-pt-none">
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
  
  const trimSizeforItemName = 20;
  let nameText = 'TovarName long Something that is too big and you want to trim, and then renddeer in your HTML page.';
  let nameContent = nameText.substring(0, nameText.length - 4);
  let nameTrimmedText = nameContent.substring(0, trimSizeforItemName) + '...';

  // const trimSizeforItemDescr = 20;
  // let text = 'Something that is too big and you want to trim, and then renddeer in your HTML page.';
  // let content = text.substring(0, text.length - 4);
  // let trimmedText = content.substring(0, trimSizeforItemDescr) + '...';
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 280px

  .my-card-text
    color: black

  .card-img
    max-width: 280px
    max-height: 300px
</style>
<template>
  <q-card class="my-card">
    <div>
      <img :src="tovar.imgURL" class="card-img rounded-borders">
      <div class="bg-primary q-pa-xs favorite-icon-div"
      :class="favoriteToggler ? 'bg-secondary' : 'bg-primary'">
        <q-icon 
        name="favorite" 
        size="md"
        class="favorite-icon cursor-pointer" 
        :class="favoriteToggler ? 'text-red-10' : 'text-grey-3'"
        @click="favoriteToggler = !favoriteToggler"/>
      </div>
    </div>
    

    <q-card-section>
      <div class="my-card-text text-h5 text-weight-bold q-pb-none">1.999₽</div>
      <div class="my-card-text text-h6 text-weight-regular q-pb-none">{{ tovar.name }}</div>
    </q-card-section>

    <!-- <q-card-section class="my-card-text q-pt-none">
      {{ lorem }}
    </q-card-section> -->

    <q-card-section class="full-width">
      <q-btn no-caps class="text-bold full-width" color="primary" label="В корзину" style="border-radius: 10px;"/>
      <!-- ноу-капс выключает капс на кнопке -->
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue"
  let lorem ='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  if (lorem.length > 100) lorem = lorem.slice(0, 200) + '...';
  
  const trimSizeforItemName = 35;
  let nameText = 'TovarName long Something that is too big and you want to trim, and then renddeer in your HTML page.';
  let nameContent = nameText.substring(0, nameText.length - 4);
  let nameTrimmedText = nameContent.substring(0, trimSizeforItemName) + '...';

  // const trimSizeforItemDescr = 20;
  // let text = 'Something that is too big and you want to trim, and then renddeer in your HTML page.';
  // let content = text.substring(0, text.length - 4);
  // let trimmedText = content.substring(0, trimSizeforItemDescr) + '...';

  let favoriteToggler = ref(false)

  const props = defineProps({
    tovar: {
      type: Object
    }
  })
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 280px
    min-width: 70px
    height: calc(var(--width) / 2)

  .my-card-text
    color: black

  .card-img
    width: 100%
  
  .favorite-icon
    transition: color 0.3s ease-in-out
  
  .favorite-icon-div
    display: flex
    flex-direction: column
    position: absolute
    right: 20px
    top: 20px
    z-index: 4
    border-radius: 10px
</style>
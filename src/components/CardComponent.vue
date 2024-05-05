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
      <div class="my-card-text text-h5 text-weight-bold q-pb-none">{{ tovar.price }}₽</div>
      <div class="my-card-text text-h6 text-weight-regular q-pb-none">{{ tovar.name.slice(0, 35) + '...' }}</div>
    </q-card-section>

    <q-card-section class="full-width">
      <q-btn no-caps class="text-bold full-width" color="primary" label="В корзину" style="border-radius: 10px;"/>
      <!-- ноу-капс выключает капс на кнопке -->
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue"

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
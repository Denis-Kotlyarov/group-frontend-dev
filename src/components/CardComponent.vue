<template>
  <q-card class="my-card">
    <div>
      <img :src="tovar.imgURL" class="card-img rounded-borders" />
      <div
        class="bg-primary q-pa-xs favorite-icon-div"
        :class="favoriteToggler ? 'bg-secondary' : 'bg-primary'"
      >
        <q-icon
          name="favorite"
          size="md"
          class="favorite-icon cursor-pointer"
          :class="favoriteToggler ? 'text-red-10' : 'text-grey-3'"
          @click="AddToFavorites"
        />
      </div>
    </div>

    <q-card-section>
      <div class="my-card-text text-h5 text-weight-bold q-pb-none">
        {{ tovar.price }}₽
      </div>
      <div class="my-card-text text-h6 text-weight-regular q-pb-none">
        {{ tovar.name.slice(0, 35) + "..." }}
      </div>
    </q-card-section>

    <q-card-section class="full-width">
      <q-btn
        @click="AddToBasket"
        no-caps
        class="text-bold full-width"
        color="primary"
        label="В корзину"
        style="border-radius: 10px"
      />
      <!-- ноу-капс выключает капс на кнопке -->
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();

let favoriteToggler = ref(false);

const props = defineProps({
  tovar: {
    type: Object,
  },
});

// функция срабатывающая при клике на "добавить в избранное"
function AddToFavorites() {
  favoriteToggler.value = !favoriteToggler.value;
  if (favoriteToggler.value !== false) {
    return $q.notify({
      message: "Товар добавлен в избранное!",
      color: "primary",
      badgeColor: "negative",
      badgeTextColor: "dark",
      badgeClass: "shadow-3 glossy my-badge-class",
    });
  }
}

// функция срабатывающая при клике на "добавить в корзину"
function AddToBasket() {
  $q.notify({
    message: "Товар в корзине!",
    color: "primary",
    badgeColor: "positive",
    badgeTextColor: "dark",
    badgeClass: "shadow-3 glossy my-badge-class",
  });
}
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
  .my-badge-class
    border: 1px solid #ccc
</style>
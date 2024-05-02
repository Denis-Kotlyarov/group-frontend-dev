<template>
  <div class="row q-mt-xl justify-center q-mr-lg q-ml-lg">
    <div class="bg-white col-2 q-mr-lg items-stretch background-stroke">
      <div class="text-center q-mt-lg">
        <q-avatar size="100px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <p class="text-h6">Юзер Юзерович</p>
        <p class="text-h7">1234567890@mail.ru</p>

        <q-btn class="q-mt-lg" color="primary" label="Редактировать" />
      </div>
    </div>

    <div class="bg-white col-9 background-stroke q-pa-lg">
      <div class="text-h3 q-mb-xl">
        <span>Заказы</span>
      </div>
      <!-- карточка товаров в личном кабинете -->
      <div
        v-for="i in 5"
        :key="i"
        class="bg-white q-mb-lg card-custom-style shadow-5"
      >
        <div v-if="purchasedItem.length">
          <q-card-section class="row justify-between">
            <div class="col-3">
              <div class="row items-center no-wrap">
                <div class="text-h6 col">Доставка курьером</div>
                <div>
                  <div
                    class="text-subtitle2 col bg-positive text-center marker-received-style q-mr-sm"
                  >
                    Получен
                  </div>
                </div>
              </div>
              <div class="text-subtitle2">Дата покупки: 11.11.24</div>
            </div>
            <div class="col-7 text-right">
              <q-img
                class="img-personal-account-cards"
                src="https://loremflickr.com/640/360"
              />
              <q-img
                class="q-ml-lg img-personal-account-cards"
                src="https://loremflickr.com/640/360"
              />
            </div>
            <div class="text-subtitle2 col-2 text-right">
              Оплачено <span class="text-h6">1399р</span>
            </div>
          </q-card-section>
        </div>
      </div>

      <!-- если заказов нет -->

      <div
        v-if="!purchasedItem.length"
        class="basket-page__basket-empty basket-empty"
      >
        <div class="basket-empty__wrap text-center">
          <q-icon name="shopping_cart" size="6em" color="grey-5" />
          <div class="basket-content_title text-h6">История заказов пуста</div>
          <p class="q-pt-md">
            Загляните на главную, чтобы выбрать товары или найдите нужное в
            поиске
          </p>
          <q-btn to="/" color="positive" label="Перейти на главную" />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";

//предположительно массив карточек купленных товаров
const purchasedItem = ref([
  {
    id: 1,
    price: 1000,
    name: "Кроссовки",
  },
]);

defineOptions({
  name: "UserAccount",
});
</script>

<style lang="sass" scoped>
.img-personal-account-cards
  height: 96px
  width: 96px
  border-radius: 20px

.marker-received-style
  width: 100px
  height: 20px
  border-radius: 20px

.background-stroke
  border-radius: 20px

.card-custom-style
  border-radius: 20px
</style>


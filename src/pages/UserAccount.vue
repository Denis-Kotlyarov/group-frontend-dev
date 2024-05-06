<template>
  <div 
    class="row q-mt-xl justify-center q-mr-lg q-ml-lg main" 
    :class="$q.screen.width <= 880 ? 'column wrap' : ''"
  >
    <div 
      class="bg-white col q-mr-lg q-pa-sm items-stretch background-stroke user-profile"
      :class="$q.screen.width <= 880 ? 'q-mb-lg' : ''"
    >
      <div 
        class="text-center q-my-lg"
        :class="$q.screen.width <= 880 ? 'flex flex-center q-gutter-x-lg wrap' : ''"
      >
        <q-avatar size="100px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <div>
          <p class="text-h6" :class="$q.screen.width <= 880 ? 'q-mb-none' : ''">{{ nameOfUser }}</p>
          <p class="text-h7" :class="$q.screen.width <= 880 ? 'q-mb-none' : ''">{{ email }}</p>
          <q-btn class="q-mt-lg" color="primary" label="Редактировать" />
        </div>
      </div>
    </div>

    <div class="bg-white col-9 background-stroke q-pa-lg">
      <div class="text-h3 q-mb-xl">
        <span>Заказы</span>
      </div>
      <div
        v-for="order in arrOfOrders"
        :key="order.id"
        class="bg-white q-mb-lg card-custom-style shadow-5"
      >
        <div v-if="purchasedItem.length">
          <q-card-section class="row justify-between">
            <div class="col">
              <div 
                class="row items-center no-wrap"
                :class="$q.screen.width <= 660 ? 'justify-start column' : ''"
              >
                <div class="text-h6 col delivery-type">Доставка курьером</div>
                <div
                  class="text-subtitle2 col bg-positive text-center marker-received-style q-mr-sm"
                  :class="$q.screen.width <= 660 ? 'q-my-sm q-px-lg' : ''"
                >
                  Получен
                </div>
              </div>
              <div class="text-subtitle2" :class="$q.screen.width <= 660 ? 'text-center' : ''">Дата покупки: {{ order.zakazTime }}</div>
            </div>
            <div class="col text-right">
              <q-img
                v-show="$q.screen.width >= 661"
                class="img-custom-style"
                src="https://loremflickr.com/640/360"
              />
              <q-img
                class="q-ml-lg img-custom-style"
                src="https://loremflickr.com/640/360"
              />
            </div>
            <div class="text-subtitle2 col-2 text-right" v-show="$q.screen.width >= 390">
              Оплачено <span class="text-h6">{{ order.sum }}₽</span>
            </div>
          </q-card-section>
        </div>
      </div>
      <div
        v-if="!purchasedItem.length"
        class="basket-pagebasket-empty basket-empty"
      >
        <div class="basket-emptywrap text-center">
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
defineOptions({
  name: "UserAccount",
});

import { ref, onBeforeMount } from "vue";
import { collection, getDoc, getDocs, doc, arrayRemove, updateDoc, arrayUnion, setDoc, query, where } from "firebase/firestore";
import { auth, db } from "src/firebase";
import { useQuasar } from 'quasar';

const $q = useQuasar()
const purchasedItem = ref([
  {
    id: 1,
    price: 1000,
    name: "Кроссовки",
  },
]);

const userData = ref([])
const nameOfUser = ref()
const arrOfOrders = ref([])
const email = auth.currentUser?.email.toString()
onBeforeMount(async () => {
  userData.value = (await getDoc(doc(db, "usersCartAndFav", email))).data("Orders");
  nameOfUser.value = userData.value.userName
  userData.value = userData.value.Orders
  //console.log(userData.value);

  const querySnapshot = await getDocs(collection(db, "usersOrders"));
  querySnapshot.forEach((doc) => {
    arrOfOrders.value.push(
        {
          id: doc.id,
          ...doc.data()
        }
      )
  })
  //console.log(arrOfOrders.value)

  arrOfOrders.value = arrOfOrders.value.filter((item) => {
    let temp = userData.value.find((el) => {
      if (el.id === item.id) {
        return true
      }
    })
    if (temp) {
      return true
    }
  })
  console.log(arrOfOrders.value)
})
</script>

<style lang="sass" scoped>
.img-custom-style
  height: 96px
  width: 96px
  border-radius: 20px

.marker-received-style
  max-width: 100px
  height: 20px
  border-radius: 20px

.background-stroke
  border-radius: 20px

.card-custom-style
  border-radius: 20px

.delivery-type
  max-width: 200px

.user-profile
  max-width: 300px

@media (max-width: 880px) 
  .user-profile
    max-width: 1000px
</style>
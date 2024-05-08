<template>
  <q-card class="my-card flex-break" @click="showMoreInfo = true">
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
          :disable="isLoggedIn === null"
          @click.stop="addToFav"
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
      <q-btn :disable="isLoggedIn === null" no-caps class="text-bold full-width" color="primary" label="В корзину" style="border-radius: 10px;" @click.stop="addToCart"/>
    </q-card-section>
  </q-card>

  <!-- попап с карточкой -->
  <q-dialog v-model="showMoreInfo" full-width>
    <div class="bg-white pop-up-product-card-container">
      <q-card-actions class="bg-white text-teal justify-end q-mr-md q-mt-sm">
        <q-btn flat icon="close" color="primary" v-close-popup />
      </q-card-actions>
      <div class="row general-box-for-pop-ap-product-cards q-pb-xl">
        <div class="col-6 text-center q-ma-md" style="background-size:contain">
          <q-img
            class="img-pop-ap-product-cards"
            :src="tovar.imgURL"
          />
        </div>

        <div class="col q-ma-md">
          <div class="title-box">
            <p class="text-h6">{{ tovar.name }}</p>
          </div>
          <div class="shadow-5 description-box text-center q-pa-lg">
            <p class="text-h7">{{ tovar.description }}</p>
          </div>
        </div>

        <div class="col q-ma-md">
          <div class="title-box">
            <p></p>
          </div>
          <div class="shadow-5 add-to-cart-box text-center q-pa-lg">
            <div inline-action class="row items-baseline">
              <!-- <q-btn
                class="col-4 q-mb-xl"
                unelevated
                rounded
                color="positive"
                :label="tovar.price + '₽'"
                type="submit"
              /> -->
              <p class="col-3">К оплате {{ tovar.price }}₽</p>
            </div>

            <div class="row justify-between items-baseline">
              <q-btn
                class="col q-mr-sm"
                unelevated
                rounded
                :disable="isLoggedIn === null"
                color="positive"
                label="В корзину"
                type="submit"
                @click="addToCart"
              />
              <q-btn
                class="col q-ml-sm"
                unelevated
                :disable="isLoggedIn === null"
                rounded
                color="primary"
                label="В избранное"
                @click="addToFav"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue"
  import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from "src/firebase";
  import { useQuasar } from "quasar";

  // Получени ифн. о товаре
  const props = defineProps({
    tovar: {
      type: Object
    },
    favoriteToggler: {
      type: Boolean
    }
  })

  const $q = useQuasar();
  // Избранное
  let favoriteToggler = ref(props.favoriteToggler)
  // Открытие popup
  let showMoreInfo = ref(false);

  // Получение email
  const email = ref(auth.currentUser?.email.toString())
  // Проверка регистрации для работоспособности кнопок в окне
  let isLoggedIn = ref(getAuth().currentUser)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      email.value = auth.currentUser?.email.toString()
    } else {
      isLoggedIn.value = null;
      email.value = ""
    }
  });

  async function addToFav() {
    if (!favoriteToggler.value) {
      await updateDoc(doc(db, "usersCartAndFav", email.value), {
        Fav: arrayUnion({
          id: props.tovar.id,
        })
      });
    } else {
      await updateDoc(doc(db, "usersCartAndFav", email.value), {
        Fav: arrayRemove({
          id: props.tovar.id,
        })
      });
    }

    NotificationAboutFav()
  }

  async function addToCart() {
    await updateDoc(doc(db, "usersCartAndFav", email.value), {
      Cart: arrayUnion({
        id: props.tovar.id,
      })
    });

    NotificationAboutCart()
  }

  // функция срабатывающая при клике на "добавить в избранное"
  function NotificationAboutFav() {
    favoriteToggler.value = !favoriteToggler.value;
    if (favoriteToggler.value) {
      return $q.notify({
        message: "Товар добавлен в избранное!",
        color: "primary",
        badgeColor: "negative",
        badgeTextColor: "dark",
        badgeClass: "shadow-3 glossy my-badge-class",
      });
    } else {
      return $q.notify({
        message: "Товар удален из избранного!",
        color: "negative",
        badgeColor: "negative",
        badgeTextColor: "dark",
        badgeClass: "shadow-3 glossy my-badge-class",
      });
    }
  }

  // функция срабатывающая при клике на "добавить в корзину"
  function NotificationAboutCart() {
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

  //стили к pop-ap карточки товаров
  .general-box-for-pop-ap-product-cards
    height: 90%
    width: 100%

  .pop-up-product-card-container
    height: 800px
    border-radius: 50px

  .img-pop-ap-product-cards
    height: 90%
    width: 90%
    border-radius: 20px
    
  .description-box
    height: 80%
    width: 100%
    border-radius: 20px

  .add-to-cart-box
    height: 30%
    width: 80%
    border-radius: 20px

  .title-box
    height: 20%
    width: 100%

  .my-badge-class
    border: 1px solid #ccc
</style>
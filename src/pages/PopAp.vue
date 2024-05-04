<template>
  <!-- ДЛЯ ТЕСТА ПРОТИ ПО АДРЕСУ: http://localhost:8080/#/popap -->

  <!-- КНОПКИ ДЛЯ ОТОБРАЖЕНИЯ POPAP -->
  <div>
    <q-btn
      @click="popUpRegistration = true"
      class="q-mt-lg"
      color="primary"
      label="регистрация"
    />
    <q-btn
      @click="fullWidth = true"
      class="q-mt-lg"
      color="primary"
      label="карточки"
    />
    <q-btn
      @click="medium = true"
      class="q-mt-lg"
      color="primary"
      label="карточки по поиску"
    />
  </div>

  <!-- pop-ap регистрации и входа -->
  <!-- назначить на сущность по клику на которую будет работать  pop-ap : @click="popUpRegistration = true" -->

  <q-dialog v-model="popUpRegistration">
    <div class="bg-white pop-ap-registration-container">
      <div class="text-center q-ma-xl">
        <p class="text-h2 text-primary">FANSYMAG</p>
        <p class="text-h3">Введите своё имя, почту и пароль</p>
        <p class="text-h7 q-mt-md">
          Для авторизации на сервисе Вам необходимо ввести свою почту и пароль.
          Если вы еще не зарегистрированы, то вы можете создать аккаунт.
        </p>
        <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
          <q-input
            class="q-mb-md"
            outlined
            v-model="email"
            label="Ведите своё имя"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Пожалуйста, напишите что-нибудь',
            ]"
          />
          <q-input
            class="q-mb-md"
            outlined
            v-model="email"
            label="Ведите почту"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Пожалуйста, напишите что-нибудь',
            ]"
          />
          <q-input
            class="q-mb-md"
            outlined
            v-model="password"
            label="Введите пароль"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Пожалуйста, напишите что-нибудь',
            ]"
          />
          <q-btn
            @click="authorization"
            class="button-length q-mb-xl"
            unelevated
            rounded
            color="primary"
            label="Войти"
            type="submit"
          />
        </q-form>
        <q-btn
          @click="registration"
          class="button-length"
          flat
          rounded
          color="primary"
          label="Или зарегистрируйтесь"
        />
      </div>
    </div>
  </q-dialog>

  <!-- pop-ap карточек товаров  -->

  <q-dialog v-model="fullWidth" full-width>
    <div class="bg-white pop-up-product-card-container">
      <q-card-actions class="bg-white text-teal justify-end q-mr-md q-mt-sm">
        <q-btn flat icon="close" color="primary" v-close-popup />
      </q-card-actions>
      <div class="row general-box-for-pop-ap-product-cards q-pb-xl">
        <div class="col-6 text-center q-ma-md">
          <q-img
            class="img-pop-ap-product-cards"
            src="https://loremflickr.com/640/360"
          />
        </div>

        <div class="col q-ma-md">
          <div class="title-box">
            <p class="text-h6">{{ ProductName }}</p>
          </div>
          <div class="shadow-5 description-box text-center q-pa-lg">
            <p class="text-h7">{{ ProductDescription }}</p>
          </div>
        </div>

        <div class="col q-ma-md">
          <div class="title-box">
            <p></p>
          </div>
          <div class="shadow-5 add-to-cart-box text-center q-pa-lg">
            <div inline-action class="row items-baseline">
              <q-btn
                class="col-4 q-mb-xl"
                unelevated
                rounded
                color="positive"
                label="3999р"
                type="submit"
              />
              <p class="col-3">К оплате</p>
            </div>

            <div class="row justify-between items-baseline">
              <q-btn
                class="col q-mr-sm"
                unelevated
                rounded
                color="positive"
                label="В корзину"
                type="submit"
              />
              <q-btn
                class="col q-ml-sm"
                unelevated
                rounded
                color="primary"
                label="В избранное"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>

  <!-- POPAP ВЫДАЧА ТОВАРОВ ИЗ ПОИСКА -->
  <q-dialog v-model="medium">
    <q-card class="bg-white" style="width: 900px; max-width: 80vw">
      <div>hello</div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "PopAp",
});
//POPAP РЕГИСТРАЦИИ
// сонстанты  к pop-ap регистрации
const dataUser = ref([]);
const email = ref("");
const password = ref("");
// всплытие pop-ap регистрации
const popUpRegistration = ref(false);

// функция добавляет email и password в массив dataUser
function onSubmit() {
  console.log(email.value); //потом удалить
  console.log(password.value); //потом удалить

  dataUser.value.push({
    email: email.value,
    password: password.value,
  });
  console.log(dataUser.value); //потом удалить

  email.value = "";
  password.value = "";
}
// КОНЕЦ POPAP РЕГИСТРАЦИИ

// POPAP КАРТОЧЕК ТОВАРОВ

//pop-ap карточек товаров
const fullWidth = ref(false);
let ProductName =
  "Название товара.  Их обычно пишут с длинными названиями, а текст уходит в точки Название товара.  Их обычно пишут с длинными названиями, а текст уходит в точки ";
if (ProductName.length > 100) ProductName = ProductName.slice(0, 100) + "...";
let ProductDescription =
  " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sunt, natus dolorem enim pariatur eius maiores optio expedita ea qui itaque architecto. Doloribus illum qui nisi deserunt accusamus quos repudiandae!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sunt, natus dolorem enim pariatur eius maiores optio expedita ea qui itaque architecto. Doloribus illum qui nisi deserunt accusamus quos repudiandae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sunt, natus dolorem enim pariatur eius maiores optio expedita ea qui itaque architecto. Doloribus illum qui nisi deserunt accusamus quos repudiandae!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sunt, natus dolorem enim pariatur eius maiores optio expedita ea qui itaque architecto. Doloribus illum qui nisi deserunt accusamus quos repudiandae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sunt, natus dolorem enim pariatur eius maiores optio expedita ea qui itaque architecto. Doloribus illum qui nisi deserunt accusamus quos repudiandae!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sunt, natus dolorem enim pariatur eius maiores optio expedita ea qui itaque architecto. Doloribus illum qui nisi deserunt accusamus quos repudiandae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sunt, natus dolorem enim pariatur eius maiores optio expedita ea qui itaque architecto. Doloribus illum qui nisi deserunt accusamus quos repudiandae!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sunt, natus dolorem enim pariatur eius maiores optio expedita ea qui itaque architecto. Doloribus illum qui nisi deserunt accusamus quos repudiandae!";
if (ProductDescription.length > 800)
  ProductDescription = ProductDescription.slice(0, 1000) + "...";
// КОНЕЦ POPAP КАРТОЧЕК ТОВАРОВ

// POPAP ВЫДАЧА ТОВАРОВ ИЗ ПОИСКА
const medium = ref(false);
</script>

<style lang="sass" scoped>
//стили к pop-ap регистрации

.pop-ap-registration-container
  width: 513px
  height: 800px
  border-radius: 20px

.button-length
  width: 100%

//закончились стили к pop-ap

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

// POPAP ВЫДАЧА ТОВАРОВ ИЗ ПОИСКА 
</style>
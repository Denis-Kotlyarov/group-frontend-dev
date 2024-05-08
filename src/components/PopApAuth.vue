<template>

<!-- АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ--- -->
<div class="bg-white pop-ap-registration-container">
<div v-show="showDiv1">
    <div class="bg-white">
      <div class="text-center q-ma-xl">
        <p class="text-h2 text-primary">FANSYMAG</p>
        <p class="text-h3">Авторизация</p>
        <p class="text-h7 q-mt-md ">
          Для авторизации на сервисе Вам необходимо ввести свою почту и пароль.
          Если вы еще не зарегистрированы, то вы можете создать аккаунт.
        </p>
        <q-form @submit="onSubmit" class="">
          <q-input
            class="q-mb-md"
            outlined
            v-model="emailSignIn"
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
            v-model="passwordSignIn"
            label="Введите пароль"
            lazy-rules
            type="password"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Пожалуйста, напишите что-нибудь',
            ]"
          />
          <q-btn
            @click="signin"
            class="button-length q-mb-xl"
            unelevated
            style="border-radius: 10px;"
            color="primary"
            label="Войти"
            type="submit"
          />
        </q-form>
      </div>
    </div>
  </div>
<!-- РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ--- -->
  <div v-show="showDiv2">
    <div class="bg-white">
      <div class="text-center q-ma-xl">
        <p class="text-h2 text-primary">FANSYMAG</p>
        <p class="text-h3">Регистрация</p>
        <p class="text-h7 q-mt-md">
          Для авторизации на сервисе Вам необходимо ввести свою почту и пароль.
          Если вы еще не зарегистрированы, то вы можете создать аккаунт.
        </p>
        <q-form @submit="onSubmit" class="" style="width: 100%;">
          <q-input
            class="q-mb-md"
            outlined
            v-model="name"
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
            label="Введите почту"
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
            type="password"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Пожалуйста, напишите что-нибудь',
            ]"
          />
          <q-btn
            @click="register"
            class="button-length q-mb-xl"
            unelevated
            style="border-radius: 10px;"
            color="primary"
            label="Зарегистрироваться"
            type="submit"
          />
        </q-form>
      </div>
    </div>
  </div>
  <q-btn class="button-length authpopap-switch bottom-xs" style="width: 100%;" flat  color="primary" label="Или зарегистрируйтесь" @click="toggleDivs" v-show="showDiv1"></q-btn>
  <q-btn class="button-length authpopap-switch bottom-xs" style="width: 100%;" flat  color="primary" label="Или авторизуйтесь" @click="toggleDivs" v-show="showDiv2"></q-btn>
</div>
</template>

<script setup>
import {ref} from "vue";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { useRouter } from "vue-router";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "src/firebase";

// РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---РЕГИСТРАЦИЯ---
const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
  .then((data) =>{
    console.log("Registered you!");
    setDoc(doc(db, "usersCartAndFav", email.value), { //createACC@mail.com
        userEmail: email.value,
        userName: name.value,
        Cart: [],
        Fav: [],
        Orders: [], //TODO-проверить? тут новая штука от Дениса 06.05
      });
    router.push('/') //редирект на главную
  })
  .catch((error) =>{
    console.log(error.code); // ловим ошибки
    alert(error.message);
  });
};





// АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---АВТОРИЗАЦИЯ---
const emailSignIn = ref("");
const passwordSignIn = ref("");
const errMsg = ref(""); //ERROR message

const signin = () => {
  signInWithEmailAndPassword(getAuth(), emailSignIn.value, passwordSignIn.value)
  .then((data) =>{
    console.log("Signed you!");
    // console.log("Вот это текущий юзер:" + auth.currentuser) // текущий юзер
    router.push('/') //редирект на главную
  })
  .catch((error) =>{
    console.log(error.code); // ловим ошибки
    alert(error.message);
    switch (error.code) {
      case "auth/invalid-email":
        errMsg.value = "Invalid email";
        break;
      case "auth/user-not-found":
        errMsg.value = "Invalid email";
        break;
      case "auth/wrong-password":
        errMsg.value = "Incorrect password";
        break;
      case "auth/email-already-in-use":
        errMsg.value = "Аккаунт с такой почтой данными уже существует!"; // почему-то не работает
        break;
      default:
        errMsg.value = "Email or password is incorrect";
        break;
    }
  });
};
const singInWithGoogle = () => {
  
};


const showDiv1 = ref(true);
const showDiv2 = ref(false);

const toggleDivs = () => {
  showDiv1.value = !showDiv1.value;
  showDiv2.value = !showDiv2.value;
};
</script>

<style lang="scss" scoped>
//стили к pop-ap регистрации

.pop-ap-registration-container{
  width: 513px;
  height: 800px;
  border-radius: 20px;

}

.button-length{
  width: 100%;
}

//закончились стили к pop-ap

//стили к pop-ap карточки товаров

.general-box-for-pop-ap-product-cards{
  height: 90%;
  width: 100%;
}


.pop-up-product-card-container{
  height: 800px;
  border-radius: 50px;
}


.img-pop-ap-product-cards{
  height: 90%;
  width: 90%;
  border-radius: 20px;
}

.description-box{
  height: 80%;
  width: 100%;
  border-radius: 20px;
}

.add-to-cart-box{
  height: 30%;
  width: 80%;
  border-radius: 20px;
}

.title-box{
  height: 20%;
  width: 100%;
}


.authpopap-switch{
  align-self: flex-end;
}


// POPAP ВЫДАЧА ТОВАРОВ ИЗ ПОИСКА 
</style>
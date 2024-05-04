<template>
  <h1>Sign into account</h1>
  <h1>Сюда маил и пароль как минимум 6 символов(дефолт фаербазы)</h1>
  <p><input type="text" placeholder="email" v-model="email"/></p>
  <p><input type="password" placeholder="password" v-model="password"/></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="singInWithGoogle">singInWithGoogle</button></p>
</template>

<script setup>
import {ref} from "vue";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref(""); //ERROR message
const router = useRouter();

const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
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
  
}


</script>

<style>

</style>
<template>
  <h1>Create account</h1>
  <h1>Сюда маил и пароль как минимум 6 символов(дефолт фаербазы)</h1>
  <p><input type="text" placeholder="email" v-model="email"/></p>
  <p><input type="password" placeholder="password" v-model="password"/></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="singInWithGoogle">singInWithGoogle</button></p>
</template>

<script setup>
import {ref} from "vue";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
  .then((data) =>{
    console.log("Registered you!");
    router.push('/') //редирект на главную
  })
  .catch((error) =>{
    console.log(error.code); // ловим ошибки
    alert(error.message);
  });
};
const singInWithGoogle = () => {
  
}


</script>

<style>

</style>
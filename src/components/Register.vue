<template>
  <h1>Create account</h1>
  <h1>Сюда маил и пароль как минимум 6 символов(дефолт фаербазы)</h1>
  <p><input type="text" placeholder="name" v-model="name" /></p>
  <p><input type="text" placeholder="email" v-model="email"/></p>
  <p><input type="password" placeholder="password" v-model="password"/></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="singInWithGoogle">singInWithGoogle</button></p>
</template>

<script setup>
import {ref} from "vue";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { useRouter } from "vue-router";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "src/firebase";

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
      });
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
<template>
  <router-view />
</template>

<script setup>
import firebase from "firebase/compat/app"; // без этого импорта приложуха часто ломается, типо фаербазу не инициализируем
const firebaseConfig = {
  apiKey: "AIzaSyCwCG3polsWg8UK_qGpNh3P2zywdvMJm1Q",
  authDomain: "frontend-group-marketplace.firebaseapp.com",
  projectId: "frontend-group-marketplace",
  storageBucket: "frontend-group-marketplace.appspot.com",
  messagingSenderId: "103626258749",
  appId: "1:103626258749:web:14d9e813b451f748c52d54",
  measurementId: "G-5QT0VKQK30"
};
firebase.initializeApp(firebaseConfig);

// -------- здесь код для проверки того залогинен юзер или нет
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "src/firebase";
// import { useRouter } from 'vue-router'; // router is for signout redirect


const isLoggedIn = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoggedIn.value = true;
    console.log('App говорит - Юзер залогинен')
  } else {
    isLoggedIn.value = false;
    console.log('App говорит - Юзер НЕ! залогинен')
  }
  });
});
const handleSignOut = () =>{
    signOut(auth).then(() =>{
    // router.push("/");
    });
  };

defineOptions({
  name: 'App'
});

// ---сюда добавить этот код нельзя!, а нужно бы, но он инициализируется ДО создания приложения, так что хз
// import { onMounted, ref } from 'vue';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { useRouter } from 'vue-router'; // router is for signout redirect

// const router = useRouter(); // получаем референс вью раутера
// const isLoggedIn = ref(false);

// let auth;
// onMounted(() => {
//   auth = getAuth();
//   onAuthStateChanged(auth, (user) => {
//   if (user) {
//     isLoggedIn.value = true;
//   } else {
//     isLoggedIn.value = false;
//   }
//   });
// });

// const handleSignOut = () =>{
//   signOut(auth).then(() =>{
//   router.push("/") // редирект на корень раутера
//   });
// };





// // console.log("Вот это текущий юзер:" + auth.currentuser); // текущий юзер

</script>

<style>
  .container{
    max-width: 80%;
    margin-right: auto;
    margin-left: auto;
  }
  .nav-container .q-item.q-router-link--active{
    color: #bcc9fe;
  }
  .header-title .q-item.q-router-link--active{
    color: white
  }
  .list-title .q-item.q-router-link--active{
    color: white
  }
  .popup {
    position: absolute;
    left: 0;
    top:80px;
    padding: 12px;
    height: 698px;
    width: 100%;
    border-radius: 20px;
    z-index: 1000;
  }
  .popup-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.2)
  }
  .popup-z{
    z-index: 1001;
  }
  .footer{
    z-index: 999;
  }
</style>
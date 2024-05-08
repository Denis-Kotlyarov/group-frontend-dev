<template>
    <div class="container">
        <h4>Избранное</h4>
        <div v-if="favArr.length" class="flex flex-center q-gutter-x-md q-gutter-y-md q-mt-md">
            <card-component
                v-for="tovar in favArr"
                :key="tovar.id"
                :tovar="tovar"
                :favoriteToggler = "true"
            />
        </div>
        <p v-else>Похоже ничего нет...</p>
    </div>
</template>

<script setup>
import CardComponent from "src/components/CardComponent.vue";
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  getDocs,
  getDoc
} from "firebase/firestore";
import { db } from "src/firebase";

/*** firebase ref */
const tovariCollectionRef = collection(db, "tovari");

const favArr = ref([])
const userData = ref([])
const email = JSON.parse(localStorage.getItem('mail'))

onSnapshot(doc(db, "usersCartAndFav", email), (doc) => {
    favArr.value = []
    getData()
});

async function getData() {
    userData.value = (await getDoc(doc(db, "usersCartAndFav", email))).data();
    
    //Извлекаю товары, которые есть в списке избранного из общего каталога
    userData.value.Fav.forEach(async (el) => {
        let getItem = await getDoc(doc(db, "tovari", `${el.id}`))
        favArr.value.push(getItem.data())
        //Добавляю id дополнительно
        favArr.value[favArr.value.length - 1].id = el.id
    })
}
</script>

<style>
    .q-field--standout.q-field--highlighted .q-field__native,
    .q-field--standout.q-field--highlighted .q-field__prefix,
    .q-field--standout.q-field--highlighted .q-field__suffix,
    .q-field--standout.q-field--highlighted .q-field__prepend,
    .q-field--standout.q-field--highlighted .q-field__append,
    .q-field--standout.q-field--highlighted .q-field__input {
        color: inherit; /*inherit для наследования цвета текста */
    }
</style>
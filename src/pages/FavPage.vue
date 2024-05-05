<template>
    <div class="container">
        <div class="flex flex-center q-gutter-x-md q-gutter-y-md q-mt-md">
            <card-component
          class=""
          v-for="tovar in data"
          :key="tovar.id"
          :tovar="tovar"
        />
        </div>
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
} from "firebase/firestore";
import { db } from "src/firebase";

/**
 * firebase ref
 */
const tovariCollectionRef = collection(db, "tovari");
// const tovariCollectionQuery = query(todosCollectionRef, orderBy("date")); // сортировка-референс

// const tovari = ref([]);

// onMounted(() => {
//   onSnapshot(tovariCollectionRef, (querySnapshot) => {
//     const fbTovari = [];
//     querySnapshot.forEach((doc) => {
//       const tovar = {
//         id: doc.id,
//         type: doc.data().type,
//         name: doc.data().name,
//         seller: doc.data().seller,
//         description: doc.data().description,
//         price: doc.data().price,
//         popularity: doc.data().popularity,
//         imgURL: doc.data().imgURL,
//         isFav: doc.data().isFav,
//       };
//       fbTovari.push(tovar);
//       console.log(tovar)
//     });
//     tovari.value = fbTovari;
//   });
// });

const data = ref([])

    onMounted( async () => {
        const querySnapshot = await getDocs(collection(db, "tovari"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.value.push(
                {
                    id: doc.id,
                    ...doc.data()
                }
            )
        });
        console.log(data);
    })



// //Генератор рандомных товаров @click="addTodo"
// import { onMounted } from "vue";
//
//

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }

// const todosCollectionRef = collection(db, "tovari");

//   const addTodo = () => {
//     addDoc(todosCollectionRef,
//     {
//         type: 'mobile',
//         name: 'Мобильник дубликат',
//         seller: 'Продавец дубликат',
//         description: 'Описание дубликат',
//         price: getRandomInt(3000000),
//         popularity: getRandomInt(300),
//         imgURL: '',
//         isFav: false,
//     });
// };
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
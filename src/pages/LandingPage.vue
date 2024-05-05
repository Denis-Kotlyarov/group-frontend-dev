<template>
  <div class="container">
    <div class="comm1 landing-block q-pa-lg q-my-lg">
      <div class="comm1-item">
        <img
          class="round-15 img-100 col-6 col-md-4"
          src="../assets/testcommS-1.webp"
          alt="comm"
          style="max-width: 402px; flex-basis: 402px"
        />
      </div>
      <div class="comm1-item">
        <div class="flex flex-center q-gutter-x-md q-gutter-y-md q-mt-md">
          <card-component
            class=""
            v-for="tovar in data"
            :key="tovar.id"
            :tovar="tovar"
            style="max-width: 180px"
          />
        </div>
      </div>
      <div class="comm1-item">
        <img
          class="round-15 img-100 col-6 col-md-4"
          src="../assets/testcommS-2.webp"
          alt="comm"
          style="max-width: 402px; flex-basis: 402px"
        />
      </div>
    </div>
    <div
      class="flex flex-center landing-block q-my-lg bg-gr1"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 140px;
      "
    >
      <q-btn
        @click="popUpRegistration = true"
        class="text-h6"
        label="регистрация"
        style="
          border-radius: 10px;
          max-width: 40%;
          min-width: 30%;
          min-height: 50px;
          color: black;
          background-color: white;
        "
      />
    </div>

    <div class="flex-center landing-block q-pa-lg q-my-lg">
      <div>
        <h4 class="text-weight-bold">Наши новинки</h4>
      </div>
      <div class="flex flex-center q-gutter-x-md q-gutter-y-md q-mt-md">
        <!-- див с товарами -->
        <card-component
          class=""
          v-for="tovar in data"
          :key="tovar.id"
          :tovar="tovar"
        />
      </div>
    </div>

    <div
      class="flex flex-center landing-block q-my-lg bg-gr1"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 140px;
      "
    >
      <q-btn
        class="text-h6"
        label="Найти товары"
        to="/"
        style="
          border-radius: 10px;
          max-width: 40%;
          min-width: 30%;
          min-height: 50px;
          color: black;
          background-color: white;
        "
      />
    </div>

    <Register/>
    <SignIn/>

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
import Register from "src/components/Register.vue";
import SignIn from "src/components/SignIn.vue";

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

<style lang="scss" scoped>
.q-field--standout.q-field--highlighted .q-field__native,
.q-field--standout.q-field--highlighted .q-field__prefix,
.q-field--standout.q-field--highlighted .q-field__suffix,
.q-field--standout.q-field--highlighted .q-field__prepend,
.q-field--standout.q-field--highlighted .q-field__append,
.q-field--standout.q-field--highlighted .q-field__input {
  color: inherit; /*inherit для наследования цвета текста */
}

.landing-block {
  background-color: white;
  border-radius: 15px;
  width: 100%;
}
.round-15 {
  border-radius: 15px;
}
.img-100 {
  width: 100%;
  align-self: center;
}
.comm1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: calc(var(--gap) * -1);
  margin-left: calc(var(--gap) * -1);
  max-width: calc(100% + var(--gap));
  width: calc(100% + var(--gap));
}
.comm1-item {
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: var(--gap);
  margin-left: var(--gap);
  min-width: 0;
}
.bg-gr1 {
  background: linear-gradient(to left, $primary, $accent);
}
</style>
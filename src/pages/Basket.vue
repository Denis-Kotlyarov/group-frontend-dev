<template>
    <div class="container">
        <!-- Корзина загаловок -->
        <h4 class="q-py-xs q-px-xl">Корзина</h4>

        <q-page class="row justify-around">

            <!-- ТОВАР контейнер секции -->
            <div class="basket-form__basket-section__left bg-white">
                <div class="card-all column justify-evenly">

                    <!-- ТОВАР элемент -->
                    <div class="card1 row justify-around q-pt-lg">
                        <div>
                            <q-img class="basket-img" src="https://cdn.quasar.dev/img/parallax2.jpg" />
                        </div>
                        <div class="column flex-center justify-between">
                            <q-item-label>Название</q-item-label>
                            <div>
                                <q-btn flat round text-color="grey" icon="grade" />
                                <q-btn flat round text-color="grey" icon="delete" @click="removeProduct"/>
                            </div>
                        </div>
                        <div>
                            <q-item-label>Количество:</q-item-label>
                        </div>
                        <div class="text-weight-bold">
                            <q-item-label>1990 руб</q-item-label>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Функционал корзинки -->
            <div class="basket-form__basket-section__right column bg-white q-pa-lg">
                <div class="flex flex-center">
                    <q-btn @click="checkout" style="width: 250px" color="positive" label="Заказать" no-caps />
                </div>
                <p class="text-caption text-center q-mt-md">Нажмите на кнопку заказа чтобы завершить его</p>
                <div class="row col-6 q-mt-lg">
                    <div class="col-10">
                        <p class="text-h6 text-weight-bold">Ваша корзина</p>
                        <div class="row justify-between">
                            <p>Товары (n)</p>
                            <p class="text-weight-bold">1990 руб</p>
                        </div>
                    </div>
                </div>
            </div>

        </q-page>
    </div>

    <!-- popup уведомление о  покупке товара -->
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-positive text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Спасибо, что выбрали нас!!!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Заказ оформлен и оплачен
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-positive">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
    import { ref, onMounted, onBeforeMount } from "vue"
    import { collection, getDoc, getDocs, query, where, doc } from "firebase/firestore";
    import { auth, db } from "src/firebase";
    import { useQuasar } from 'quasar'

    const basketIds = ref([])
    const basketArr = ref([])
    const email = auth.currentUser?.email.toString()

    onBeforeMount( async () => {
        const docRef = doc(db, "usersCartAndFav", email);
        const docSnap = await getDoc(docRef);
        basketIds.value = docSnap.data().Cart
        //console.log(basketIds)

        const querySnapshot = await getDocs(collection(db, "tovari"));
        querySnapshot.forEach((doc) => {
            basketArr.value.push(
                {
                    id: doc.id,
                    ...doc.data()
                }
            )
        })
        //console.log(basketArr)
    })

    onMounted( async () => {
        // const querySnapshot = await getDocs(query(collection(db, "tovari")), where(findBasketItemsById(doc.id)));
        // querySnapshot.forEach((doc) => {
        //     console.log(doc.id, " => ", doc.data());
        // });
        
        console.log(basketIds)
        // console.log(basketArr)

        let filtred = ref([])

        // let basketIdsfiltred = []
        // basketIdsfiltred.push(basketIds.value)
        // console.log(basketIdsfiltred);

        // let basketArrfiltred = []
        // basketIdsfiltred.push(...basketArr.value)
        // console.log(basketArrfiltred);
        
        basketIds.value.map((item) => {
            let findItem = basketArr.value.find((ellemnt) => ellemnt.id === item)
            if (findItem !== undefined) {
                filtred.value.push(findItem)
            }
        })
        console.log(filtred)

        // console.log(basketArr.value)
    })

    // function findBasketItemsById() {
    //     let filtred = []

    //     basketIds.forEach((item) => {
    //         let item = basketArr.value.find((item) => item.id === documentId)
    //         if (item) {
    //             filtred.push(item)
    //         }
    //     })
    //     basketArr.value = filtred
    // }

    const basket = ref(true)
    const $q = useQuasar()
    const medium = ref(false)
    const persistent = ref(false)
    function checkout(){
        medium.value = true; 
        persistent.value = true;     
    }

    function removeProduct(){
        $q.notify({
            type: 'negative',
            message: 'Товар удален из корзины!!!'
        })
    }
</script>

<style lang="scss" scoped>
    .basket-form__basket-section__left {
        border-radius: 20px;
        height: 400px;
        width: 800px;
    };

    .basket-form__basket-section__right {
        border-radius: 20px;
        height: 275px;
        width: 375px;
    };

    .basket-img {
        border-radius: 10px;
        height: 100px;
        width: 100px;
    };
</style>

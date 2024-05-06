<template>
    <div class="container">
        <!-- Корзина загаловок -->
        <h4 class="q-py-xs q-px-xl">Корзина</h4>

        <q-page class="row justify-around">

            <!-- ТОВАР контейнер секции -->
            <div class="basket-form__basket-section__left bg-white q-mb-lg">
                <div class="card-all column justify-evenly">

                    <!-- ТОВАР элемент -->
                    <div 
                        class="cardEl row justify-around q-pa-md" 
                        v-for="tovar in basketArr" 
                        :key="tovar.id"
                        :class="$q.screen.width <= 750 ? 'column flex-center' : ''"
                    >
                        <div>
                            <q-img class="basket-img" :src="tovar.imgURL" />
                        </div>
                        <div class="column flex-center justify-between">
                            <q-item-label>{{ tovar.name }}</q-item-label>
                            <div>
                                <!-- <q-btn flat round text-color="grey" icon="grade" @click="addToFav"/> -->
                                <q-btn flat round text-color="grey" icon="delete" @click="removeProduct(tovar)" />
                            </div>
                        </div>
                        <!-- <div>
                            <q-item-label>Количество:</q-item-label>
                        </div> -->
                        <div class="text-weight-bold">
                            <q-item-label>{{ tovar.price }}₽</q-item-label>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Функционал корзинки -->
            <div class="basket-form__basket-section__right column bg-white q-pa-lg">
                <div class="flex flex-center">
                    <q-btn @click="createOrder" style="width: 250px" color="positive" label="Заказать" no-caps />
                </div>
                <p class="text-caption text-center q-mt-md">Нажмите на кнопку заказа чтобы завершить его</p>
                <div class="row col-6 q-mt-lg">
                    <div class="col-10">
                        <p class="text-h6 text-weight-bold">Ваша корзина</p>
                        <div class="row justify-between">
                            <p>Товары ({{ basketArr.length }})</p>
                            <p class="text-weight-bold">{{ total }}₽</p>
                        </div>
                    </div>
                </div>
            </div>

        </q-page>
    </div>

    <!-- popup уведомление о  покупке товара -->
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale" class="q-mb-md">
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
import { ref, onBeforeMount } from "vue";
import { collection, getDoc, getDocs, doc, arrayRemove, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { auth, db } from "src/firebase";
import { useQuasar } from 'quasar';
import { v4 as uuidv4 } from 'uuid';

const total = ref([])
const basketIds = ref([])
const basketArr = ref([])
const email = auth.currentUser?.email.toString()

onBeforeMount(() => {
    getData()
})

async function getData() {
    // const docRef = doc(db, "usersCartAndFav", email);
    // const docSnap = await getDoc(docRef);
    basketIds.value = (await getDoc(doc(db, "usersCartAndFav", email))).data("Cart");
    //console.log(basketIds.value.Cart.find((item) => item = 'N6oXKma7CnSsuAJkHseQ'))

    const querySnapshot = await getDocs(collection(db, "tovari"));
    querySnapshot.forEach((doc) => {
        basketArr.value.push(
            {
                id: doc.id,
                ...doc.data()
            }
        )
    })

    let filtred = ref([])

    //console.log(basketArr.value.find((ellemnt) => ellemnt.id === 'N6oXKma7CnSsuAJkHseQ'))
    //console.log(basketIds.value.Cart.find((item) => item = 'N6oXKma7CnSsuAJkHseQ'))
    basketIds.value.Cart.forEach((item) => {
        let findItem = basketArr.value.find((ellemnt) => ellemnt.id === item.id)
        //console.log(findItem)
        if (findItem !== undefined) {
            //console.log(findItem)
            filtred.value.push(findItem)
        }
    })

    basketArr.value = filtred.value

    total.value = basketArr.value.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
    //console.log(basketArr.value.findIndex((item) => item.id === "N6oXKma7CnSsuAJkHseQ"))
    //console.log(basketArr.value)
}

const $q = useQuasar()
const persistent = ref(false)

function checkout() {
    persistent.value = true;
}

async function removeProduct(item) {
    await updateDoc(doc(db, "usersCartAndFav", email), {
        Cart: arrayRemove({
            id: item.id,
        })
    });

    basketArr.value.splice(basketArr.value.findIndex((item) => item.id === "N6oXKma7CnSsuAJkHseQ"), 1)

    $q.notify({
        type: 'negative',
        message: 'Товар удален из корзины!!!'
    })

    total.value = basketArr.value.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
    //console.log(basketArr.value)
}

async function createOrder() {
    if (basketArr.value.length === 0) return false
    
    await updateDoc(doc(db, "usersCartAndFav", email), {
        Cart: []
    });

    let docID = uuidv4()

    await setDoc(doc(db, "usersOrders", docID), {
        userEmail: email,
        zakaz: [],
        sum: total.value,
        zakazTime: new Date(),
    });

    basketArr.value.forEach(async (item) => {
        await updateDoc(doc(db, "usersOrders", docID), {
            zakaz: arrayUnion({
                id: item.id
            })
        })
    })

    await updateDoc(doc(db, "usersCartAndFav", email), {
        Orders: arrayUnion({
            id: docID
        })
    })

    basketArr.value = []
    total.value = 0
    
    checkout()
}
</script>

<style lang="scss" scoped>
.basket-form__basket-section__left {
    border-radius: 20px;
    height: 80%;
    max-width: 80%;
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

@media (min-width: 1200px) {
    .basket-form__basket-section__left {
        width: 60%
    }
}
</style>

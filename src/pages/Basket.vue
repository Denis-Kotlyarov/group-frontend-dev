<template>
    <div class="container" v-if="basketArr.length">
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

    <div
        v-else
        class="basket-pagebasket-empty basket-empty q-mt-xl"
    >
        <div class="basket-emptywrap text-center">
            <q-icon name="shopping_cart" size="6em" color="grey-5" />
            <div class="basket-content_title text-h6">История заказов пуста</div>
            <p class="q-pt-md">
                Загляните на главную, чтобы выбрать товары или найдите нужное в поиске
            </p>
            <q-btn to="/" color="positive" label="Перейти на главную" />
        </div>
    </div>

    <!-- popup уведомление о  покупке товара -->
    <q-dialog v-model="showTovarPopup" persistent transition-show="scale" transition-hide="scale" class="q-mb-md">
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
import { useQuasar } from 'quasar';
import { getDoc, doc, arrayRemove, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { auth, db } from "src/firebase";
import { v4 as uuidv4 } from 'uuid';

//Сумма заказа
const total = ref(0)
//Инф. user
const userData = ref([])
//Массив для товаров в корзине
const basketArr = ref([])
//Догадаетесь...?
const email = JSON.parse(localStorage.getItem('mail'));

onBeforeMount(() => {
    getData()
})

//Получения данных
async function getData() {
    //Получаю данные пользователя из колл."usersCartAndFav". Какая же бабуйня ту была с email. Вы бы с@ka знали...
    userData.value = (await getDoc(doc(db, "usersCartAndFav", `${email}`))).data()
    //Извлекаю товары, которые есть в списке корзины из общего каталога
    userData.value.Cart.forEach(async (el) => {
        let getItem = await getDoc(doc(db, "tovari", `${el.id}`))
        basketArr.value.push(getItem.data())
        //Добавляю id дополнительно, для удаление и заказа
        basketArr.value[basketArr.value.length - 1].id = el.id

        //!КОСТЫЛЬ
        total.value += getItem.data().price
    })
}

//Для получения экрана
const $q = useQuasar()
//Popup
const showTovarPopup = ref(false)
function checkout() {
    showTovarPopup.value = true;
}

//Удалить продукт из корзины
async function removeProduct(item) {
    console.log(item.id)
    await updateDoc(doc(db, "usersCartAndFav", email), {
        Cart: arrayRemove({
            id: item.id,
        })
    });
    //Удалить локально
    basketArr.value.splice(basketArr.value.findIndex((el) => el.id === item.id), 1)
    //Пересчитать сумму
    total.value -= item.price
    //Уведомление
    $q.notify({
        type: 'negative',
        message: 'Товар удален из корзины!!!'
    })
}

//Создание заказа
async function createOrder() {
    if (basketArr.value.length === 0) return false
    //Очистка корзины
    await updateDoc(doc(db, "usersCartAndFav", email), {
        Cart: []
    });
    //Задача id заказа
    let docID = uuidv4()
    //Создание заказа
    await setDoc(doc(db, "usersOrders", docID), {
        userEmail: email,
        zakaz: [],
        sum: total.value,
        zakazTime: (new Date()).toLocaleString('ru'),
    });
    //Выгружаем содержимое товара в заказ (id товаров)
    basketArr.value.forEach(async (item) => {
        await updateDoc(doc(db, "usersOrders", docID), {
            zakaz: arrayUnion({
                id: item.id
            })
        })
    })
    //Запись ID заказа у пользователя
    await updateDoc(doc(db, "usersCartAndFav", email), {
        Orders: arrayUnion({
            id: docID
        })
    })
    //Обнуляем корзину и сумму
    basketArr.value = []
    total.value = 0
    //Уведомляем
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

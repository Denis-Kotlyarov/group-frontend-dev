<template>
    <div class="container">
        <h4 class="q-py-xs q-px-xl">Корзина</h4>

<!--Когда корзина пуста
            <div class="basket-page__basket-empty basket-empty">
                <div class="basket-empty__wrap text-center">
                    <q-icon name="shopping_cart" size="6em" color="grey-5" />
                    <div class="basket-content_title text-h6">В корзине пока пусто</div>
                    <p class="q-pt-md">Загляните на главную, чтобы выбрать товары или найдите нужное в поиске</p>
                    <q-btn to="/" color="positive" label="Перейти на главную" no-caps/>
                </div>
            </div>-->

<!--Когда корзина не пуста-->
<q-page class="row justify-around">

    <div class="basket-form__basket-section__left bg-white">

        <div class="card-all column justify-evenly">

            <div class="card1 row justify-around q-pt-lg">
                <div>
                    <q-img class="basket-img" src="https://cdn.quasar.dev/img/parallax2.jpg" />
                </div>
                <div class="column flex-center justify-between">
                    <q-item-label>Название</q-item-label>
                    <div>
                        <q-btn to="/" flat round text-color="grey" icon="grade" />
                        <q-btn to="/" flat round text-color="grey" icon="delete" />
                    </div>
                </div>
                <div>
                    <q-item-label>Количество:</q-item-label>
                </div>
                <div class="text-weight-bold">
                    <q-item-label>1990 руб</q-item-label>
                </div>
            </div>

            <div class="card2 row justify-around q-pt-lg">
                <div>
                    <q-img class="basket-img" src="https://cdn.quasar.dev/img/parallax2.jpg" />
                </div>
                <div class="column flex-center justify-between">
                    <q-item-label>Название</q-item-label>
                    <div>
                        <q-btn to="/" flat round text-color="grey" icon="grade" />
                        <q-btn to="/" flat round text-color="grey" icon="delete" />
                    </div>
                </div>
                <div>
                    <q-item-label>Количество:</q-item-label>
                </div>
                <div class="text-weight-bold">
                    <q-item-label>1990 руб</q-item-label>
                </div>
            </div>

            <div class="card3 row justify-around q-pt-lg">
                <div>
                    <q-img class="basket-img" src="https://cdn.quasar.dev/img/parallax2.jpg" />
                </div>
                <div class="column flex-center justify-between">
                    <q-item-label>Название</q-item-label>
                    <div>
                        <q-btn to="/" flat round text-color="grey" icon="grade" />
                        <q-btn to="/" flat round text-color="grey" icon="delete" />
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



    <div class="basket-form__basket-section__right column bg-white q-pa-lg">

        <div class="flex flex-center">
            <q-btn style="width: 250px" to="/user" color="positive" label="Заказать" no-caps />
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

</template>

<script setup>

</script>

<style lang="scss" scoped>
.basket-form__basket-section__left {
    border-radius: 20px;
    height: 400px;
    width: 800px;
}

;

.basket-form__basket-section__right {
    border-radius: 20px;
    height: 275px;
    width: 375px;
}

;

.basket-img {
    border-radius: 10px;
    height: 100px;
    width: 100px;
}
</style>

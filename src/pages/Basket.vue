<template>
    <q-page class="bg-secondary column">
        <h4 class="q-pa-xl">Корзина</h4>
        <q-card>
            <q-card-section>
                <!--Когда корзина пуста-->
                <div class="basket-page__basket-empty basket-empty">
                    <div class="basket-empty__wrap text-center">
                        <q-icon name="shopping_cart" size="6em" color="grey-5" />
                        <div class="basket-content_title text-h6">В корзине пока пусто</div>
                        <p class="q-pt-md">Загляните на главную, чтобы выбрать товары или найдите нужное в поиске</p>
                        <q-btn to="/" color="positive" label="Перейти на главную" />
                    </div>
                </div>

            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>

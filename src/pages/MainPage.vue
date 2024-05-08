<template>
    <div class="container">
        <h6 v-if="true" class="q-mb-lg">Запрос который ввел пользователь в строке поиска...</h6>
        <div class="q-mb-lg search-container">
            <q-input bg-color="white" placeholder="Поиск" v-model="searchText" class="text-black text-body1"
                color="black">
                <template v-slot:append>
                    <q-btn round dense flat icon="search" />
                </template>
            </q-input>
        </div>
        <div v-if="$q.screen.width >= 880" class="btns-container flex q-gutter-x-md q-gutter-y-md q-mb-lg text-h3">
            <q-btn label="По популярности" no-caps class="text-subtitle1" />
            <q-btn label="По популярности" no-caps class="text-subtitle1" />
            <q-btn label="По популярности" no-caps class="text-subtitle1" />
            <q-btn label="По популярности" no-caps class="text-subtitle1" />
        </div>

        <q-select v-else standout v-model="model" :options="options" label="Фильтр" bg-color="secondary"
            color="black" />

        <div class="flex flex-center q-gutter-x-md q-gutter-y-md q-mt-md">
            <card-component class="" v-for="n in 10" :key="n" />
        </div>
    </div>
</template>

<script setup>
    import CardComponent from 'src/components/CardComponent.vue';
    import { useQuasar } from 'quasar';
    import { ref } from 'vue';

    const $q = useQuasar()
    const model = ref(null)
    const options = ref([
        'По популярности',
        'По популярности',
        'По популярности',
        'По популярности',
    ])    
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
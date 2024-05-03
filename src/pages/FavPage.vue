<template>
    <div class="container">
        <h6 v-if="true" class="q-mb-lg">Это компонент Избранное</h6>

        <q-select v-else standout v-model="model" :options="options" label="Фильтр" bg-color="secondary" color="black"/>

        <div class="flex flex-center q-gutter-x-md q-gutter-y-md q-mt-md">
            <card-component class="" v-for="n in 10" :key="n"/>
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
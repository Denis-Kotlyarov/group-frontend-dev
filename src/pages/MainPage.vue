<template>
    <div class="container">
        <h6 v-if="true" class="q-mb-lg">Запрос который ввел пользователь в строке поиска...</h6>
        <div v-if="$q.screen.width >= 880" class="btns-container flex q-gutter-x-md q-gutter-y-md q-mb-lg text-h3">
            <q-btn label="По популярности" no-caps class="text-subtitle1"/>
            <q-btn label="По цене" no-caps class="text-subtitle1"/>
            <q-btn label="По наименованию" no-caps class="text-subtitle1"/>
            <q-btn label="По типу товара" no-caps class="text-subtitle1"/>
            <q-btn label="Сначала избранное" no-caps class="text-subtitle1"/>
        </div>

        <q-select v-else standout v-model="model" :options="options" label="Фильтр" bg-color="secondary" color="black"/>
    </div>

    <div class="cont flex q-gutter-x-md q-gutter-y-md q-mt-md" :class="$q.screen.width <= 739 ? 'flex-center' : ''">
        <card-component class="" v-for="tovar in data" :key="tovar.id" :tovar="tovar"/>
    </div>
</template>

<script setup>
    import CardComponent from 'src/components/CardComponent.vue';
    import { useQuasar } from 'quasar';
    import { ref, onMounted } from 'vue';
    import { db } from 'src/firebase';
    import { collection, getDocs } from "firebase/firestore";

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

    const $q = useQuasar()
    const model = ref(null)
    const options = ref([
        'По популярности',
        'По цене',
        'По наименованию',
        'По типу товара',
        'Сначала избранное',
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
    .cont {
        width: 80%;
        margin: 0 auto;
    }
</style>
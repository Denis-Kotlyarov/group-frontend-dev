<template>
    <div class="container">
        <h6 v-if="true" class="q-mb-lg"></h6>
        <div v-if="$q.screen.width >= 880" class="btns-container flex items-center no-wrap q-gutter-x-md q-gutter-y-md q-mb-lg text-h3">
            <q-btn label="По популярности" no-caps class="text-subtitle1" @click="typeOfFillter = 'По популярности'"/>
            <q-btn label="По цене" no-caps class="text-subtitle1" @click="typeOfFillter = 'По цене'"/>
            <q-btn label="По наименованию" no-caps class="text-subtitle1" @click="typeOfFillter = 'По наименованию'"/>
            <q-btn label="По типу товара" no-caps class="text-subtitle1" @click="typeOfFillter = 'По типу товара'"/>
            <!-- <q-btn label="Сначала избранное" no-caps class="text-subtitle1" @click="typeOfFillter = 'Сначала избранное'"/> -->

            <q-icon name="close" size="md" class="q-ml-md cursor-pointer" v-ripple @click="clearFillter"/>
        </div>
        
        <div v-else class="row flex-center q-mb-md no-wrap">
            <q-select standout v-model="typeOfFillter" :options="options" label="Фильтр" bg-color="secondary" color="black" class="full-width"/>
            <q-icon name="close" size="md" class="q-ml-md cursor-pointer" v-ripple @click="clearFillter"/>
        </div>
    </div>

    <div class="cont flex q-gutter-x-md q-gutter-y-md q-mt-md" :class="$q.screen.width <= 739 ? 'flex-center' : ''">
        <card-component v-for="tovar in data" :key="tovar.id" :tovar="tovar" :favoriteToggler="checkFav(tovar)"/>
    </div>
</template>

<script setup>
    import CardComponent from 'src/components/CardComponent.vue';
    import { useQuasar } from 'quasar';
    import { ref, onMounted, watch, defineProps } from 'vue';
    import { db } from 'src/firebase';
    import { collection, getDocs, query, orderBy, getDoc, doc } from "firebase/firestore";

    const typeOfFillter = ref('')
    const modelForFB = ref('')

    const userData = ref([])
    const email = JSON.parse(localStorage.getItem('mail'));
    
    const $q = useQuasar()
    const options = ref([
        'По популярности',
        'По цене',
        'По наименованию',
        'По типу товара',
        //'Сначала избранное'
    ])
    
    const data = ref([])

    onMounted( async () => {
        userData.value = (await getDoc(doc(db, "usersCartAndFav", email))).data();
        getData()
    })

    function checkFav(tovar) {
        const res = userData.value.Fav.reduce((acc, item) => {
            if (item.id === tovar.id) {
                return acc += 1
            }
            return acc
        }, 0)
    
        if (res > 0) {
            return true
        } else {
            return false
        }
    }

    async function getData() {
        const querySnapshot = await getDocs(collection(db, "tovari"));
        let tempArr = []
        querySnapshot.forEach((doc) => {
            tempArr.push(
                {
                    id: doc.id,
                    ...doc.data()
                }
            )
        });
        data.value = tempArr
    }

    async function fillterData(modelForFB) {
        const querySnapshot = await getDocs(query(collection(db, "tovari"), orderBy(modelForFB)));
        let tempArr = []
        querySnapshot.forEach((doc) => {
            tempArr.push(
                {
                    id: doc.id,
                    ...doc.data()
                }
            )
        })
        data.value = tempArr
        
        // if (modelForFB === 'name' || modelForFB === 'type') {
        //     data.value.sort((item1, item2) => item1[modelForFB].localeCompare(item2[modelForFB]));
        //     //console.log(data.value)
        // } else {
        //     data.value.sort((item1, item2) => item1[modelForFB] - item2[modelForFB]);
        //     //console.log(data.value)
        // }
    }
    
    async function clearFillter() {
        getData()
        typeOfFillter.value = ""
    }

    watch(typeOfFillter, () => {
        switch (typeOfFillter.value) {
            case 'По популярности':
                modelForFB.value = 'popularity'
                break;
            case 'По цене':
                modelForFB.value = 'price'
                break;
            case 'По наименованию':
                modelForFB.value = 'name'
                break;
            case 'По типу товара':
                modelForFB.value = 'type'
                break;
            case 'Сначала избранное':
                modelForFB.value = 'popularity'
            default:
                return
        }
        fillterData(modelForFB.value)
    })
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
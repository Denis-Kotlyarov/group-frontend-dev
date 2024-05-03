<template>
    <div class="container">
        <div class="comm1 landing-block q-pa-lg q-my-lg">
            <div class="comm1-item">
                <img class="round-15 img-100 col-6 col-md-4" src="../assets/testcommS-1.webp" alt="comm" style="max-width: 402px;flex-basis: 402px;">
            </div>
            <div class="comm1-item">
                <div class="flex flex-center q-gutter-x-md q-gutter-y-md q-mt-md">
                    <card-component class="" v-for="n in 2" :key="n" style="max-width: 180px;"/>
                </div>
            </div>
            <div class="comm1-item">
                <img class="round-15 img-100 col-6 col-md-4" src="../assets/testcommS-2.webp" alt="comm" style="max-width: 402px;flex-basis: 402px;">
            </div>
        </div>
        <div class="flex flex-center landing-block q-my-lg bg-gr1" style="display: flex;justify-content: center;align-items: center;min-height: 140px;">
                <q-btn
                @click="popUpRegistration = true"
                class="text-h6"
                label="регистрация"
                style="border-radius: 10px; max-width: 40%;min-width: 30%; min-height: 50px; color: black; background-color: white;"
                />
        </div>

        <div class="flex-center landing-block q-pa-lg q-my-lg">
            <div>
                <h4 class="text-weight-bold">Наши новинки</h4>
            </div>
            <div class="flex flex-center q-gutter-x-md q-gutter-y-md q-mt-md"> <!-- див с товарами -->
                <card-component class="" v-for="n in 10" :key="n"/>
            </div>
        </div>

        <div class="flex flex-center landing-block q-my-lg bg-gr1" style="display: flex;justify-content: center;align-items: center;min-height: 140px;">
                <q-btn
                class="text-h6"
                label="Найти товары"
                to='/'
                style="border-radius: 10px; max-width: 40%;min-width: 30%; min-height: 50px; color: black; background-color: white;"
                />
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
        'По цене',
        'По наименованию',
        'По типу товара',
        'Сначала избранное',
    ])
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

    .landing-block{
        background-color: white;
        border-radius: 15px;
        width: 100%;
    }
    .round-15{
        border-radius: 15px;
    }
    .img-100{
        width: 100%;
        align-self: center;
    }
    .comm1 {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: calc(var(--gap)* -1);
    margin-left: calc(var(--gap)* -1);
    max-width: calc(100% + var(--gap));
    width: calc(100% + var(--gap));
    }
    .comm1-item{
    align-items: stretch;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: var(--gap);
    margin-left: var(--gap);
    min-width: 0;
    }
    .bg-gr1{
        background: linear-gradient(to left, $primary, $accent)
    }
</style>
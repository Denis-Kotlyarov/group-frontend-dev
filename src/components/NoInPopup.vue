<template>
  <div class="q-pa-md example-masonry">

    <q-btn class="q-mb-md" color="primary" label="Regenerate layout" @click="onClick" />

    <div class="column example-container flex-break">
      <div class="flex wrap example-cell" tabindex="0">
        <card-component v-for="tovar in data" :key="tovar.id" :tovar="tovar"></card-component>
      </div>
    </div>

  </div>
</template>

<script setup>
import CardComponent from 'src/components/CardComponent.vue';
    import { useQuasar } from 'quasar';
    import { ref, onMounted, watch, defineProps } from 'vue';
    import { db } from 'src/firebase';
    import { collection, getDocs, query, orderBy } from "firebase/firestore";

  const data = ref([])
  onMounted( async () => {
        getData()
    })

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
</script>

<style lang="sass">
.flex-break
  flex: 1 0 100% !important
.row
  .flex-break
    height: 0 !important
.column
  .flex-break
    width: 0 !important
</style>
<template>
  <q-layout view="lHh Lpr lff">
    <!-- Голова -->
    <q-header class="header">
      <div class="wrapper">
        <q-toolbar class="flex justify-between">
          
          <!-- Контейнер для логотипа и навигационной кнопки -->
          <div class="flex items-center">
            <q-btn
              v-if="$q.screen.lt.md"
              flat
              dense
              round
              size="lg"
              icon="menu"
              aria-label="Menu"
              class="q-mr-sm"
              @click="toggleLeftDrawer"
            />
            <div v-if="$q.screen.gt.xs" class="text-h4"> 
              FANSYMAG
            </div>
          </div>

          <!-- Контейнер для поиска -->
          <div class="q-px-md q-py-xs q-my-md q-mx-md bg-white search-container">
            <q-input borderless bg-color="white" placeholder="Поиск" v-model="text" class="text-black text-body1" color="black">
              <template v-slot:append>
                <q-btn round dense flat icon="search" />
              </template>
            </q-input>
          </div>

          <!-- Контейнер для навигационных иконок (скрываются на меньшем экране) -->
          <div class="flex items-center nav-container q-gutter-x-md" v-if="$q.screen.gt.sm">
            <q-item class="flex column items-center q-gutter-y-sm rounded-borders" :class="$q.screen.width <= 1029 ? 'q-ml-none' : ''" clickable v-ripple to="/404" avatar exact>
              <q-icon name="account_circle" size="md"/>
              <q-item-label class="">
                Кабинет
              </q-item-label>
            </q-item>

            <q-item class="flex column items-center q-gutter-y-sm rounded-borders" clickable v-ripple to="/404" avatar exact>
              <q-icon name="grade" size="md"/>
              <q-item-label class="">
                Избранное
              </q-item-label>
            </q-item>

            <q-item class="flex column items-center q-gutter-y-sm rounded-borders" clickable v-ripple to="/404" avatar exact>
              <q-icon name="shopping_basket" size="md"/>
              <q-item-label class="">
                Корзина
              </q-item-label>
            </q-item>
          </div>
        </q-toolbar>
      </div>
      
    </q-header>
    <!-- Выдвижная панель слева -->
    <q-drawer
      v-if="$q.screen.lt.md"
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list class="flex column q-gutter-y-sm">
        <!-- Выдвижная панель - загаловок -->
        <q-item-label class="text-h5 text-primary list-title" header>
          FANSYMAG
        </q-item-label>

        <!-- Выдвижная панель - ссылки -->
        <q-item
          clickable
          tag="a"
          target="_blank"
          class="flex items-center q-gutter-x-sm q-pa-md list-item"
          to="/404"
        >
          <q-icon name="contacts" size="md"/>
          <q-item-label class="text-subtitle1">
            Кабинет
          </q-item-label>
        </q-item>

        <q-item
          clickable
          tag="a"
          target="_blank"
          class="flex items-center q-gutter-x-sm q-pa-md list-item"
          to="/404"
        >
          <q-icon name="grade" size="md"/>
          <q-item-label class="text-subtitle1">
            Избранное
          </q-item-label>
        </q-item>

        <q-item
          clickable
          tag="a"
          target="_blank"
          class="flex items-center q-gutter-x-sm q-pa-md list-item"
          to="/404"
        >
          <q-icon name="style" size="md"/>
          <q-item-label class="text-subtitle1">
            Корзина
          </q-item-label>
        </q-item>
      </q-list>
    </q-drawer>
    
    <!-- Содержимое layout -->
    <q-page-container>
      <router-view />
      <!-- <div class="wrapper">
        <div v-for="n in 100" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quisquam assumenda, commodi maxime asperiores nobis deleniti distinctio eum sit ea voluptas officia placeat. Est, ab non fuga soluta nostrum ipsam!
        </div>
      </div> -->
    </q-page-container>

    <!-- Footer -->
    <q-footer class="text-white footer">
      <div class="wrapper">
        <q-toolbar class="flex flex-center q-gutter-x-xs">
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar> -->
          <q-item class="flex column text-center q-pa-md">
            <p>2004-2024 &#169 <b>FANSYMAG</b> - интернет-магазин. Все права защищены.</p>
            <p class="text-caption q-mb-none">Доставка по всей России. На торговой площадке sitename.ru применяются рекомендательные технологии.</p>
            <p class="text-caption">Адрес для направления юридически значимых сообщений: <a href="mailto:sales@sitename.ru" class="text-white cursor-pointer">sales@sitename.ru</a></p>
          </q-item>
        </q-toolbar>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

defineOptions({
  name: 'MainLayout'
})

const $q = useQuasar()
const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped lang="scss">
  .search-container {
    width: 48%;
    border-radius: 20px;
  }
  .wrapper {
    max-width: 1440px;
    margin: 0 auto;
  }
  .header, .footer {
    background: $main-gradient;
  }
  .list-title {
    background: #8a8aff6b;
    padding: 33px 15px;
  }
  .list-item {
    transition: all 0.3s ease-in-out;
  }
  .list-item:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 600px) {
    .search-container {
      width: 80%;
    }
  }
  @media (max-width: 1023px) and (min-width: 619px) {
    .search-container {
      width: 55%;
    }
  }
</style>

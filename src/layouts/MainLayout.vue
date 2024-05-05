<template>
  <q-layout view="lHh Lpr lff">
    <!-- Голова -->
    <q-header class="header">
      <div class="wrapper">
        <q-toolbar class="row justify-between">
          
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
            <div v-if="$q.screen.gt.xs" class="text-h4 cursor-pointer header-title"> 
              <q-item to="/" >FANSYMAG</q-item>
            </div>
          </div>

          <!-- Контейнер для поиска -->
          <div class="q-px-md q-py-xs q-my-md q-mx-md bg-white col search-container popup-z">
            <q-input borderless bg-color="white" placeholder="Поиск" v-model="text" class="text-black text-body1 popup-z" color="black" @click="popup=true">
              <template v-slot:append>
                <q-btn round dense flat icon="search" clickable to='/'/>
              </template>
              <!-- popua для поиска -------------------------------------------------------------------------------------------->
            </q-input>
            <div class="bg-white seach-popup" v-if="popup">
              <div class="flex flex-center q-gutter-x-md q-gutter-y-md q-mt-md" style="max-height: calc(100vh - 150px); overflow-y: auto; pointer-events: all;">
                <card-component class="" v-for="n in 10" :key="n"/>
              </div>
            </div>
            
          </div>
          <!-- Контейнер для навигационных иконок (скрываются на меньшем экране) -->
          <div class="flex items-center nav-container q-gutter-x-md" v-if="$q.screen.gt.sm">
            <q-item 
              class="flex column items-center q-gutter-y-sm rounded-borders"
              clickable 
              v-ripple
              to='/user' 
              avatar 
              exact
            >
              <q-icon name="account_circle" size="md"/>
              <q-item-label class="">
                Кабинет
              </q-item-label>
            </q-item>

            <q-item 
              class="flex column items-center q-gutter-y-sm rounded-borders" 
              clickable 
              v-ripple 
              to="/favpage" 
              avatar 
              exact
            >
              <q-icon name="grade" size="md"/>
              <q-item-label class="">
                Избранное
              </q-item-label>
            </q-item>

            <q-item 
              class="flex column items-center q-gutter-y-sm rounded-borders" 
              clickable 
              v-ripple 
              to='/basket'  
              avatar 
              exact
            >
              <q-icon name="shopping_basket" size="md"/>
              <q-item-label class="">
                Корзина
              </q-item-label>
            </q-item>
          </div>
          <div class="popup-bg" v-if="popup" @click="popup=false"></div>
        </q-toolbar>
      </div>
      
    </q-header>
    <!-- Выдвижная панель слева -->
    <q-drawer
      v-if="$q.screen.lt.md"
      v-model="leftDrawerOpen"
    >
      <q-list class="flex column q-gutter-y-sm">
        <!-- Выдвижная панель - загаловок -->
        <q-item-label class="text-h5 text-white list-title" header>
          <q-item to="/">FANSYMAG</q-item>
        </q-item-label>

        <!-- Выдвижная панель - ссылки -->
        <q-item
          clickable
          tag="a"
          class="flex items-center q-gutter-x-sm q-pa-md list-item"
          :to="{ path: '/user' }" 
        >
          <q-icon name="contacts" size="md"/>
          <q-item-label class="text-subtitle1">
            Кабинет
          </q-item-label>
        </q-item>

        <q-item
          clickable
          tag="a"
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
          class="flex items-center q-gutter-x-sm q-pa-md list-item"
          to="/basket"  
        >
          <q-icon name="shopping_basket" size="md"/>
          <q-item-label class="text-subtitle1">
            Корзина
          </q-item-label>
        </q-item>
      </q-list>
    </q-drawer>
    
    <!-- Содержимое layout -->
    <q-page-container :class="$route.fullPath === '/' ? '' : 'bg-secondary'">
      <router-view/>
      <!-- 
      <div class="wrapper">
        <div v-for="n in 100" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quisquam assumenda, commodi maxime asperiores nobis deleniti distinctio eum sit ea voluptas officia placeat. Est, ab non fuga soluta nostrum ipsam!</div>
      </div>
      -->
    </q-page-container>
    
    <div style="height: 40px; width: 100%;"></div>

    <!-- Footer -->
    <q-footer class="text-white footer">
      <div class="wrapper">
        <q-toolbar class="flex flex-center q-gutter-x-xs">
          <q-item class="flex column text-center q-pa-md">
            <p>2004-2024 © <b>FANSYMAG</b> - интернет-магазин. Все права защищены.</p>
            <p class="text-caption q-mb-none">Доставка по всей России. На торговой площадке sitename.ru применяются рекомендательные технологии.</p>
            <p class="text-caption">Адрес для направления юридически значимых сообщений: <a href="mailto:sales@sitename.ru" class="text-white cursor-pointer">sales@sitename.ru</a></p>
          </q-item>
          <q-btn @click="handleSignOut" v-if="isLoggedIn">Выйти из аккаунта</q-btn>
        </q-toolbar>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
  import { useQuasar } from 'quasar'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import CardComponent from 'src/components/CardComponent.vue';

  defineOptions({
    name: 'MainLayout'
  })

  const $q = useQuasar()
  const $route = useRoute()
  const leftDrawerOpen = ref(false)
  const popup = ref(false)

  function toggleLeftDrawer () {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
  


// -------- здесь код для проверки того залогинен юзер или нет
import { onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "src/firebase";
// import { useRouter } from 'vue-router'; // router is for signout redirect


const isLoggedIn = ref(false);


onMounted(() => {
  onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoggedIn.value = true;
    console.log('MainLayout говорит - Юзер залогинен')
  } else {
    isLoggedIn.value = false;
    console.log('MainLayout говорит - Юзер НЕ! залогинен')
  }
  });
});

const handleSignOut = () =>{
  signOut(auth).then(() =>{
  // router.push("/");
  });
};
</script>

<style scoped lang="scss">
  .search-container {
    width: 48%;
    border-radius: 20px;
    position: relative;
  }
  .popup {
    position: absolute;
    left: 0;
    top:80px;
    padding: 12px;
    height: 698px;
    width: 100%;
    border-radius: 20px;
    z-index: 1000;
  }
  .popup-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.2);
  }
  .popup-z{
    z-index: 1001;
  }
  .wrapper {
    max-width: 1440px;
    margin: 0 auto;
  }
  .header, .footer {
    background: $main-gradient;
  }
  .list-title {
    background: $main-gradient;
    padding: 34px 15px;
  }
  .list-item {
    transition: all 0.3s ease-in-out;
  }
  .list-item:hover {
    background-color: #f5f5f5;
  }
  .active {
    background-color: #f5f5f5;
  }
  .footer{
    z-index: 999;
  }
  .seach-popup {
    position: absolute;
    left: 0;
    top:80px;
    padding: 12px;
    width: 100%;
    border-radius: 20px;
    z-index: 1000;
  }
</style>
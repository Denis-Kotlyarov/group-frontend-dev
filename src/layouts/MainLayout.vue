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
            <div
              v-if="$q.screen.gt.xs"
              class="text-h4 cursor-pointer header-title"
            >
              <q-item to="/">FANSYMAG</q-item>
            </div>
          </div>

          <!-- Контейнер для поиска -->
          <div class="q-px-md q-py-xs q-my-md q-mx-md bg-white col search-container popup-z">
            <q-input borderless bg-color="white" placeholder="Поиск" v-model="searchText" class="text-black text-body1 popup-z" color="black" @click="popup=true">
              <template v-slot:append>
                <q-btn round dense flat icon="search" clickable to="/search"/>
              </template>
            </q-input>

            <!-- popua для поиска -------------------------------------------------------------------------------------------->
            <div class="bg-white seach-popup" v-if="popup">
              <div class="flex flex-center q-gutter-x-md q-gutter-y-md q-mt-md scroll-popup-search">
                <card-component class="" v-for="tovar in data" :key="tovar.id" :tovar="tovar"/>
              </div>
            </div>
          </div>
          <!-- Контейнер для навигационных иконок (скрываются на меньшем экране) -->
          <div
            class="flex items-center nav-container q-gutter-x-md"
            v-if="$q.screen.gt.sm"
          >
            <q-item
              class="flex column items-center q-gutter-y-sm rounded-borders"
              clickable
              v-ripple
              to="/user"
              avatar
              exact
            >
              <q-icon name="account_circle" size="md" />
              <q-item-label class=""> Кабинет </q-item-label>
            </q-item>

            <q-item 
              class="flex column items-center q-gutter-y-sm rounded-borders" 
              clickable 
              v-ripple 
              to="/favpage" 
              avatar 
              exact
            >
              <q-icon name="grade" size="md" />
              <q-item-label class=""> Избранное </q-item-label>
            </q-item>

            <q-item
              class="flex column items-center q-gutter-y-sm rounded-borders"
              clickable
              v-ripple
              to="/basket"
              avatar
              exact
            >
              <q-icon name="shopping_basket" size="md" />
              <q-item-label class=""> Корзина </q-item-label>
            </q-item>
          </div>

          <!-- popua для поиска -------------------------------------------------------------------------------------------->
          <div class="popup-bg" v-if="popup" @click="popup=false"></div>

        </q-toolbar>
      </div>
    </q-header>
    <!-- Выдвижная панель слева -->
    <q-drawer v-if="$q.screen.lt.md" v-model="leftDrawerOpen">
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
          <q-icon name="contacts" size="md" />
          <q-item-label class="text-subtitle1"> Кабинет </q-item-label>
        </q-item>

        <q-item
          clickable
          tag="a"
          class="flex items-center q-gutter-x-sm q-pa-md list-item"
          to="/404"
        >
          <q-icon name="grade" size="md" />
          <q-item-label class="text-subtitle1"> Избранное </q-item-label>
        </q-item>

        <q-item
          clickable
          tag="a"
          class="flex items-center q-gutter-x-sm q-pa-md list-item"
          to="/basket"
        >
          <q-icon name="shopping_basket" size="md" />
          <q-item-label class="text-subtitle1"> Корзина </q-item-label>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Содержимое layout -->
    <q-page-container :class="$route.fullPath === '/search' ? '' : 'bg-secondary'">
      <router-view />
    </q-page-container>

    <!-- Чат -->
    <q-btn
      @click="BotGreeting"
      class="icon-chat bg-primary"
      icon="chat"
      style="color: white;"
    ></q-btn>

    <!-- popup чата -->
    <q-dialog v-model="medium">
      <q-card class="popup-chat-box">
        <q-card-section class="chat-header q-mt-xs">
          <p class="text-h5 q-ml-lg">
            <span class="text-h4 text-primary q-mr-md">FANSYMAG</span>Поддержка
            FANSYMAG
          </p>
        </q-card-section>

        <q-card-section>
          <div class="scrollContainer" ref="scrollContainer">
            <q-chat-message
              class="q-ml-lg q-mr-lg"
              v-for="(message, index) in Chat"
              :key="index"
              :name="message.name"
              :text="message.text"
              :stamp="message.stamp"
              :sent="message.sent"
            />
          </div>
        </q-card-section>

        <q-card-section class="chat-footer row justify-between">
          <q-input
            class="col-9 q-ml-lg"
            @keyup.enter="ChatPush"
            outlined
            v-model="TextChat"
            label="Ваше сообщение..."
          />
          <div class="col-1 q-mr-xl">
            <q-btn
              @click="ChatPush"
              size="lg"
              push
              color="primary"
              round
              icon="chat"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div style="height: 40px; width: 100%"></div>

    <!-- Footer -->
    <q-footer class="text-white footer">
      <div class="wrapper">
        <q-toolbar class="flex flex-center q-gutter-x-xs">
          <q-item class="flex column text-center q-pa-md">
            <p>
              2004-2024 © <b>FANSYMAG</b> - интернет-магазин. Все права
              защищены.
            </p>
            <p class="text-caption q-mb-none">
              Доставка по всей России. На торговой площадке sitename.ru
              применяются рекомендательные технологии.
            </p>
            <p class="text-caption">
              Адрес для направления юридически значимых сообщений:
              <a
                href="mailto:sales@sitename.ru"
                class="text-white cursor-pointer"
                >sales@sitename.ru</a
              >
            </p>
          </q-item>
          <q-btn @click="handleSignOut" v-if="isLoggedIn" to="/">Выйти из аккаунта</q-btn>
        </q-toolbar>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
  import { useQuasar } from 'quasar'
  import { ref, watch, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import CardComponent from 'src/components/CardComponent.vue';
  import { db, auth } from 'src/firebase';
  import { collection, getDocs, query } from "firebase/firestore";
  import { onAuthStateChanged, signOut } from 'firebase/auth';
  import { date } from 'quasar'

  defineOptions({
    name: "MainLayout",
  });

  const $q = useQuasar();
  const $route = useRoute();

  const leftDrawerOpen = ref(false);
  const popup = ref(false);
  const medium = ref(false);

  const data = ref([])
  const searchText = ref('')

  const scrollContainer = ref(null);

  const TextChat = ref([""]);
  const Chat = ref([]);

  function BotGreeting() {
    medium.value = true;
    if (Chat.value.length === 0) {
      setTimeout(() => {
        let timeStamp = Date.now();
        let formattedString = date.formatDate(timeStamp, 'HH:mm:ss')
        Chat.value.push({
          name: "Ваш покорный слуга ",
          text: ["Чем я могу вам помочь?"],
          stamp: formattedString,
          sent: false,
        });
      }, "1000");
    }
  }

  function ChatPush() {
    if (TextChat.value !== "") {
      let timeStamp = Date.now();
        let formattedString = date.formatDate(timeStamp, 'HH:mm:ss')
      Chat.value.push({
        name: "пользователь",
        text: [TextChat.value],
        stamp: formattedString,
        sent: true,
      });
      setTimeout(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
        }
      }, "0");
      setTimeout(() => {
        let timeStamp = Date.now();
        let formattedString = date.formatDate(timeStamp, 'HH:mm:ss')
        Chat.value.push({
          name: "Ваш покорный слуга ",
          text: [
            "Обратитесь по вашему вопросу на горячую линию по номеру телефона: 8-800-555-35-35",
          ],
          stamp: formattedString,
          sent: false,
        });
      }, "1000");
      setTimeout(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
        }
      }, "1001");
      TextChat.value = "";
    }
  }

  function toggleLeftDrawer () {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  onMounted(async () => {
    const querySnapshot = await getDocs(query(collection(db, "tovari")));
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
    console.log(data.value)
  })

  watch(searchText, async () => {
    let searchArr = data.value.filter((item) => item.name.toLowerCase().includes(searchText.value.toLowerCase()))
    console.log(searchArr)
    data.value = Array.from(new Set([...searchArr, ...data.value]));
  })
  


  // -------- здесь код для проверки того залогинен юзер или нет
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
    top: 80px;
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
    background: rgba(0, 0, 0, 0.2);
  }
  .popup-z {
    z-index: 1001;
  }
  .wrapper {
    max-width: 1440px;
    margin: 0 auto;
  }
  .header,
  .footer {
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
  .footer {
    z-index: 400;
  }

  //чат popup
  .icon-chat {
    position: fixed;
    right: 2%;
    top: 90%;
    z-index: 500;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .q-dialog__inner--minimized > div {
    max-width: 800px;
  }
  .popup-chat-box {
    position: relative;
    width: 100%;
    height: 80%;
    border-radius: 50px;
  }
  .chat-card-test {
    width: 100%;
    height: 100%;
  }
  .chat-header {
    // position: absolute;
    // bottom: 0;
    border-bottom: solid 2px;
    border-color: $secondary;
  }
  .chat-footer {
    position: absolute;
    bottom: 2%;
    left: 0;
    width: 100%;
    border-top: solid  2px;
    border-color: $secondary;
  }
  .scrollContainer {
    width: 100%;
    max-height: calc(74vh - 200px);
    overflow-y: auto;
    pointer-events: all;
    margin-left: auto;
    margin-right: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollContainer::-webkit-scrollbar {
    width: 0;
    height: 0;
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
  .scroll-popup-search{
    max-height: calc(100vh - 150px);
     overflow-y: auto;
      pointer-events: all;
      -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scroll-popup-search::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
</style>
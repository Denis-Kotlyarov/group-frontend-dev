<template>
  <router-view />
</template>

<script setup>
defineOptions({
  name: 'App'
});
</script>

<style>
  .container{
    max-width: 80%;
    margin-right: auto;
    margin-left: auto;
  }
  .nav-container .q-item.q-router-link--active{
    color: #bcc9fe;
  }
  .header-title .q-item.q-router-link--active{
    color: white
  }
  .list-title .q-item.q-router-link--active{
    color: white
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
    background: rgba(0,0,0,0.2)
  }
  .popup-z{
    z-index: 1001;
  }
  .footer{
    z-index: 999;
  }
</style>
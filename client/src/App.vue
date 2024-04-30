<template>
  <div class="flex min-h-screen">
    <SideBar
      v-if="route.path != '/' && route.path != '/login' && route.path != '/404'"
    />
    <div class="flex flex-col items-center w-full">
      <Navbar
        v-if="
          route.path != '/' && route.path != '/login' && route.path != '/404'
        "
      />
      <div class="flex flex-auto justify-center items-center w-11/12">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import SideBar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
const route = useRoute();
console.log(route.path);
</script>

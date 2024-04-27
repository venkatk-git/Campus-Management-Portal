<template>
  <div class="flex min-h-screen">
    <SideBar
      v-if="route.path != '/' && route.path != '/login' && route.path != '/404'"
    />
    <div class="flex flex-auto justify-center items-center w-full``">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import SideBar from "./components/Sidebar.vue";

const route = useRoute();
console.log(route.path);
</script>

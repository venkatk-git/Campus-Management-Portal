<template>
  <div class="flex min-h-screen w-full">
    <SideBar
      v-if="route.path != '/' && route.path != '/login' && route.path != '/404'"
    />
    <div class="flex flex-col items-center min-w-[85%] max-w-[100%] w-full">
      <Navbar
        v-if="
          route.path != '/' && route.path != '/login' && route.path != '/404'
        "
      />
      <div
        class="flex flex-auto justify-center items-center min-w-[60%]: max-w-[85%]"
      >
        <router-view class="w-[85rem]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import SideBar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
const route = useRoute();
import { ref } from "vue";

const pages = ref([
  { label: "Electronics" },
  { label: "Computer" },
  { label: "Accessories" },
  { label: "Keyboard" },
  { label: "Wireless" },
]);
</script>

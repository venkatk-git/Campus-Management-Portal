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
      <!-- <Breadcrumb
        :model="pages"
        class="self-start border-none px-[3.5rem] mb-4"
      /> -->
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
import { ref } from "vue";

const pages = ref([
  { label: "Electronics" },
  { label: "Computer" },
  { label: "Accessories" },
  { label: "Keyboard" },
  { label: "Wireless" },
]);
</script>

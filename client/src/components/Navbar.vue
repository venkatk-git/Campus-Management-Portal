<template>
  <div
    class="nav-bar flex pt-4 pb-2 mb-8 min-[320px]:px-8 lg:px-[3.5rem] justify-between w-full border-b-[0.8px] border-[#f1f5f91f]"
  >
    <div class="self-start mt-2 p-0">
      <span class="material-symbols-rounded cursor-pointer" @click="ToggleMenu">
        menu
      </span>
    </div>
    <div class="flex gap-1">
      <Dropdown
        v-model="signout"
        :pt:trigger:class="'flex items-center justify-center dp-trigger shrink-0 text-surface-500 w-5 rounded-tr-md rounded-br-mdw-10'"
        :options="cities"
        value="User"
        optionLabel="name"
        placeholder="User"
        class="w-full md:w-14rem bg-transparent border-none"
        @change="signOutHandler()"
      >
        <template #value>
          <div class="flex gap-1 items-center">
            <Avatar
              label="V"
              class="mr-2"
              style="background-color: #2196f3; color: #ffffff; cursor: pointer"
              shape="circle"
            />
            <span>{{ name }}</span>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";

const name = ref(localStorage.getItem("name"));

function ToggleMenu() {
  document.getElementById("aside").classList.toggle("open");
}

const signOutHandler = () => {
  router.push("/");
};

const signout = ref();

const cities = ref([
  {
    name: "Sign out",
  },
]);
</script>

<style scoped>
.material-symbols-rounded {
  font-variation-settings: "FILL" 0, "wght" 200, "GRAD" 200;
  font-size: 2rem;
}
</style>

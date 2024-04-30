<template>
  <div
    class="nav-bar flex pt-4 pb-6 px-[3.5rem] justify-between items-center w-full"
  >
    <div class="self-start p-0 mt-4">
      <span class="material-symbols-outlined"> menu </span>
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
            <span>User</span>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";

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

<style scoped></style>

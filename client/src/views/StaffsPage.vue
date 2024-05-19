<template>
  <div class="flex flex-col gap-10 w-full">
    <div class="flex justify-between items-center w-full">
      <h3 class="text-xl">Staffs</h3>
      <Button
        v-ripple
        v-if="userType == 'admin' || userType == 'supervisor'"
        :pt:root:class="'flex justify-center gap-3 p-ripple px-4 py-2 rounded-lg  border-[#9ca3af] bg-[#4F46E5]'"
        @click="navigate()"
        ><span class="material-symbols-outlined"> edit </span>Create
        Staff</Button
      >
    </div>
    <Staffs />
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";
import Staffs from "@/components/Staffs.vue";

let userType = ref(localStorage.getItem("role"));

const navigate = () => {
  router.push("/dashboard/createstaff");
};
</script>

<style></style>

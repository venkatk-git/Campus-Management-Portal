<template>
  <div class="flex flex-col gap-10 w-full">
    <div class="flex justify-between">
      <h3 class="text-xl">Supervisors</h3>
      <Button
        v-ripple
        v-if="userType == 'admin'"
        :pt:root:class="'flex justify-center gap-3 p-ripple px-4 py-2 rounded-lg  border-[#9ca3af] bg-[#4F46E5] max-w-max'"
        @click="navigate()"
        ><span class="material-symbols-outlined"> edit </span
        ><span class="lg-create">Create Supervisor</span
        ><span class="sm-create hidden">Create</span></Button
      >
    </div>
    <Supervisor />
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";
import Supervisor from "@/components/Supervisors.vue";

let userType = ref(localStorage.getItem("role"));

const navigate = () => {
  router.push("/dashboard/createSupervisor");
};
</script>

<style>
@media (max-width: 420px) {
  .lg-create {
    display: none;
  }

  .sm-create {
    display: inline-block;
  }
}
</style>

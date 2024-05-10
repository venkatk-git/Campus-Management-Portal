<template>
  <div class="flex flex-col gap-10 w-full">
    <div class="flex justify-between">
      <h3 class="text-xl">Supervisors</h3>
      <Button
        v-ripple
        :pt:root:class="'flex justify-center gap-3 p-ripple px-4 py-2 rounded-lg  border-[#9ca3af] bg-[#4F46E5]'"
        @click="navigate()"
        ><span class="material-symbols-outlined"> edit </span>Create
        Supervisor</Button
      >
    </div>
    <Supervisor />
  </div>
</template>

<script setup>
import router from "@/router";
import Supervisor from "@/components/Supervisors.vue";
const navigate = () => {
  router.push("/dashboard/createSupervisor");
};
</script>

<style></style>

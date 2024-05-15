<template>
  <div class="flex flex-col items-center gap-7 w-full min-px-10">
    <div class="flex justify-between items-center w-full">
      <h3 class="text-xl">Tasks</h3>
      <Button
        v-ripple
        :pt:root:class="'flex justify-center gap-3 p-ripple px-4 py-2 rounded-lg  border-[#9ca3af] bg-[#4F46E5]'"
        @click="navigate()"
        ><span class="material-symbols-outlined"> edit </span>Create
        Task</Button
      >
    </div>
    <!-- <div class="w-full max-w-[95rem]"> -->
    <div class="max-w-full">
      <Tasks />
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import Tasks from "@/components/Tasks.vue";
const navigate = () => {
  router.push("/dashboard/createtask");
};
</script>

<style></style>

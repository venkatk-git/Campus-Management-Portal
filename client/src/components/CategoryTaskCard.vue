<template>
  <div
    class="flex flex-col gap-6 flex-auto p-6 bg-card shadow rounded-2xl overflow-hidden min:w-fit"
  >
    <div class="flex items-start justify-between">
      <span
        class="text-lg font-medium tracking-tight leading-6 truncate"
        v-text="category"
      ></span>
    </div>
    <div class="flex flex-col items-center px-14">
      <div
        class="text-7xl font-bold tracking-tight leading-none text-blue-500"
        v-text="tasks"
      ></div>
      <span class="text-lg font-medium text-blue-600 dark:text-blue-500"
        >Tasks</span
      >
      <div
        class="flex items-baseline justify-center w-full mt-5 text-secondary"
      >
        <div class="text-md font-medium truncate">Completed:</div>
        <div class="ml-1.5 text-lg font-semibold" v-text="completed"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["category", "tasks", "completed"]);
</script>

<style scoped`>
.bg-card {
  --tw-bg-opacity: 1 !important;
  background-color: rgba(30, 41, 59, 1) !important;
}
</style>

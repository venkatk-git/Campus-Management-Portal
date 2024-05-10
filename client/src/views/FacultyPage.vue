<template>
  <div class="flex flex-col gap-10 w-full">
    <div class="flex justify-between">
      <h3 class="text-xl">Faculties</h3>
      <Button
        v-ripple
        :pt:root:class="'flex justify-center gap-3 p-ripple px-4 py-2 rounded-lg  border-[#9ca3af] bg-[#4F46E5]'"
        @click="navigate()"
        ><span class="material-symbols-outlined"> edit </span>Create
        Faculty</Button
      >
    </div>
    <Faculty />
  </div>
</template>

<script setup>
import router from "@/router";
import Faculty from "@/components/Faculty.vue";
const navigate = () => {
  router.push("/dashboard/createFaculty");
};
</script>

<style></style>

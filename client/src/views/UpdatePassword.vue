<template>
  <div class="flex flex-auto w-full h-full items-center justify-center min-w-0">
    <div
      class="bg-[#1e293b] w-[22rem] max-w-120 mx-auto sm:mx-0 flex flex-col py-8 px-8 rounded-2xl"
    >
      <div class="flex flex-col items-center">
        <span class="text-3xl font-bold tracking-tight leading-tight"
          >Update Password</span
        >
      </div>
      <UpdatePasswordForm />
    </div>
  </div>
</template>
<script setup>
import Logo from "../components/Logo.vue";
import UpdatePasswordForm from "../components/UpdatePasswordForm.vue";
</script>

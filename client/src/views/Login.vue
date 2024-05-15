<template>
  <div class="flex flex-auto w-full h-full items-center justify-center min-w-0">
    <div
      class="bg-[#1e293b] w-[22rem] max-w-120 mx-auto sm:mx-0 flex flex-col py-8 px-8 rounded-2xl"
    >
      <div class="flex flex-col items-center">
        <Logo size="48" />

        <span class="mt-8 text-3xl font-bold tracking-tight leading-tight"
          >Sign in</span
        >
      </div>
      <Form />
    </div>
  </div>
</template>
<script setup>
import Logo from "../components/Logo.vue";
import Form from "../components/LoginForm.vue";
</script>

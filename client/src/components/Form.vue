<template>
  <form @submit.prevent="validateAuth" class="mt-8 flex flex-col gap-y-4">
    <InputField fieldName="email" />
    <InputField fieldName="password" />

    <button
      class="w-full mt-2 bg-[#4f46e5] p-3 rounded-3xl hover:bg-[#6054e4] transition-colors ease-in-out duration-550"
    >
      Sign in
    </button>
    <span class="text-xs text-center text-[#4f46e5]"
      >Sign in is required to enter the portal</span
    >
  </form>
</template>

<script setup>
import InputField from "./InputField.vue";
import { useRouter } from "vue-router";
const router = useRouter();

function validateAuth(params) {
  let mail = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if (mail == "user@gmail.com" && password == "123") {
    localStorage.setItem("auth", true);
    router.push("/dashboard");
  }
}
</script>

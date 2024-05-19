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
import axios from "axios";
import InputField from "./InputField.vue";
import { useRouter } from "vue-router";
import api from "@/api/api";
const router = useRouter();

async function validateAuth(params) {
  let mail = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  const res = await axios.post(
    `${api}/users/login`,
    {
      email: mail,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.status == 200) {
    localStorage.setItem("token", res.data.data.token);
    localStorage.setItem("auth", true);
    localStorage.setItem("role", res.data.data.user.role);
    localStorage.setItem("email", res.data.data.user.email);
    localStorage.setItem("name", res.data.data.user.name);
    router.push("/dashboard/analytics");
  }
}
</script>

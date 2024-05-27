<template>
  <form @submit.prevent="validateAuth" class="mt-8 flex flex-col gap-y-4">
    <InputField
      :invalid="validationErrors.email.value || validationErrors.password.value"
      fieldName="email"
    />

    <InputField
      :invalid="validationErrors.email.value || validationErrors.password.value"
      fieldName="password"
    />

    <small
      v-if="validationErrors.email.value || validationErrors.password.value"
      class="text-red-500"
      >Invalid email or password</small
    >
    <small v-if="validationErrors.isEmpty.value" class="text-red-500"
      >Please provide both email and password
    </small>
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
import { ref } from "vue";
const router = useRouter();

const validationErrors = {
  email: ref(false),
  password: ref(false),
  isEmpty: ref(false),
};

async function validateAuth() {
  let mail = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!mail || !password) {
    validationErrors.isEmpty.value = true;
    return;
  }

  validationErrors.isEmpty.value = false;

  try {
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

    if (res.status == 401) {
      validationErrors.email.value = true;
      validationErrors.password.value = true;
      return;
    }

    if (res.status == 200) {
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("auth", true);
      localStorage.setItem("role", res.data.data.user.role);
      localStorage.setItem("email", res.data.data.user.email);
      localStorage.setItem("name", res.data.data.user.name);
      router.push("/dashboard/analytics");
    }
  } catch (error) {
    validationErrors.email.value = true;
    validationErrors.password.value = true;
  }
}
</script>

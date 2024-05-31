<template>
  <form @submit.prevent="validateAuth" class="mt-8 flex flex-col gap-y-4">
    <InputField
      :invalid="
        validationErrors.isEmpty.value ||
        validationErrors.email.value ||
        validationErrors.password.value ||
        validationErrors.confirmPassword.value
      "
      fieldType="email"
      fieldName="email"
    />

    <InputField
      :invalid="
        validationErrors.isEmpty.value ||
        validationErrors.email.value ||
        validationErrors.password.value ||
        validationErrors.confirmPassword.value
      "
      fieldType="password"
      fieldName="password"
    />

    <InputField
      :invalid="
        validationErrors.isEmpty.value ||
        validationErrors.email.value ||
        validationErrors.password.value ||
        validationErrors.confirmPassword.value
      "
      fieldType="password"
      fieldName="new password"
    />

    <InputField
      :invalid="
        validationErrors.isEmpty.value ||
        validationErrors.email.value ||
        validationErrors.password.value ||
        validationErrors.confirmPassword.value
      "
      fieldType="password"
      fieldName="confirm password"
    />

    <small
      v-if="validationErrors.email.value || validationErrors.password.value"
      class="text-red-500"
      >Invalid email or password</small
    >
    <small v-if="validationErrors.isEmpty.value" class="text-red-500"
      >Please provide email password and confirm password
    </small>
    <small v-if="validationErrors.confirmPassword.value" class="text-red-500"
      >New password and confirm password do not match
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
  confirmPassword: ref(false),
  isEmpty: ref(false),
};

async function validateAuth() {
  let mail = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let newPassword = document.getElementById("new password").value;
  let confirmPassword = document.getElementById("confirm password").value;

  if (newPassword !== confirmPassword) {
    validationErrors.confirmPassword.value = true;
    return;
  }

  if (!mail || !password || !newPassword || !confirmPassword) {
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
      try {
        const res = await axios.patch(
          `${api}/users/updatepassword`,
          {
            email: mail,
            password,
            newPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status == 200) {
          router.push("/login");
        }

        if (res.status == 401) {
          validationErrors.email.value = true;
          validationErrors.password.value = true;
          return;
        }
      } catch (error) {
        validationErrors.email.value = true;
        validationErrors.password.value = true;
      }
    }
  } catch (error) {
    validationErrors.email.value = true;
    validationErrors.password.value = true;
  }
}
</script>

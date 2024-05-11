<template>
  <div class="form-card">
    <form action="">
      <div class="bg-[rgba(30,41,59,1)] w-full rounded-xl">
        <div class="py-6 flex items-center w-full">
          <span class="px-10 w-1/5"
            >Name<span class="text-red-500"> *</span></span
          >
          <InputText
            v-model="name"
            type="text"
            placeholder="Name"
            class="bg-[#1c2738] border-[#ffffff4e] w-[32rem]"
          />
        </div>
        <div class="py-6 flex items-center w-full border-t-2 border-[#2e3b4e]">
          <span class="px-10 w-1/5"
            >Age<span class="text-red-500"> *</span></span
          >
          <InputNumber
            v-model="age"
            :pt:root:class="'flex'"
            inputId="minmax-buttons"
            mode="decimal"
            showButtons
            :min="18"
            :max="100"
            class="w-[15rem]"
          />
        </div>
        <div class="py-6 flex items-center w-full border-t-2 border-[#2e3b4e]">
          <span class="px-10 w-1/5"
            >Gender<span class="text-red-500"> *</span></span
          >
          <Dropdown
            v-model="gender"
            :options="genders"
            placeholder="Select Gender"
            class="p-column-filter bg-[rgb(28,39,56)] border-[#ffffff4e] w-[15rem]"
            style="min-width: 12rem"
            :showClear="true"
          >
            <template #option="slotProps">
              <div class="flex items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="py-6 flex items-center w-full border-t-2 border-[#2e3b4e]">
          <span class="px-10 w-1/5"
            >Details<span class="text-red-500"> *</span></span
          >
          <Textarea
            v-model="details"
            rows="3"
            cols="60"
            class="border-[#ffffff4e]"
          />
        </div>
        <div class="py-6 flex items-center w-full border-t-2 border-[#2e3b4e]">
          <span class="px-10 w-1/5"
            >Contact Number<span class="text-red-500"> *</span></span
          >
          <InputMask
            id="phone"
            v-model="contact"
            mask="9999999999"
            placeholder="9999999999"
            class="p-column-filter bg-[rgb(28,39,56)] border-[#ffffff4e] w-[15rem]"
          />
        </div>
      </div>
    </form>
    <div class="flex w-full justify-end">
      <div class="flex items-center my-7 gap-4">
        <div>
          <span>Clear</span>
        </div>
        <div>
          <Button
            v-ripple
            :pt:root:class="'p-ripple px-4 py-2 rounded-lg  border-[#9ca3af] bg-[#4F46E5]'"
            @click="handleCreateAndAnother()"
            >Create & Add Another</Button
          >
        </div>
        <div>
          <Button
            v-ripple
            :pt:root:class="'p-ripple px-4 py-2 rounded-lg  border-[#9ca3af] bg-[#4F46E5]'"
            @click="handleCreate()"
            >Create Faculty</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import api from "@/api/api";
import router from "@/router";

const name = ref();
const age = ref(18);
const gender = ref();
const details = ref();
const contact = ref();
const genders = ref(["Male", "Female"]);

const validateForm = () => {};

const handleCreateAndAnother = async () => {
  const obj = {
    name: name.value,
    age: age.value,
    gender: gender.value,
    details: details.value,
    contact: contact.value,
  };

  try {
    await axios.post(`${api}/faculty`, JSON.stringify(obj), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    name.value = "";
    age.value = 18;
    gender.value = "";
    details.value = "";
    contact.value = undefined;
  } catch (error) {
    console.log(error.message);
  }
};

const handleCreate = async () => {
  const obj = {
    name: name.value,
    age: age.value,
    gender: gender.value,
    details: details.value,
    contact: contact.value,
  };
  await axios.post(`${api}/faculty`, JSON.stringify(obj), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  router.push("/dashboard/faculty");
};
</script>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  caret-color: white;
  transition: background-color 5000s ease-in-out 0s;
  color: white;
}
</style>

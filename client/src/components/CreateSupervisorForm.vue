<template>
  <div class="form-card">
    <Toast />
    <form action="">
      <div class="bg-[rgba(30,41,59,1)] w-full rounded-xl">
        <!-- Name -->
        <div class="py-5 flex w-full">
          <span class="px-10 w-1/5 pt-3"
            >Name<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3">
            <InputText
              v-model="name"
              :invalid="validationErrors.name.value"
              type="text"
              placeholder="Name"
              class="bg-[#1c2738] border-[#ffffff4e] w-[32rem]"
            />
            <small v-if="validationErrors.name.value" class="text-red-500"
              >A supervisor must have a name</small
            >
          </div>
        </div>
        <!-- Age -->
        <div class="py-5 flex w-full border-t-2 border-[#2e3b4e]">
          <span class="px-10 w-1/5 pt-3"
            >Age<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3">
            <InputNumber
              v-model="age"
              :pt:root:class="'flex'"
              :invalid="validationErrors.age.value"
              inputId="minmax-buttons"
              mode="decimal"
              showButtons
              :min="18"
              :max="100"
              class="w-[15rem]"
            />
          </div>
          <small v-if="validationErrors.age.value" class="text-red-500"
            >A supervisor must have a age</small
          >
        </div>
        <!-- Gender -->
        <div class="py-5 flex w-full border-t-2 border-[#2e3b4e]">
          <span class="px-10 w-1/5 pt-2"
            >Gender<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3">
            <Dropdown
              v-model="gender"
              :options="genders"
              :invalid="validationErrors.gender.value"
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
            <small v-if="validationErrors.gender.value" class="text-red-500"
              >A supervisor must have a age</small
            >
          </div>
        </div>
        <!-- Category -->
        <div class="py-5 flex w-full border-t-2 border-[#2e3b4e]">
          <span class="px-10 w-1/5 pt-2"
            >Category<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3">
            <Dropdown
              v-model="category"
              :options="categorys"
              :invalid="validationErrors.category.value"
              placeholder="Select Category"
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
            <small v-if="validationErrors.category.value" class="text-red-500"
              >A supervisor must have a category</small
            >
          </div>
        </div>
        <!-- Contact -->
        <div class="py-5 flex w-full border-t-2 border-[#2e3b4e]">
          <span class="px-10 w-1/5 pt-3"
            >Contact Number<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3">
            <InputMask
              id="phone"
              v-model="contact"
              :invalid="validationErrors.contact.value"
              mask="9999999999"
              placeholder="Phone number"
              class="p-column-filter bg-[rgb(28,39,56)] border-[#ffffff4e] w-[15rem]"
            />
            <small v-if="validationErrors.contact.value" class="text-red-500"
              >A supervisor must have a contact</small
            >
          </div>
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
            >Create Supervisor</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import api from "@/api/api";
import router from "@/router";
import supervisorFormValidate from "./functions/supervisorFormValidation";

const toast = useToast();

const name = ref();
const age = ref(18);
const gender = ref();
const category = ref();
const contact = ref();
const genders = ref(["Male", "Female"]);

const categorys = ref([
  "Category A",
  "Category B",
  "Category C",
  "Category D",
  "Category E",
]);

const validationErrors = {
  name: ref(false),
  age: ref(false),
  gender: ref(false),
  category: ref(false),
  contact: ref(false),
};

const validateForm = () => {
  const errorNote = supervisorFormValidate(
    name,
    age,
    gender,
    category,
    contact
  );
  let flag = 0;
  for (let i = 0; i < errorNote.length; i++) {
    if (errorNote[i] == "name") validationErrors.name.value = true;
    if (errorNote[i] == "age") validationErrors.age.value = true;
    if (errorNote[i] == "gender") validationErrors.gender.value = true;
    if (errorNote[i] == "category") validationErrors.category.value = true;
    if (errorNote[i] == "contact") validationErrors.contact.value = true;

    if (
      errorNote[i] == "name" ||
      errorNote[i] == "age" ||
      errorNote[i] == "gender" ||
      errorNote[i] == "category" ||
      errorNote[i] == "contact"
    )
      flag = 1;
  }
  return flag;
};

const showToast = (severity, summary, detail) => {
  toast.add({
    severity: severity,
    summary: summary,
    detail: detail,
    life: 10000,
  });
};

const handleCreateAndAnother = async () => {
  if (validateForm())
    return showToast(
      "error",
      "Failed to submit",
      "Please fill out the required fields"
    );

  const obj = {
    name: name.value,
    age: age.value,
    gender: gender.value,
    category: category.value,
    contact: contact.value,
  };

  try {
    await axios.post(`${api}/supervisors`, JSON.stringify(obj), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    name.value = "";
    age.value = 18;
    gender.value = "";
    category.value = "";
    contact.value = undefined;
    showToast("success", "Form submitted", "Supervisor successfully created");
  } catch (error) {
    showToast("error", "Failed to submit", "Oops! Something went wrong");
  }
};

const handleCreate = async () => {
  if (validateForm())
    return showToast(
      "error",
      "Failed to submit",
      "Please fill out the required fields"
    );

  const obj = {
    name: name.value,
    age: age.value,
    gender: gender.value,
    category: category.value,
    contact: contact.value,
  };

  try {
    await axios.post(`${api}/supervisors`, JSON.stringify(obj), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    showToast("success", "Form submitted", "Supervisor successfully created");
    router.push("/dashboard/supervisors");
  } catch (error) {
    showToast("error", "Failed to submit", "Oops! Something went wrong");
  }
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

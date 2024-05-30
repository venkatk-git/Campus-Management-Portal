<template>
  <div class="form-card w-full">
    <Toast />
    <form action="">
      <div class="bg-[rgba(30,41,59,1)] w-full rounded-xl">
        <!-- Name -->
        <div class="py-5 flex w-full fields-contianer">
          <span class="px-10 pt-3 w-1/4 max-[900px]:w-full"
            >Name<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3 max-[900px]:px-10">
            <InputText
              v-model="name"
              :invalid="validationErrors.name.value"
              type="text"
              @change="() => (validationErrors.name.value = false)"
              placeholder="Name"
              class="bg-[#1c2738] border-[#ffffff4e] min-[900px]:w-[32rem]"
            />
            <small v-if="validationErrors.name.value" class="text-red-500"
              >A faculty must have a name</small
            >
          </div>
        </div>
        <!-- Email -->
        <div
          class="py-5 flex w-full fields-contianer border-t-2 border-[#2e3b4e]"
        >
          <span class="px-10 pt-3 w-1/4 max-[900px]:w-full"
            >Email<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3 max-[900px]:px-10">
            <InputText
              v-model="email"
              :invalid="validationErrors.email.value"
              type="text"
              @change="() => (validationErrors.email.value = false)"
              placeholder="example@bitsathy.ac.in"
              class="bg-[#1c2738] border-[#ffffff4e] min-[900px]:w-[32rem]"
            />
            <small v-if="validationErrors.email.value" class="text-red-500"
              >A faculty must have a email</small
            >
          </div>
        </div>
        <!-- Age -->
        <div
          class="py-5 flex w-full border-t-2 border-[#2e3b4e] fields-contianer"
        >
          <span class="px-10 w-1/4 pt-3 max-[900px]:w-full"
            >Age<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3 max-[900px]:px-10">
            <InputNumber
              v-model="age"
              :invalid="validationErrors.age.value"
              :pt:root:class="'flex'"
              inputId="minmax-buttons"
              mode="decimal"
              :min="18"
              :max="80"
              class="w-[12rem] max-[400px]:w-full"
            />
            <small v-if="validationErrors.age.value" class="text-red-500"
              >A faculty must have a age</small
            >
          </div>
        </div>
        <!-- Gender -->
        <div
          class="py-5 flex w-full border-t-2 border-[#2e3b4e] fields-contianer"
        >
          <span class="px-10 w-1/4 pt-2 max-[900px]:w-full"
            >Gender<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3 max-[900px]:px-10">
            <Dropdown
              v-model="gender"
              :invalid="validationErrors.gender.value"
              :options="genders"
              placeholder="Select Gender"
              class="p-column-filter bg-[rgb(28,39,56)] border-[#ffffff4e] w-[12rem] max-[400px]:w-full"
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
              >A faculty must have a gender</small
            >
          </div>
        </div>
        <!-- Details -->
        <div
          class="py-5 flex w-full border-t-2 border-[#2e3b4e] fields-contianer"
        >
          <span class="px-10 w-1/4 pt-5 max-[900px]:w-full"
            >Details<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3 max-[900px]:px-10">
            <Textarea
              v-model="details"
              :invalid="validationErrors.details.value"
              rows="3"
              class="border-[#ffffff4e] min-[900px]:w-[32rem]"
            />
            <small v-if="validationErrors.details.value" class="text-red-500"
              >A faculty must have some details</small
            >
          </div>
        </div>
        <!-- Contact -->
        <div
          class="py-5 flex w-full border-t-2 border-[#2e3b4e] fields-contianer"
        >
          <span class="px-10 w-1/4 pt-3 max-[900px]:w-full"
            >Contact Number<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3 max-[900px]:px-10">
            <InputMask
              id="phone"
              v-model="contact"
              :invalid="validationErrors.contact.value"
              mask="9999999999"
              placeholder="Phone number"
              class="p-column-filter bg-[rgb(28,39,56)] border-[#ffffff4e] w-[12rem] max-[400px]:w-full"
            />
            <small v-if="validationErrors.contact.value" class="text-red-500"
              >A faculty must have a contact number</small
            >
          </div>
        </div>
      </div>
    </form>
    <!-- Buttons -->
    <div class="flex w-full justify-end max-[500px]:justify-center w">
      <div
        class="flex items-center my-7 gap-4 form-submition-buttons max-[500px]:w-full"
      >
        <div>
          <span>Clear</span>
        </div>
        <div class="max-[500px]:w-full">
          <Button
            v-ripple
            @click="handleCreateAndAnother()"
            class="p-ripple border-none px-4 py-2 rounded-lg border-[#9ca3af] bg-[#4F46E5] submit-btn"
            >Create & Add Another</Button
          >
        </div>
        <div class="max-[500px]:w-full">
          <Button
            v-ripple
            @click="handleCreate()"
            class="p-ripple border-none px-4 py-2 rounded-lg border-[#9ca3af] bg-[#4F46E5] submit-btn"
            >Create Faculty</Button
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
import facultyFormValidate from "./functions/facultyFormValidation";

const toast = useToast();

const name = ref();
const email = ref();
const age = ref(18);
const gender = ref();
const details = ref();
const contact = ref();
const genders = ref(["Male", "Female"]);

const validationErrors = {
  name: ref(false),
  email: ref(false),
  age: ref(false),
  gender: ref(false),
  details: ref(false),
  contact: ref(false),
};

const validateForm = () => {
  const errorNote = facultyFormValidate(
    name,
    age,
    gender,
    details,
    contact,
    email
  );
  let flag = 0;
  for (let i = 0; i < errorNote.length; i++) {
    if (errorNote[i] == "name") validationErrors.name.value = true;
    if (errorNote[i] == "age") validationErrors.age.value = true;
    if (errorNote[i] == "gender") validationErrors.gender.value = true;
    if (errorNote[i] == "details") validationErrors.details.value = true;
    if (errorNote[i] == "contact") validationErrors.contact.value = true;
    if (errorNote[i] == "email") validationErrors.email.value = true;

    if (
      errorNote[i] == "name" ||
      errorNote[i] == "age" ||
      errorNote[i] == "gender" ||
      errorNote[i] == "details" ||
      errorNote[i] == "contact" ||
      errorNote[i] == "email"
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
  const valueObj = {
    name: name.value,
    age: age.value,
    gender: gender.value,
    details: details.value,
    contact: contact.value,
  };

  const credentialObj = {
    name: name.value,
    email: email.value,
    password: email.value,
    role: "faculty",
  };

  try {
    await axios.post(`${api}/faculty`, JSON.stringify(valueObj), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await axios.post(`${api}/users/signup`, JSON.stringify(credentialObj), {
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
    showToast("success", "Form submitted", "Faculty successfully created");
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
  const valueObj = {
    name: name.value,
    age: age.value,
    gender: gender.value,
    details: details.value,
    contact: contact.value,
  };

  const credentialObj = {
    name: name.value,
    email: email.value,
    password: email.value.split("@")[0],
    role: "faculty",
  };

  try {
    await axios.post(`${api}/faculty`, JSON.stringify(valueObj), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await axios.post(`${api}/users/signup`, JSON.stringify(credentialObj), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    name.value = "";
    email.value = "";
    age.value = 18;
    gender.value = "";
    details.value = "";
    contact.value = undefined;

    showToast("success", "Form submitted", "Faculty successfully created");

    router.push("/dashboard/faculty");
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

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
              >A task must have a name</small
            >
          </div>
        </div>
        <!-- Calender -->
        <div
          class="py-5 flex w-full border-t-2 border-[#2e3b4e] fields-contianer"
        >
          <span class="px-10 w-1/4 pt-3 max-[900px]:w-full"
            >Date<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3 max-[900px]:px-10">
            <Calendar
              v-model="date"
              :pt:input:class="'bg-[#1c2738] border-[1.5px] p-3 rounded-md border-[#ffffff4e] focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50 focus:z-10 appearance-none transition-colors duration-200 max-[400px]:w-full'"
              :pt:panel:class="'bg-[#1c2738] border-[1.5px] p-3 rounded-md border-[#ffffff4e] '"
              dateFormat="dd/mm/yy"
            />
            <!-- <small v-if="!validationErrors.date.value" class="opacity-[60%]"
              >Today date is taken as default</small
            > -->
            <small v-if="validationErrors.date.value" class="text-red-500"
              >A task must have a date</small
            >
          </div>
        </div>
        <!-- Number of Staffs -->
        <div class="flex flex-col py-5 border-t-2 border-[#2e3b4e]">
          <div class="flex fields-contianer">
            <span class="px-10 w-1/4 pt-3 max-[900px]:w-full"
              >Number of Staffs<span class="text-red-500"> *</span></span
            >
            <div class="flex flex-col gap-3 max-[900px]:px-10">
              <form @submit.prevent="createNameField" class="flex">
                <InputNumber
                  v-model="staffsCount"
                  :invalid="validationErrors.staffsCount.value"
                  @change="validationErrors.staffsCount.value = false"
                  :pt:root:class="'flex'"
                  inputId="minmax-buttons"
                  mode="decimal"
                  :min="1"
                  :max="20"
                  class="w-[15rem] max-[400px]:w-full"
                />
                <!-- <Button
                  class="p-ripple px-4 py-2 rounded-lg border-none bg-[#4F46E5]"
                  >Enter Staffs</Button
                > -->
              </form>
              <small
                v-if="validationErrors.staffsCount.value"
                class="text-red-500"
                >A task must have number of staffs
              </small>
            </div>
          </div>
          <div class="flex flex-col">
            <div
              class="flex mt-6 fields-contianer"
              v-for="index in staffsCount"
              :key="index"
            >
              <span for="username" class="px-10 w-1/4 pt-3 max-[900px]:w-full"
                >Staff Name {{ index
                }}<span class="text-red-500"> *</span></span
              >
              <div class="max-[900px]:px-10 max-[900px]:w-full">
                <InputText
                  v-model="staffNames[index - 1]"
                  type="text"
                  placeholder="Name"
                  class="bg-[#1c2738] border-[#ffffff4e] w-full min-[900px]:w-[32rem]"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Category -->
        <div
          class="py-5 flex w-full border-t-2 border-[#2e3b4e] fields-contianer"
        >
          <span class="px-10 w-1/4 pt-2 max-[900px]:w-full"
            >Category<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3 max-[900px]:px-10">
            <Dropdown
              v-model="category"
              :invalid="validationErrors.category.value"
              @change="() => (validationErrors.category.value = false)"
              :options="categorys"
              placeholder="Select Category"
              class="p-column-filter bg-[rgb(28,39,56)] border-[#ffffff4e] w-[15rem] max-[400px]:w-full"
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
              >A task must have a category</small
            >
          </div>
        </div>
        <!-- Location -->
        <div
          class="py-5 flex w-full border-t-2 border-[#2e3b4e] fields-contianer"
        >
          <span class="px-10 w-1/4 pt-2 max-[900px]:w-full"
            >Location<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3 max-[900px]:px-10">
            <Dropdown
              v-model="location"
              :invalid="validationErrors.location.value"
              @change="() => (validationErrors.location.value = false)"
              :options="locations"
              placeholder="Select Location"
              class="p-column-filter bg-[rgb(28,39,56)] border-[#ffffff4e] w-[15rem] max-[400px]:w-full"
              style="min-width: 12rem"
              :showClear="true"
            >
              <template #option="slotProps">
                <div class="flex items-center gap-2">
                  <span>{{ slotProps.option }}</span>
                </div>
              </template>
            </Dropdown>
            <small v-if="validationErrors.location.value" class="text-red-500"
              >A task must have a location</small
            >
          </div>
        </div>
        <!-- ETA -->
        <div
          class="py-5 flex w-full border-t-2 border-[#2e3b4e] fields-contianer"
        >
          <span class="px-10 w-1/4 pt-3 max-[900px]:w-full"
            >ETA<span class="text-red-500"> *</span></span
          >
          <div class="flex flex-col gap-3 max-[900px]:px-10">
            <InputNumber
              v-model="eta"
              :invalid="validationErrors.eta.value"
              @change="() => (validationErrors.eta.value = false)"
              :pt:root:class="'flex'"
              inputId="minmax-buttons"
              placeholder="Time"
              mode="decimal"
              :min="0"
              :max="100"
              class="w-[12rem] max-[400px]:w-full"
            />
            <small v-if="validationErrors.eta.value" class="text-red-500"
              >A task must have a estimated time to finish</small
            >
          </div>
        </div>
        <!-- Status -->
        <div
          class="py-5 flex w-full border-t-2 border-[#2e3b4e] fields-contianer"
        >
          <span class="px-10 w-1/4">Status</span>
          <div class="flex flex-col gap-3 max-[900px]:px-10">
            <Dropdown
              v-model="status"
              :options="statuses"
              placeholder="Select Status"
              class="p-column-filter bg-[rgb(28,39,56)] border-[#ffffff4e] w-[15rem] max-[400px]:w-full"
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
        </div>
        <!-- Remarks -->
        <div
          class="py-5 flex w-full border-t-2 border-[#2e3b4e] fields-contianer"
        >
          <span class="px-10 w-1/4">Remarks</span>
          <div class="flex flex-col gap-3 max-[900px]:px-10">
            <Textarea
              v-model="remark"
              rows="5"
              class="border-[#ffffff4e] min-[900px]:w-[32rem]"
            />
          </div>
        </div>
      </div>
    </form>
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
            >Create Staff</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import router from "@/router";
import Button from "primevue/button";
import axios from "axios";
import api from "@/api/api";
import tasksFormValidate from "./functions/tasksFormValidate";

const toast = useToast();

const formatDate = (date) => {
  var date = date.split("/");
  var day, month;
  if (date[0] < 10) day = "0" + date[0];
  else day = date[0];
  if (date[1] < 10) month = "0" + date[1];
  else month = date[1];
  return [day, month, date[2]].join("/");
};
const name = ref();
const date = ref(formatDate(new Date().toLocaleDateString("en-IN")));
const staffsCount = ref(1);
const eta = ref();
const category = ref();
const location = ref();
const status = ref("Ongoing");
const remark = ref();
const categorys = ref([
  "Category A",
  "Category B",
  "Category C",
  "Category D",
  "Category E",
]);
const staffNames = ref([]);
const statuses = ref(["Completed", "Pending", "Ongoing"]);

const locations = ref(["Block A", "Block B", "Block C", "Block D", "Block E"]);

const validationErrors = {
  name: ref(false),
  category: ref(false),
  location: ref(false),
  eta: ref(false),
  staffsCount: ref(false),
  date: ref(false),
};

const createNameField = () => {
  console.log(staffsCount.value);
};

const validateForm = () => {
  const errorNote = tasksFormValidate(
    name,
    category,
    location,
    eta,
    staffsCount,
    date
  );
  let flag = 0;
  for (let i = 0; i < errorNote.length; i++) {
    if (errorNote[i] == "name") validationErrors.name.value = true;
    if (errorNote[i] == "category") validationErrors.category.value = true;
    if (errorNote[i] == "location") validationErrors.location.value = true;
    if (errorNote[i] == "eta") validationErrors.eta.value = true;
    if (errorNote[i] == "staffsCount")
      validationErrors.staffsCount.value = true;
    if (errorNote[i] == "date") validationErrors.date.value = true;

    if (
      errorNote[i] == "name" ||
      errorNote[i] == "category" ||
      errorNote[i] == "location" ||
      errorNote[i] == "eta" ||
      errorNote[i] == "staffsCount" ||
      errorNote[i] == "date"
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
    category: category.value,
    location: location.value,
    status: status.value,
    eta: eta.value,
    remarks: remark.value,
    staffsCount: staffsCount.value,
    staffsId: staffNames.value,
  };
  try {
    await axios.post(`${api}/tasks`, JSON.stringify(obj), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    showToast("success", "Form submitted", "Task successfully created");

    name.value = "";
    category.value = "";
    location.value = "";
    status.value = "";
    eta.value = "";
    remark.value = "";
    staffsCount.value = 1;
    staffNames.value = "";
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
    category: category.value,
    location: location.value,
    status: status.value,
    eta: eta.value,
    remarks: remark.value,
    staffsCount: staffsCount.value,
    staffsId: staffNames.value,
  };
  try {
    await axios.post(`${api}/tasks`, JSON.stringify(obj), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    showToast("success", "Form submitted", "Task successfully created");
    router.push("/dashboard/tasks");
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

input::placeholder {
  font-weight: normal !important;
}
</style>

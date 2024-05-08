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
            >Date<span class="text-red-500"> *</span></span
          >
          <Calendar
            v-model="date"
            :pt:input:class="'bg-[#1c2738] border-[1.5px] p-3 rounded-md border-[#ffffff4e] focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50 focus:z-10 appearance-none transition-colors duration-200'"
            :pt:panel:class="'bg-[#1c2738] border-[1.5px] p-3 rounded-md border-[#ffffff4e]'"
            dateFormat="dd/mm/yy"
          />
        </div>
        <div class="flex flex-col py-6 w-full border-t-2 border-[#2e3b4e]">
          <div class="flex items-center">
            <span class="px-10 w-1/5"
              >Number of Staffs<span class="text-red-500"> *</span></span
            >
            <form @submit.prevent="createNameField" class="flex gap-16">
              <InputNumber
                v-model="staffsCount"
                :pt:root:class="'flex'"
                inputId="minmax-buttons"
                mode="decimal"
                showButtons
                :min="0"
                :max="20"
                class="w-[15rem]"
              />
              <Button
                class="p-ripple px-4 py-2 rounded-lg border-none bg-[#4F46E5]"
                >Enter Staffs</Button
              >
            </form>
          </div>
          <div class="ml-10 grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            <div
              class="flex flex-col gap-3 mt-6"
              v-for="index in staffsCount"
              :key="index"
            >
              <span for="username"
                >Staff Name {{ index
                }}<span class="text-red-500"> *</span></span
              >
              <InputText
                v-model="staffNames[index - 1]"
                type="text"
                placeholder="Name"
                class="bg-[#1c2738] border-[#ffffff4e] w-[20rem]"
              />
            </div>
          </div>
        </div>
        <div class="py-6 flex items-center w-full border-t-2 border-[#2e3b4e]">
          <span class="px-10 w-1/5"
            >Category<span class="text-red-500"> *</span></span
          >
          <Dropdown
            v-model="category"
            :options="categorys"
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
        </div>
        <div class="py-6 flex items-center w-full border-t-2 border-[#2e3b4e]">
          <span class="px-10 w-1/5"
            >Location<span class="text-red-500"> *</span></span
          >
          <Dropdown
            v-model="location"
            :options="locations"
            placeholder="Select Location"
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
            >ETA<span class="text-red-500"> *</span></span
          >
          <InputNumber
            v-model="eta"
            :pt:root:class="'flex'"
            inputId="minmax-buttons"
            placeholder="Estimated time in hours"
            mode="decimal"
            showButtons
            :min="0"
            :max="100"
            class="w-[15rem]"
          />
        </div>
        <div class="py-6 flex items-center w-full border-t-2 border-[#2e3b4e]">
          <span class="px-10 w-1/5">Status</span>
          <Dropdown
            v-model="status"
            :options="statuses"
            placeholder="Select Status"
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
          <span class="px-10 w-1/5">Remarks</span>
          <Textarea
            v-model="remark"
            rows="5"
            cols="60"
            class="border-[#ffffff4e]"
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
            @click="handleCreateAndAnother()"
            class="p-ripple border-none px-4 py-2 rounded-lg border-[#9ca3af] bg-[#4F46E5]"
            >Create & Add Another</Button
          >
        </div>
        <div>
          <Button
            v-ripple
            @click="handleCreate()"
            class="p-ripple border-none px-4 py-2 rounded-lg border-[#9ca3af] bg-[#4F46E5]"
            >Create Staff</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Button from "primevue/button";
import axios from "axios";
import api from "@/api/api";

const name = ref();
const date = ref();
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

const createNameField = () => {
  console.log(staffsCount.value);
};

const handleCreateAndAnother = async () => {
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

    name.value = "";
    category.value = "";
    location.value = "";
    status.value = "";
    eta.value = "";
    remark.value = "";
    staffsCount.value = 1;
    staffNames.value = "";
  } catch (error) {
    console.log(error.message);
  }
};

const handleCreate = async () => {
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
  } catch (error) {
    console.log(error.message);
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

<template>
  <div
    class="table-card flex mb-10 py-5 rounded-xl shadow bg-[rgba(30,41,59,1)] max-w-screen-xl"
  >
    <div class="card w-full py-4 px-10">
      <DataTable
        v-model:filters="filters"
        :value="tasks"
        paginator
        :rows="5"
        dataKey="id"
        filterDisplay="row"
        :loading="loading"
        :globalFilterFields="[
          'name',
          'id',
          'date',
          'category',
          'location',
          'eta',
          'staffsCount',
          'status',
          'remarks',
        ]"
      >
        <template #header>
          <div class="flex justify-end border-none">
            <span class="relative">
              <div class="input-field">
                <span
                  class="material-symbols-outlined absolute top-2/4 -mt-3 left-3 text-surface-400 dark:text-surface-600 opacity-70"
                >
                  search
                </span>
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search Task"
                  class="pl-[3rem] font-normal bg-transparent border-[#ffffff4e]"
                />
              </div>
            </span>
          </div>
        </template>
        <template #empty> No Tasks found. </template>
        <template #loading> Loading Tasks data. Please wait. </template>
        <Column filterField="id" header="Task ID" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.id }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by task id"
            />
          </template>
        </Column>
        <Column filterField="date" header="Date" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.date }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by date"
            />
          </template>
        </Column>
        <Column header="Name" filterField="name" style="min-width: 12rem">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <span>{{ data.name }}</span>
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by name"
            />
          </template>
        </Column>
        <Column
          header="Category"
          filterField="category"
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            <span>{{ data.category }}</span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="category"
              placeholder="Select Category"
              class="p-column-filter"
              style="min-width: 12rem"
              :showClear="true"
            >
              <template #option="slotProps">
                <div class="flex items-center gap-2">
                  <span>{{ slotProps.option }}</span>
                </div>
              </template>
            </Dropdown>
          </template>
        </Column>
        <Column
          header="Location"
          filterField="location"
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            <span>{{ data.location }}</span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="locations"
              placeholder="Select Block"
              class="p-column-filter"
              style="min-width: 12rem"
              :showClear="true"
            >
              <template #option="slotProps">
                <span>{{ slotProps.option }}</span>
              </template>
            </Dropdown>
          </template>
        </Column>
        <Column
          header="Number of Staffs"
          filterField="staffs"
          style="min-width: 4rem"
        >
          <template #body="{ data }">
            <span>{{ data.staffsCount }}</span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by no. of staffs"
            />
          </template>
        </Column>
        <Column header="ETA" filterField="eta" style="min-width: 4rem">
          <template #body="{ data }">
            <span>{{ data.eta }}</span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by ETA"
            />
          </template>
        </Column>
        <Column
          field="status"
          header="Status"
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            <Tag :value="data.status" :severity="getSeverity(data.status)" />
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="statuses"
              placeholder="Select Status"
              class="p-column-filter"
              style="min-width: 6rem"
              :showClear="true"
            >
              <template #option="slotProps">
                <Tag
                  :value="slotProps.option"
                  :severity="getSeverity(slotProps.option)"
                />
              </template>
            </Dropdown>
          </template>
        </Column>
        <Column header="Remarks" filterField="remarks" style="min-width: 12rem">
          <template #body="{ data }">
            <span>{{ data.remarks }}</span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by remark"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import data from "@/components/service/SampleData";
import axios from "axios";
import api from "@/api/api";
const tasks = ref();
const date = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  location: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  staffs: { value: null, matchMode: FilterMatchMode.EQUALS },
  eta: { value: null, matchMode: FilterMatchMode.EQUALS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  remarks: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const category = ref(["Category A", "Category B", "Category C"]);
const statuses = ref(["Completed", "Pending", "Ongoing"]);
const locations = ref(["Block A", "Block B", "Block C"]);
const loading = ref(true);
// const userType = ref(localstorage.getItem("user"));

let fetchedData;

onMounted(async () => {
  // data.getTasks().then(async (data) => {
  // });
  fetchedData = await axios.get(`${api}/tasks`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  // console.log(fetchedData.data.data.tasks);
  // tasks.value = data;
  // console.log(data);
  tasks.value = fetchedData.data.data.tasks;
  console.log(tasks.value);
  loading.value = false;
});

const getSeverity = (status) => {
  switch (status) {
    case "Completed":
      return "success";

    case "Ongoing":
      return "info";

    case "Pending":
      return "danger";
  }
};
</script>

<style scoped>
.p-column-filter {
  background-color: transparent;
  border: 0.8px solid #ffffff4e;
}
</style>

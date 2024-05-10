<template>
  <div
    class="table-card flex mb-10 py-5 rounded-xl shadow bg-[rgba(30,41,59,1)] max-w-screen-xl"
  >
    <div class="card w-full py-4 px-10">
      <DataTable
        v-model:filters="filters"
        :value="supervisors"
        paginator
        :rows="5"
        dataKey="id"
        filterDisplay="row"
        :loading="loading"
        :globalFilterFields="[
          'id',
          'name',
          'age',
          'gender',
          'category',
          'contact',
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
                  placeholder="Search Supervisor"
                  class="pl-[3rem] font-normal bg-transparent border-[#ffffff4e]"
                />
              </div>
            </span>
          </div>
        </template>
        <template #empty> No supervisors found. </template>
        <template #loading> Loading supervisors data. Please wait. </template>
        <Column
          filterField="id"
          header="Supervisor Id"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            {{ data.id }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by faculty id"
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
        <Column filterField="age" header="Age" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.age }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by age"
            />
          </template>
        </Column>
        <Column filterField="gender" header="Gender" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.gender }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="genders"
              placeholder="Select gender"
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
          header="Category"
          filterField="category"
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            {{ data.category }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="category"
              placeholder="Select category"
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
          header="Contact Number"
          filterField="contact"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            {{ data.contact }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by contact"
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
import axios from "axios";
import api from "@/api/api";
const supervisors = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  age: { value: null, matchMode: FilterMatchMode.EQUALS },
  gender: { value: null, matchMode: FilterMatchMode.EQUALS },
  category: { value: null, matchMode: FilterMatchMode.EQUALS },
  contact: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
const genders = ref(["Male", "Female"]);
const category = ref(["Category A", "Category B", "Category C"]);
const loading = ref(true);

let fetchedData;

onMounted(async () => {
  fetchedData = await axios.get(`${api}/supervisors`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  console.log(fetchedData);

  supervisors.value = fetchedData.data.data.supervisors;
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

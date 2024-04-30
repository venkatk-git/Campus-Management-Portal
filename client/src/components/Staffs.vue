<template>
  <div
    class="table-card flex mb-10 py-5 rounded-xl shadow bg-[rgba(30,41,59,1)] max-w-screen-xl"
  >
    <div class="card w-full py-4 px-10">
      <DataTable
        v-model:filters="filters"
        :value="staffs"
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
          'location',
          'level',
          'contactNumber',
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
                  placeholder="Search Staff"
                  class="pl-[3rem] font-normal bg-transparent border-[#ffffff4e]"
                />
              </div>
            </span>
          </div>
        </template>
        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>
        <Column filterField="id" header="Staff ID" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.id }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by staff id"
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
              placeholder="Select Gender"
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
          filterField="location"
          header="Location"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            {{ data.location }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by location"
            />
          </template>
        </Column>
        <Column filterField="level" header="Level" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.level }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="levels"
              placeholder="Select Level"
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
          filterField="contactNumber"
          header="Contact Number"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            {{ data.contactNumber }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by Contact"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Tag from "primevue/tag";
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import data from "@/components/service/SampleStaffs.js";
const tasks = ref();
const customers = ref();
const staffs = ref();
const date = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  age: { value: null, matchMode: FilterMatchMode.EQUALS },
  category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  location: { value: null, matchMode: FilterMatchMode.CONTAINS },
  gender: { value: null, matchMode: FilterMatchMode.EQUALS },
  level: { value: null, matchMode: FilterMatchMode.EQUALS },
  contactNumber: { value: null, matchMode: FilterMatchMode.EQUALS },
});
const genders = ref(["Male", "Female"]);
const category = ref(["Category A", "Category B", "Category C"]);
const statuses = ref(["Completed", "Pending", "Ongoing"]);
const locations = ref(["Block A", "Block B", "Block C"]);
const levels = ref(["I", "II", "III"]);
const loading = ref(true);

onMounted(() => {
  data.getTasks().then((data) => {
    staffs.value = data;
    loading.value = false;
  });
  //   data.getTasks().then((data) => {
  //     console.log(data);
  //     tasks.value = data;
  //     loading.value = false;
  //   });
});

// const getCustomers = (data) => {
//   return [...(data || [])].map((d) => {
//     d.date = new Date(d.date);
//     return d;
//   });
// };
// const formatDate = (value) => {
//   return value.toLocaleDateString("en-US", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });
// };
// const formatCurrency = (value) => {
//   return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
// };
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

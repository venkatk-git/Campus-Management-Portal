<template>
  <div
    class="table-card flex justify-center items-center my-20 py-12 rounded-3xl shadow bg-[rgba(30,41,59,1)]"
  >
    <div class="card w-11/12">
      <DataTable
        v-model:filters="filters"
        :value="customers"
        paginator
        :rows="10"
        dataKey="id"
        filterDisplay="row"
        :loading="loading"
        :globalFilterFields="[
          'name',
          'country.name',
          'representative.name',
          'status',
        ]"
      >
        <template #header>
          <div class="flex justify-end border-none">
            <span class="relative">
              <i
                class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600"
              />
              <InputText
                v-model="filters['global'].value"
                placeholder="Keyword Search"
                class="pl-10 font-normal bg-transparent border-[#ffffff4e]"
              />
            </span>
          </div>
        </template>
        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>
        <Column field="name" header="Name" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.name }}
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
          header="Country"
          filterField="country.name"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <img
                alt="flag"
                src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                :class="`flag flag-${data.country.code}`"
                style="width: 24px"
              />
              <span>{{ data.country.name }}</span>
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by country"
            />
          </template>
        </Column>
        <Column
          header="Agent"
          filterField="representative"
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <img
                :alt="data.representative.name"
                :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                style="width: 32px"
              />
              <span>{{ data.representative.name }}</span>
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <MultiSelect
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="representatives"
              optionLabel="name"
              placeholder="Any"
              class="p-column-filter font-normal"
              style="min-width: 14rem"
              :maxSelectedLabels="1"
            >
              <template #option="slotProps">
                <div class="flex items-center gap-2">
                  <img
                    :alt="slotProps.option.name"
                    :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`"
                    style="width: 32px"
                  />
                  <span>{{ slotProps.option.name }}</span>
                </div>
              </template>
            </MultiSelect>
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
              placeholder="Select One"
              class="p-column-filter"
              style="min-width: 12rem"
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
import CustomerService from "./service/CustomerService";
const customers = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS },
});
const representatives = ref([
  { name: "Amy Elsner", image: "amyelsner.png" },
  { name: "Anna Fali", image: "annafali.png" },
  { name: "Asiya Javayant", image: "asiyajavayant.png" },
  { name: "Bernardo Dominic", image: "bernardodominic.png" },
  { name: "Elwin Sharvill", image: "elwinsharvill.png" },
  { name: "Ioni Bowcher", image: "ionibowcher.png" },
  { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
  { name: "Onyama Limba", image: "onyamalimba.png" },
  { name: "Stephen Shaw", image: "stephenshaw.png" },
  { name: "XuXue Feng", image: "xuxuefeng.png" },
]);
const statuses = ref([
  "unqualified",
  "qualified",
  "new",
  "negotiation",
  "renewal",
  "proposal",
]);
const loading = ref(true);

onMounted(() => {
  CustomerService.getCustomersMedium().then((data) => {
    customers.value = getCustomers(data);
    loading.value = false;
  });
});

const getCustomers = (data) => {
  return [...(data || [])].map((d) => {
    d.date = new Date(d.date);

    return d;
  });
};
const formatDate = (value) => {
  return value.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
const formatCurrency = (value) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};
const getSeverity = (status) => {
  switch (status) {
    case "unqualified":
      return "danger";

    case "qualified":
      return "success";

    case "new":
      return "info";

    case "negotiation":
      return "warning";

    case "renewal":
      return null;
  }
};
</script>

<style scoped>
.p-column-filter {
  background-color: transparent;
  border: 0.8px solid #ffffff4e;
}
</style>

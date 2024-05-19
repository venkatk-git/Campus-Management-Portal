<template>
  <div
    class="table-card flex mb-10 py-5 rounded-xl shadow bg-[rgba(30,41,59,1)] max-w-full"
  >
    <Toast />
    <!-- Dialog box  -->
    <Dialog
      v-model:visible="visible"
      modal
      class="bg-[rgba(30,41,59,1)] border-none"
      header="Update details"
      :style="{ width: '25rem' }"
    >
      <span
        class="text-surface-600 dark:text-surface-0/70 block mb-5"
        v-text="updateTaskName"
      ></span>
      <div class="flex items-center gap-3 mb-3">
        <label for="status" class="font-semibold w-[6rem]">Status</label>
        <Dropdown
          id="status"
          v-model="updateStatus"
          :options="statuses"
          placeholder="Select Status"
          class="p-column-filter w-[14rem]"
          style="min-width: 6rem"
          :showClear="true"
        >
          <template #option="slotProps">
            <div class="flex items-center gap-2">
              <span>{{ slotProps.option }}</span>
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="flex items-center gap-3 mb-2">
        <label for="remarks" class="font-semibold w-[6rem]">Remarks</label>
        <Textarea
          v-model="updateRemarks"
          rows="5"
          cols="60"
          class="border-[#ffffff4e] w-[14rem]"
        />
      </div>
      <template #footer>
        <Button
          label="Cancel"
          text
          @click="visible = false"
          autofocus
          :pt:root:class="'flex justify-center gap-3 p-ripple px-4 py-2 rounded-lg border-2 border-[#9ca3af] '"
        />
        <Button
          label="Save"
          outlined
          @click="handleUpdateSave()"
          :pt:root:class="'flex justify-center gap-3 p-ripple px-4 py-2 rounded-lg border-2 border-[#4F46E5] bg-[#4F46E5]'"
          autofocus
        />
      </template>
    </Dialog>
    <div class="card w-full py-4 px-10">
      <!-- Table -->
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
          <div class="flex justify-end border-none header-container">
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
                  class="pl-[3rem] font-normal bg-transparent border-[#ffffff4e] global-search"
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
        <!-- Status -->
        <Column
          field="status"
          header="Status"
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            <!-- v-if="
              localStorage.getItem('role') != 'admin' ||
              localStorage.getItem('role') != 'supervisor'
            " -->
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
        <!-- Remarks -->
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
        <!-- Edit -->
        <Column
          header="Update"
          style="min-width: 6rem"
          v-if="userType == 'admin' || userType == 'supervisor'"
        >
          <template #body="{ data }">
            <Button
              @click="handleEdit(data.id, data.name)"
              :pt:root:class="'flex justify-center gap-3 p-ripple px-2 py-2 rounded-lg  border-[#9ca3af] bg-[#4F46E5]'"
              ><span class="material-symbols-outlined"> edit </span></Button
            >
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import api from "@/api/api";

const toast = useToast();

const tasks = ref();
const date = ref();
const visible = ref(false);
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

let fetchedData;

onMounted(async () => {
  fetchedData = await axios.get(`${api}/tasks`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  tasks.value = fetchedData.data.data.tasks;
  loading.value = false;
});

const showToast = (severity, summary, detail) => {
  toast.add({
    severity: severity,
    summary: summary,
    detail: detail,
    life: 3000,
  });
};

let updateTaskId;
let updateTaskName = "Update Inwmation";
const updateStatus = ref("Ongoing");
const updateRemarks = ref("");

const handleEdit = async (id, name) => {
  visible.value = true;
  updateTaskId = id;
  updateTaskName = name;
};

const handleUpdateSave = async () => {
  visible.value = false;
  const obj = {
    status: updateStatus.value,
    remarks: updateRemarks.value,
  };

  try {
    await axios.patch(`${api}/tasks/${updateTaskId}`, obj, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchedData = await axios.get(`${api}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    tasks.value = fetchedData.data.data.tasks;
  } catch (error) {
    showToast("error", "Failed to submit", "Oops! Something went wrong");
  }
};

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

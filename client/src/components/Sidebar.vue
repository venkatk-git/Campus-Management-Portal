<template>
  <aside
    class="flex flex-col bg-[#0f172a] overflow-hidden min-h-screen gap-5 p-4 open"
    id="aside"
  >
    <div class="flex" :class="`${isOpen ? 'expanded px-4' : 'not-expanded'}`">
      <div class="profile transition duration-200 ease-in-out">
        <div
          class="flex justify-center transition duration-200 ease-in-out py-4"
        >
          <Logo size="32px" />
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-between h-full">
      <div class="dashboard-list flex flex-col justify-center">
        <h3 class="text-[#818cf8] text-sm font-semibold p-5 uppercase">
          DASHBOARDS
        </h3>
        <div class="menu flex flex-col gap-1">
          <router-link class="button" to="/dashboard/analytics">
            <span class="material-icons"> analytics </span>
            <span class="text">Analytics</span>
          </router-link>
          <router-link class="button" to="/dashboard/tasks">
            <span class="material-icons">task</span>
            <span class="text">Tasks</span>
          </router-link>
          <router-link class="button" to="/dashboard/staffs">
            <span class="material-icons">engineering</span>
            <span class="text">Staffs</span>
          </router-link>
          <router-link class="button" to="/dashboard/createtask">
            <span class="material-icons">design_services</span>
            <span class="text">Create Task</span>
          </router-link>
          <router-link class="button" to="/dashboard/createstaff">
            <span class="material-icons">edit_document</span>
            <span class="text">Create Staff</span>
          </router-link>
          <router-link class="button" to="/dashboard/createstaff">
            <span class="material-icons">edit_document</span>
            <span class="text">Faculties</span>
          </router-link>
          <router-link class="button" to="/dashboard/createstaff">
            <span class="material-icons">edit_document</span>
            <span class="text">Create Faculty</span>
          </router-link>
          <router-link class="button" to="/dashboard/createstaff">
            <span class="material-icons">edit_document</span>
            <span class="text">Supervisors</span>
          </router-link>
          <router-link class="button" to="/dashboard/createstaff">
            <span class="material-icons">edit_document</span>
            <span class="text">Create Supervisor</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="logout flex">
      <router-link class="button" :class="isOpen && 'w-full'" to="/">
        <span class="material-icons"> logout </span>
        <span class="text">Sign out</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import Logo from "./Logo.vue";

const isOpen = ref(localStorage.getItem("isOpen"));
</script>

<style scoped>
aside {
  visibility: hidden;
  margin-left: -95px;
  transition: 0.2s ease-in-out;
  border-right: 0.8px solid #f1f5f91f;
}

.open {
  visibility: visible;
  margin-left: 0;
  width: var(--sidebar-width);
}

.menu-toggle-wrapper {
  transition: 0.25s ease-in-out;
}

.button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 16px;
  transition: 200ms ease-in-out;
  border-radius: 6px;
}

.material-icons {
  opacity: 0.5;
}

.text {
  font-size: 13px;
  opacity: 0.8;
}

.button:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.12);
}

.button:hover .material-icons,
.button:hover .text {
  opacity: 1;
}

.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.12);
}

.router-link-exact-active .text,
.router-link-exact-active .material-icons {
  opacity: 1;
}

.menu {
  align-items: center;
}

.open .menu {
  align-items: normal;
}

h3,
.button .text {
  display: none;
  transition: 300ms ease-out;
}

.open h3,
.open .button .text {
  display: inline-block;
}

.open .material-icons {
  margin-right: 16px;
}

.open .menu-toggle-wrapper {
  justify-content: flex-end;
  transform: rotate(-180deg);
}

.expanded {
  justify-content: space-between;
}

.not-expanded {
  flex-direction: column-reverse;
  gap: 1rem;
}

.material-icons {
  transition: 200ms ease-in-out;
}

@media (max-width: 768px) {
  aside {
    position: fixed;
    z-index: 100;
  }
}
.material-symbols-outlined {
  color: rgb(148, 163, 184);
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
</style>

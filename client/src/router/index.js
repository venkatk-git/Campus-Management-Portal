import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Main from "@/views/Main.vue";
import AnalyticsPage from "@/views/AnalyticsPage.vue";
import CreateStaffPage from "@/views/CreateStaffPage.vue";
import CreateTaskPage from "@/views/CreateTaskPage.vue";
import CreateFacultyPage from "@/views/CreateFacultyPage.vue";
import CreateSupervisorPage from "@/views/CreateSupervisorPage.vue";
import StaffsPage from "@/views/StaffsPage.vue";
import TasksPage from "@/views/TasksPage.vue";
import FacultyPage from "@/views/FacultyPage.vue";
import SupervisorsPage from "@/views/SupervisorsPage.vue";
import NotfoundPage from "@/views/NotfoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/login",
      redirect: "/",
    },
    {
      path: "/dashboard/analytics",
      name: "analytics",
      component: AnalyticsPage,
      meta: { allow: "any" },
    },
    {
      path: "/dashboard/staffs",
      name: "staffs",
      component: StaffsPage,
      meta: { allow: "any" },
    },
    {
      path: "/dashboard/tasks",
      name: "tasks",
      component: TasksPage,
      meta: { allow: "any" },
    },
    {
      path: "/dashboard/faculty",
      name: "faculty",
      component: FacultyPage,
      meta: { allow: "any" },
    },
    {
      path: "/dashboard/supervisors",
      name: "supervisors",
      component: SupervisorsPage,
      meta: { allow: "any" },
    },
    {
      path: "/dashboard/createstaff",
      name: "createstaff",
      component: CreateStaffPage,
      meta: { allow: "protected" },
    },
    {
      path: "/dashboard/createtask",
      name: "createtask",
      component: CreateTaskPage,
      meta: { allow: "protected" },
    },
    {
      path: "/dashboard/createfaculty",
      name: "create faculty",
      component: CreateFacultyPage,
      meta: { allow: "admin" },
    },
    {
      path: "/dashboard/createsupervisor",
      name: "create supervisor",
      component: CreateSupervisorPage,
      meta: { allow: "admin" },
    },
    {
      path: "/404",
      name: "notfound",
      component: NotfoundPage,
    },
    {
      path: "/:catchall(.*)",
      redirect: "/404",
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path == "/") next();

  if (localStorage.getItem("auth") == "true") {
    if (to.meta.allow == "any") next();

    if (
      (to.meta.allow == "protected" &&
        localStorage.getItem("role") == "admin") ||
      localStorage.getItem("role") == "supervisor"
    )
      next();

    if (to.meta.allow == "admin" && localStorage.getItem("role") == "admin")
      next();

    if (!to.meta.allow) next();
  }

  next("/login");
});

export default router;

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
      path: "/dashboard",
      name: "dashboard",
      component: Main,
    },
    {
      path: "/dashboard/analytics",
      name: "analytics",
      component: AnalyticsPage,
    },
    {
      path: "/dashboard/createstaff",
      name: "createstaff",
      component: CreateStaffPage,
    },
    {
      path: "/dashboard/createtask",
      name: "createtask",
      component: CreateTaskPage,
    },
    {
      path: "/dashboard/staffs",
      name: "staffs",
      component: StaffsPage,
    },
    {
      path: "/dashboard/tasks",
      name: "tasks",
      component: TasksPage,
    },
    {
      path: "/dashboard/faculty",
      name: "faculty",
      component: FacultyPage,
    },
    {
      path: "/dashboard/supervisors",
      name: "supervisors",
      component: SupervisorsPage,
    },
    {
      path: "/dashboard/createfaculty",
      name: "create faculty",
      component: CreateFacultyPage,
    },
    {
      path: "/dashboard/createsupervisor",
      name: "create supervisor",
      component: CreateSupervisorPage,
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
    next();
  } else {
    next("/login");
  }
});

export default router;

import Task from "../components/Task/Task.vue";
import Login from "../components/Login/Login.vue";
import Profile from "../components/Profile/Profile.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/task",
    component: Task,
  },
  {
    path: "/profile",
    component: Profile,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

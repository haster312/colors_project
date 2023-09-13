import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ArtBoard from "../views/ArtBoard";
import Prompt from "../components/FindMyLook/Prompt";
import Recommendation from "../components/FindMyLook/Recommendation";
import FindMyLook from "../views/FindMyLook";
import Register from "../views/Register";
import CosmeticTryOn from "@/components/FindMyLook/CosmeticTryOn";
import MyCollection from "@/components/FindMyLook/MyCollection";

Vue.use(VueRouter);

const defaultMeta = {
  header: true,
  navigator: false,
  sidebar: false,
  transition: "slide",
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { ...defaultMeta, sidebar: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { ...defaultMeta },
  },
  {
    path: "/art-board",
    name: "ArtBoard",
    component: ArtBoard,
    meta: { ...defaultMeta, header: false },
  },
  {
    path: "/prompt",
    component: FindMyLook,
    children: [
      {
        path: "/",
        name: "Prompt",
        component: Prompt,
        meta: {
          ...defaultMeta,
          navigator: true,
          sidebar: true,
          title: "Find My Look",
        },
      },
      {
        path: "recommendation",
        name: "Recommendation",
        component: Recommendation,
        meta: {
          ...defaultMeta,
          navigator: true,
          sidebar: true,
          title: "AI Recommendation",
          parent: "Prompt",
        },
      },
      {
        path: "try-on",
        name: "TryOn",
        component: CosmeticTryOn,
        meta: {
          ...defaultMeta,
          navigator: true,
          sidebar: true,
          title: "Cosmetic Try-On",
          parent: "Prompt",
        },
      },
    ],
  },
  {
    path: "/my-collection",
    name: "MyCollection",
    component: MyCollection,
    meta: {
      ...defaultMeta,
      sidebar: true,
      title: "My Collection",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.afterEach((to, from) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;

  to.meta.transition = toDepth < fromDepth ? "slide-right" : "slide-left";
  if (to.meta.parent) {
    to.meta.prevRoute = to.meta.parent;
  } else {
    to.meta.prevRoute = "Home";
  }
});

export default router;

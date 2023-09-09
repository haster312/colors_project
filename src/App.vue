<template>
  <div id="app">
    <GeneralHeader v-if="$route.meta.header" />
    <notification />
    <transition :name="$route.meta.transition" mode="out-in">
      <router-view v-slot="{ Component, route }">
        <component :key="route.path" :is="Component" />
      </router-view>
    </transition>
  </div>
</template>

<script>
import GeneralHeader from "./components/Common/GeneralHeader";
import { mapActions, mapGetters } from "vuex";
import Notification from "./components/Common/Notification";

export default {
  components: { Notification, GeneralHeader },
  watch: {
    error(value) {
      if (value) {
        this.$bvToast.toast(value, {
          variant: "danger",
          autoHideDelay: 5000,
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      error: "error",
    }),
  },
  methods: {
    ...mapActions({
      setError: "setError",
    }),
  },
};
</script>
<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>

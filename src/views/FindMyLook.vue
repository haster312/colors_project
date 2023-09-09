<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <component :key="route.path" :is="Component" />
    </transition>
  </router-view>
</template>

<script>
export default {
  name: "FindMyLook",
};
</script>

<style scoped></style>

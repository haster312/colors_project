<template>
  <a href="#" @click="goToRoute"><b-icon icon="arrow-left"></b-icon></a>
</template>

<script>
export default {
  name: "Navigator",
  data() {
    return {
      prevRoute: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  methods: {
    goToRoute(e) {
      e.preventDefault();
      const prevRoute = this.$route.meta.prevRoute;
      this.$router.push({ name: prevRoute ?? "Home" });
    },
  },
};
</script>

<style scoped lang="scss">
a {
  display: inline-block;
  position: absolute;
  top: 2px;
  left: 0;
  color: $primary-color;
}
</style>

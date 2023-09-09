<template>
  <section class="sidebar-section">
    <span class="menu-button" v-if="showSidebar">
      <b-icon-list v-b-toggle.sidebar-right></b-icon-list>
    </span>
    <b-sidebar id="sidebar-right" right bg-variant="white" text-variant="white">
      <b-nav vertical>
        <b-nav-item>
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link :to="{ name: 'ArtBoard' }">Find My Look</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link :to="{ name: 'MyCollection' }"
            >My Collection</router-link
          >
        </b-nav-item>
        <b-nav-item @click="doLogout">Log Out</b-nav-item>
      </b-nav>
    </b-sidebar>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Sidebar",
  computed: {
    showSidebar() {
      return this.$route.meta.sidebar;
    },
  },
  methods: {
    ...mapActions({
      clearInfo: "User/clearInfo",
    }),
    doLogout() {
      this.clearInfo();
      this.$router.push({ name: "Register" });
    },
  },
};
</script>

<style lang="scss">
.sidebar-section {
  position: relative;
  .menu-button {
    position: absolute;
    top: -25px;
    right: 0;
  }
}

button {
  &.close {
    color: #000 !important;
    background-color: white;
    border: none;
  }
}

.b-sidebar-body {
  .nav-item {
    margin: 5px 0;

    a {
      font-size: 18px;
      font-weight: bold;
      color: $primary-color;
      padding: 10px 0;
      text-decoration: underline;
    }
  }
}
</style>

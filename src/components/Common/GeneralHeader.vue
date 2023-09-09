<template>
  <b-container fluid>
    <div class="main-header">
      <div class="main-header__navigation" v-if="showNavigator">
        <Navigator></Navigator>
        <span class="title">{{ title }}</span>
      </div>
      <div class="main-header__logo" v-else>
        <router-link :to="{ name: 'Home' }">
          <img src="../../assets/images/logo_color.png" alt="" />
        </router-link>
        <Sidebar />
      </div>
    </div>
  </b-container>
</template>

<script>
import Navigator from "./Navigator";
import Sidebar from "./Sidebar";
import { mapGetters } from "vuex";

export default {
  name: "GeneralHeader",
  components: { Sidebar, Navigator },
  computed: {
    ...mapGetters({
      info: "User/info",
    }),
    showNavigator() {
      return this.$route.meta.navigator;
    },
    title() {
      return this.$route.meta.title ?? "";
    },
  },
  beforeMount() {
    //Replace for authentication
    if (
      (!this.info.phone ||
        this.info.brands.length === 0 ||
        this.info.skinType.length === 0) &&
      this.$route.name !== "Register"
    ) {
      this.$router.push({ name: "Register" });
    }
  },
};
</script>

<style lang="scss">
.main-header {
  padding: 15px 0;
  text-align: center;
  &__navigation {
    position: relative;
    .title {
      font-size: 18px;
      font-weight: bold;
      line-height: 30px;
    }
  }
  &__logo {
    img {
      width: 100px;
    }
  }
}
</style>

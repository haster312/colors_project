<template>
  <section class="register-steps">
    <div class="register-steps_process" ref="process">
      <span class="process-0" data-step="0"></span>
      <span class="process-1 d-none" data-step="1"></span>
      <span class="process-2 d-none" data-step="2"></span>
    </div>
    <b-container fluid>
      <b-tabs card class="mt-3 full-width" v-model="step">
        <b-tab title="" active ref="register">
          <h2 class="title">Register with you phone number</h2>
          <b-form class="mt-5">
            <b-input type="text" class="text-center" v-model="phone" />
          </b-form>
        </b-tab>
        <b-tab title="" ref="brands">
          <BrandSelector v-on:change="onChange" />
        </b-tab>
        <b-tab title="" ref="skin-type">
          <SkinTypeSelector v-on:change="onChange" />
        </b-tab>
      </b-tabs>
      <div class="register-steps__button text-center">
        <b-btn class="btn-general" @click="checkStep" v-show="oneAnyChanged">
          <b-spinner small v-if="isLoading"></b-spinner
          ><span v-else>Continue</span></b-btn
        >
      </div>
    </b-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import skinList from "../fixtures/skins";
import BrandSelector from "@/components/Register/BrandSelector";
import SkinTypeSelector from "@/components/Register/SkinTypeSelector";

export default {
  components: {SkinTypeSelector, BrandSelector},
  data() {
    return {
      isLoading: false,
      oneAnyChanged: false,
      phone: null,
      step: 0,
    };
  },
  computed: {
    ...mapGetters({
      info: "User/info",
    }),
    skinList() {
      // Temporary
      return skinList;
    },
  },
  beforeMount() {
    if (
      this.info.phone &&
      this.info.brands.length > 0 &&
      this.info.skinType.length > 0
    ) {
      this.$router.push({ name: "Home" });
    }
  },
  watch: {
    phone(value) {
      if (value) {
        this.onChange(true);
      }
    },
  },
  methods: {
    ...mapActions({
      setPhone: "User/setPhone",
      setError: "setError",
      setMessage: "setMessage",
    }),
    checkStep() {
      switch (this.step) {
        case 0:
          this.step1();
          break;
        case 1:
          this.step2();
          break;
        case 2:
          this.step3();
          break;
      }
    },
    step1() {
      if (!this.phone) {
        this.setError("Phone number cannot be empty!");
      } else {
        this.toggleLoading();
        this.setPhone(this.phone);

        this.setError(null);

        setTimeout(() => {
          this.toggleLoading();
          this.onChange(false);
          this.step = 1;
          this.toggleProcess();
        }, 1000);
      }
    },
    step2() {
      this.toggleLoading();

      setTimeout(() => {
        this.toggleLoading();
        this.oneAnyChanged = false;
        this.step = 2;
        this.toggleProcess();
      }, 1000);
    },
    step3() {
      this.toggleLoading();

      setTimeout(() => {
        this.toggleLoading();
        this.setMessage("Register successful");
        this.$router.push({ name: "Home" });
      }, 1000);
    },
    toggleLoading() {
      this.isLoading = !this.isLoading;
    },
    toggleProcess() {
      const processes = this.$refs.process.querySelectorAll("span");
      processes.forEach((process) => {
        const step = process.dataset.step;
        if (step <= this.step) {
          process.classList.remove("d-none");
        }
      });
    },
    onChange(status) {
      this.oneAnyChanged = status;
    },
  },
};
</script>
<style lang="scss">
.full-width {
  .nav-tabs {
    display: none;
  }

  .tab-pane.active {
    transition: all 0.3s;
    transform: translateY(1rem);
  }

  .tab-pane.fade.show {
    transform: translateY(0rem);
  }
}
.register-steps_process {
  display: flex;
  border-top: 1px solid $primary-color;
  [class^="process-"] {
    display: block;
    flex: 0 0 33.33%;
    border-top: 2px solid $primary-color;
    height: 2px;
  }
}
.register-steps {
  .tab-pane {
    padding-top: 75px;
  }
  .title {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
  }

  &__button {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    padding-bottom: 50px;
  }
}
</style>

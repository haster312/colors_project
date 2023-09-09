<template>
  <div class="preview-section">
    <div id="preview"></div>
    <div class="d-flex justify-content-center mt-5" v-if="isLoading">
      <b-spinner class="ml-auto"></b-spinner>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {Dom, Effect, Module, Player, Webcam} from "@banuba/webar";
import data from "@banuba/webar/dist/BanubaSDK.data";
import wasm from "@banuba/webar/dist/BanubaSDK.wasm";
import simd from "@banuba/webar/dist/BanubaSDK.simd.wasm";
import BaseEffect from "../../assets/effect/Base.zip";
import FaceTracker from "@banuba/webar/dist/modules/face_tracker.zip";
import Lips from "@banuba/webar/dist/modules/lips.zip";
import Background from "@banuba/webar/dist/modules/background.zip";
import Body from "@banuba/webar/dist/modules/body.zip";
import Eyes from "@banuba/webar/dist/modules/eyes.zip";
import Hands from "@banuba/webar/dist/modules/hands.zip";
import Hair from "@banuba/webar/dist/modules/hair.zip";
import Skin from "@banuba/webar/dist/modules/skin.zip";

export default {
  name: "Camera",
  data() {
    return {
      isLoading: true,
      effect: null,
      player: null,
    };
  },
  computed: {
    ...mapGetters({
      effects: "Recommendation/effects",
    }),
  },
  mounted() {
    (async () => {
      this.player = await Player.create({
        clientToken: process.env.VUE_APP_BANUBA_TOKEN,
        locateFile: {
          "BanubaSDK.data": data,
          "BanubaSDK.wasm": wasm,
          "BanubaSDK.simd.wasm": simd,
        },
      });

      this.player.use(new Webcam());
      this.effect = new Effect(BaseEffect);
      await this.player.applyEffect(this.effect);
      await this.player.addModule(
        ...[Background, Body, Hair, Lips, Eyes, FaceTracker, Skin, Hands].map(
          (m) => new Module(m)
        )
      );

      Dom.render(this.player, "#preview");
      // If effects are defined, should apply immediately
      if (Object.keys(this.effects)) {
        await this.applyNewEffect();
      }
      this.isLoading = false;
      this.$emit("callback");
    })();
  },
  methods: {
    async applyNewEffect() {
      const effectList = this.getConfigs();

      for (let effectConfig of effectList) {
        await this.effect.evalJs(effectConfig);
      }
    },
    getConfigs() {
      const configs = Object.values(this.effects);
      return configs.reduce((effectList, item) => {
        return [...effectList, ...item];
      }, []);
    },
  },
};
</script>

<style scoped></style>

<template>
  <b-container>
    <Camera v-on:callback="initRecommendation" />
    <b-container fluid>
      <div class="d-flex justify-content-center mt-5" v-if="isLoading">
        <b-spinner class="ml-auto"></b-spinner>
      </div>
      <div v-if="loaded">
        <h2 class="section-title text-center">
          Your personalized make up options
        </h2>
        <div class="recommendation-list">
          <RecommendationItem
            v-for="(recommendation, index) in recommendations"
            v-bind:key="index"
            :recommendation="recommendation"
          />
        </div>
      </div>
    </b-container>
  </b-container>
</template>

<script type="module">
import { mapActions, mapGetters } from "vuex";
import Camera from "@/components/FindMyLook/Camera";
import RecommendationItem from "@/components/FindMyLook/RecommendationItem";

export default {
  name: "Recommendation",
  components: { RecommendationItem, Camera },
  data() {
    return {
      player: null,
      loaded: false,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      recommendations: "Recommendation/recommendations",
    }),
  },
  methods: {
    ...mapActions({
      loadProducts: "Recommendation/loadProducts",
      loadRecommendations: "Recommendation/loadRecommendations",
      createCollectionByRecommendation:
        "Recommendation/createCollectionByRecommendation",
    }),
    initRecommendation() {
      this.isLoading = true;
      // fake api loading
      setTimeout(() => {
        this.loadProducts();

        this.isLoading = false;
        this.loaded = true;
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
.preview-section {
  margin-bottom: 25px;
}
.recommendation-list {
  max-height: 450px;
  overflow-y: scroll;
}
</style>

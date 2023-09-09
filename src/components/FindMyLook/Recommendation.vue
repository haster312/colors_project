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
          <div
            class="item"
            v-for="(recommendation, index) in recommendations"
            v-bind:key="index"
            @click="tryRecommendation(recommendation)"
          >
            <div class="preview">
              <img src="../../assets/images/sample.png" alt="" />
            </div>
            <div class="detail">
              <h4>{{ recommendation.title }}</h4>
              <p>{{ recommendation.reason }}</p>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </b-container>
</template>

<script type="module">
import { mapActions, mapGetters } from "vuex";
import Camera from "@/components/FindMyLook/Camera";

export default {
  name: "Recommendation",
  components: { Camera },
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
        this.loadRecommendations();

        this.isLoading = false;
        this.loaded = true;
      }, 1000);
    },
    // View fixtures - recommendation for data structure
    tryRecommendation(recommendation) {
      this.createCollectionByRecommendation({ ...recommendation });
      this.$router.push({ name: "TryOn" });
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

  .item {
    display: grid;
    padding: 15px 20px;
    margin-bottom: 15px;
    border-radius: 25px;
    background-color: #f8f8f9;
    grid-template-columns: 30% 70%;
    gap: 5px;

    div {
      display: inline-block;
    }

    img {
      width: 100px;
    }

    .detail {
      max-height: 150px;
      padding-left: 10px;

      h4 {
        font-size: 14px;
        line-height: 16px;
        font-weight: bold;
        color: #191819;
      }
      p {
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>

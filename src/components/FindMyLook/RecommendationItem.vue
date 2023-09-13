<template>
  <div class="item" @click="tryRecommendation(recommendation)">
    <div class="preview">
      <img src="../../assets/images/sample.png" alt="" />
    </div>
    <div class="detail">
      <h4>{{ recommendation.title }}</h4>
      <p v-html="reason"></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RecommendationItem",
  props: {
    recommendation: {
      type: Object,
    },
  },
  computed: {
    reason() {
      return this.recommendation.reason.replaceAll("\n", "<br/>");
    },
  },
  methods: {
    ...mapActions({
      createCollectionByRecommendation:
        "Recommendation/createCollectionByRecommendation",
    }),
    // View fixtures - recommendation for data structure
    tryRecommendation(recommendation) {
      this.createCollectionByRecommendation({ ...recommendation });
      this.$router.push({ name: "TryOn" });
    },
  },
};
</script>

<style scoped lang="scss">
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
    padding-left: 10px;

    h4 {
      font-size: 14px;
      line-height: 16px;
      font-weight: bold;
      color: #191819;
    }
    p {
      font-size: 12px;
    }
  }
}
</style>

<template>
  <b-container fluid>
    <b-form class="pt-3">
      <div class="prompt-content">
        <b-textarea rows="5" v-model="promptData" :disabled="isLoading">
        </b-textarea>
        <span class="help-text text-danger" v-show="errorMessage !== ''">{{
          errorMessage
        }}</span>
        <p class="mb-0 text-end">
          <b-button
            class="prompt-button"
            :disabled="isLoading"
            @click="getRecommendation"
          >
            <b-spinner small v-if="isLoading"></b-spinner>
            <span v-else>Advise Me</span>
          </b-button>
        </p>
      </div>
      <div class="prompt-processing" v-show="isLoading">
        <p class="text-center">Personalizing your make up options</p>
        <b-progress :value="processedValue" :max="maxValue"></b-progress>
      </div>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "Prompt",
  data() {
    return {
      isLoading: false,
      promptData: "",
      errorMessage: "",
      processedValue: 0,
      maxValue: 20,
    };
  },
  methods: {
    getRecommendation() {
      this.errorMessage = "";
      if (this.promptData === "") {
        this.errorMessage = "Prompt data cannot be empty";
      } else {
        this.isLoading = true;
        const interval = setInterval(() => {
          this.processedValue += 1;
          if (this.processedValue >= this.maxValue) {
            clearInterval(interval);
            this.$router.push({ name: "Recommendation" });
          }
        }, 100);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.prompt-content {
  border: 1px solid $primary-color;
  border-radius: 20px;
  padding: 10px;
  textarea {
    &:focus {
      box-shadow: none;
    }
    border: none;
    margin-bottom: 10px;
  }
  .prompt-button {
    min-width: 120px;
    background-color: #b5b2b2;
    color: #fff;
    border-color: #b5b2b2;
    border-radius: 25px;
  }
}

.prompt-processing {
  background-color: #f7f7f9;
  padding: 15px;
  margin-top: 25px;
  border-radius: 25px;
  p {
    font-weight: bold;
    margin-bottom: 5px;
  }
}
</style>

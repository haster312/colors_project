<template>
  <b-container>
    <Camera ref="camera" v-on:callback="initProductCategory" />
    <div class="try-on-container">
      <div class="d-flex justify-content-center mt-5" v-if="isLoading">
        <b-spinner class="ml-auto"></b-spinner>
      </div>

      <ProductList
        v-for="(category, index) in Object.keys(productCategory)"
        v-bind:key="index"
        :category="category"
        :products="productCategory[category]"
        v-on:callback="loadEffect"
      />
    </div>
    <div class="try-on-button text-center">
      <b-btn class="btn-general" v-b-modal.title-modal
        >Save your collection</b-btn
      >
    </div>
    <b-modal
      id="title-modal"
      title="Update Collection Name"
      centered
      ok-title="Save"
      @ok="storeCollection"
    >
      <b-input v-model="title" :placeholder="collection.title" />
    </b-modal>
  </b-container>
</template>

<script>
import Camera from "@/components/FindMyLook/Camera";
import { mapActions, mapGetters } from "vuex";
import ProductList from "@/components/FindMyLook/ProductList";

export default {
  name: "CosmeticTryOn",
  components: { ProductList, Camera },
  data() {
    return {
      isLoading: false,
      loaded: false,
      title: null,
    };
  },
  computed: {
    ...mapGetters({
      productCategory: "Recommendation/productCategory",
      collection: "Recommendation/collection",
    }),
  },
  beforeMount() {
    if (this.collection.title === undefined) {
      this.$router.push({ name: "ArtBoard" });
    }
  },
  methods: {
    ...mapActions({
      loadProductCategory: "Recommendation/loadProductCategory",
      setCollection: "Recommendation/setCollection",
      setCollections: "Recommendation/setCollections",
    }),
    loadEffect() {
      this.$refs.camera.applyNewEffect();
    },
    initProductCategory() {
      this.isLoading = true;

      setTimeout(() => {
        this.loadProductCategory();
        this.isLoading = false;
        this.loaded = true;
      }, 1000);
    },
    storeCollection() {
      let collection = this.collection;
      if (this.title && this.title !== "") {
        collection.title = this.title;
      }

      if (!collection.id) {
        collection.id = Math.floor(Math.random() * 1000 + 1);
      }

      this.setCollection(collection);
      this.setCollections({ ...collection });

      this.$router.push({ name: "MyCollection" });
    },
  },
};
</script>

<style lang="scss">
.try-on-container {
  margin-top: 30px;
  height: 400px;
  overflow-y: scroll;
}

.try-on-button {
  margin-top: 25px;
  margin-bottom: 25px;
}

.modal-footer {
  text-align: center;
  .btn.btn-primary,
  .btn.btn-info {
    padding: 10px 40px;
    background-color: #000;
    color: #fff;
    border-radius: 50px;
    font-size: 16px;
  }
}
</style>

<template>
  <section class="product-list">
    <h2 class="section-title">{{ category }}</h2>
    <div class="product-list__container" ref="product-container">
      <div ref="swiper" class="swiper">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper" ref="">
          <!-- Slides -->
          <div
            class="swiper-slide"
            v-for="(item, index) in products"
            v-bind:key="index"
          >
            <div
              :class="[
                {
                  'product-detail': true,
                  active: item.id === selectedProductId,
                },
              ]"
              :data-config="item.configuration_reset"
              :data-product-id="item.id"
              :data-category="category"
              :ref="'product' + item.id"
            >
              <p class="name" @click="selectProduct">{{ item.name }}</p>
            </div>
          </div>
        </div>
        <!-- If we need scrollbar -->
        <div class="swiper-scrollbar"></div>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from "swiper";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductList",
  props: {
    category: {
      type: String,
    },
    products: {
      type: Array,
    },
  },
  mounted() {
    const SECOND = 1000; // milliseconds
    new Swiper(this.$refs.swiper, {
      slidesPerView: 2,
      spaceBetween: 10,
      speed: 5 * SECOND,
    });
  },
  computed: {
    ...mapGetters({
      effects: "Recommendation/effects",
      collection: "Recommendation/collection",
    }),
    isCollectionNotEmpty() {
      return Object.keys(this.collection.products).length > 0;
    },
    selectedProductId() {
      if (this.isCollectionNotEmpty) {
        const selectedProduct = this.collection.products[this.category];

        return selectedProduct ? selectedProduct.id : 0;
      }
      return 0;
    },
  },
  methods: {
    ...mapActions({
      applyEffect: "Recommendation/applyEffect",
      removeEffect: "Recommendation/removeEffect",
      updateCollection: "Recommendation/updateCollection",
    }),
    selectProduct(e) {
      const dataset = e.target.parentNode.dataset;
      const productId = parseInt(dataset.productId);
      this.updateCollection({ category: this.category, productId });
      // Callback to apply effect
      this.$emit("callback");
    },
  },
};
</script>

<style lang="scss">
@import "swiper/swiper.scss";
.product-list {
  overflow: auto;
  margin-bottom: 30px;
  &__container {
    overflow-x: hidden;
    .product-detail {
      display: table;
      height: 120px;
      padding: 10px 20px;
      background-color: #ffeed0;
      border-radius: 25px;
      border: 1px solid $sub-color;

      &.active {
        border: 3px solid $primary-color;
      }

      p {
        margin-bottom: 0;
        vertical-align: middle;
        display: table-cell;

        &.name {
          color: #191819;
          font-weight: bold;
          text-align: center;
        }
      }
    }
  }
}
</style>

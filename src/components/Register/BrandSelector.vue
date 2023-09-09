<template>
  <section>
    <h2 class="title">What is your favorite brands?</h2>
    <ul class="brand-list">
      <li
        :class="[{ item: true, selected: info.brands.includes(brand.name) }]"
        v-for="(brand, index) in brandList"
        v-bind:key="index"
        @click="selectBrand"
      >
        <span :data-value="brand.name">{{ brand.name }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import brandList from "@/fixtures/brands";

export default {
  name: "BrandSelector",
  computed: {
    ...mapGetters({
      info: "User/info",
    }),
    brandList() {
      const images = require.context("@/assets/images/brands", false, /\.png$/);
      // Temporary
      return brandList.map((brand) => {
        return { ...brand, path: images("./" + brand.path) };
      });
    },
  },
  methods: {
    ...mapActions({
      setBrands: "User/setBrands",
    }),
    selectBrand(e) {
      this.setBrands(e.target.dataset.value);
      this.$emit("change", this.info.brands.length > 0);
    },
  },
};
</script>

<style scoped lang="scss">
.brand-list {
  padding: 15px 0;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  list-style: none;
  .item {
    display: table;
    width: 100px;
    height: 100px;
    color: #fff;
    border-radius: 25px;
    background-color: #000;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;

    &.selected {
      border: 4px solid $primary-color;
    }

    span {
      display: table-cell;
      vertical-align: middle;
      font-size: 16px;
      font-weight: bold;
      word-wrap: break-word;
      text-align: center;
    }
  }
}
</style>

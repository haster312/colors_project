<template>
  <section>
    <h2 class="title">What is your skin type?</h2>
    <ul class="skin-list">
      <li
        :class="{
          left: direction === 'left',
          right: direction === 'right',
        }"
        v-for="direction of Object.keys(skinList)"
        v-bind:key="direction"
      >
        <span
          :class="[{ selected: info.skinType.includes(skin) }]"
          v-for="skin in skinList[direction]"
          v-bind:key="skin"
          @click="selectSkin"
          :data-value="skin"
          >{{ skin }}</span
        >
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import skinList from "@/fixtures/skins";

export default {
  name: "SkinTypeSelector",
  computed: {
    ...mapGetters({
      info: "User/info",
    }),
    skinList() {
      // Temporary
      return skinList;
    },
  },
  methods: {
    ...mapActions({
      setSkinType: "User/setSkinType",
    }),
    selectSkin(e) {
      this.setSkinType(e.target.dataset.value);
      this.$emit("change", this.info.skinType.length > 0);
    },
  },
};
</script>

<style scoped lang="scss">
.skin-list {
  display: grid;
  padding-left: 0;
  list-style: none;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  li {
    vertical-align: middle;
    span {
      display: block;
      margin: 10px 0;
      text-align: center;
      background-color: $primary-color-lightest;
      border-radius: 15px;
      font-size: 16px;
      &.selected {
        background-color: $primary-color;
      }
    }
    &.left {
      span {
        height: 75px;
        line-height: 75px;
      }
      span:nth-child(3) {
        height: 120px;
        line-height: 120px;
      }
    }
    &.right {
      span:nth-child(1) {
        display: flex;
        height: 250px;
        flex-direction: column;
        justify-content: flex-end;
        padding-bottom: 50px;
      }
      span:nth-child(2) {
        height: 115px;
        line-height: 115px;
      }
    }
  }
}
</style>

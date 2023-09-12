<template>
  <b-container class="art-board-content p-0">
    <div class="art-board-content__gallery">
      <div
        v-for="(image, index) of galleryItem"
        :class="'art-board-content__gallery__item pos_' + (index + 1)"
        v-bind:key="index"
        v-bind:style="{ 'background-image': 'url(' + image + ')' }"
      ></div>
      <div class="art-board-content__gallery__item logo-no-text">
        <img :src="images('./logo_no_text.png')" />
      </div>
    </div>
    <div class="art-board-content__welcome">
      <p>Hello, Welcome To</p>
      <img :src="images('./logo.png')" alt="" />
      <p class="pb-3">The future of makeup shopping at your finger tips</p>
      <p class="text-center">
        <b-button
          class="btn-general"
          @click="() => $router.push({ name: 'Prompt' })"
          >Find My Look</b-button
        >
      </p>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "ArtBoard",
  data() {
    return {
      images: null,
      galleryItem: [],
    };
  },
  beforeMount() {
    for (let i = 1; i < 4; i++) {
      this.images = require.context("@/assets/images", false, /\.png$/);
      this.galleryItem.push(this.images("./artboard_" + i + ".png"));
    }
  },
};
</script>

<style scoped lang="scss">
.art-board-content {
  height: 100vh;
  background-color: $primary-color;
  &__gallery {
    display: grid;
    width: 100%;
    position: relative;
    gap: 5px;
    grid-template-columns: 1fr 1fr 1fr;

    &__item {
      top: 0;
      left: 0;
      height: 300px;
      border: 2px solid #fff;
      border-radius: 25px;
      background-repeat: no-repeat;

      &.pos_1 {
        position: relative;
        top: -135px;
        left: 0;
        border-left: none;
        border-bottom-left-radius: 0;
        background-position: -270px 100px;
      }

      &.pos_2 {
        top: -85px;
        position: relative;
        background-position: -170px 10px;
      }
      &.pos_3 {
        position: relative;
        top: -190px;
        border-bottom-right-radius: 0;
        border-right: none;
        background-position: -590px -610px;
      }
      &.pos_4 {
        position: relative;
        top: -125px;
        background-position: -200px -30px;
        height: 250px;
        border-left: none;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }
      &.pos_5 {
        position: relative;
        top: -65px;
        background-position: -360px -30px;
        height: 250px;
      }
      &.pos_6 {
        position: relative;
        top: -90px;
        background-position: -270px 0px;
        height: 250px;
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &.logo-no-text {
        position: absolute;
        top: 120px;
        left: 240px;
        border: none;
        img {
          width: 100px;
        }
      }
    }
  }

  &__welcome {
    position: absolute;
    bottom: 0;
    padding: 0 25px 30px;
    width: 100%;
    color: #fff;
    font-size: 18px;
    img {
      width: 250px;
    }
  }
}
</style>

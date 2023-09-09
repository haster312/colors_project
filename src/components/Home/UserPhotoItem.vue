<template>
  <div class="item">
    <img :src="item.photo" alt="" />
    <div class="feedback">
      <p class="feedback__title">
        {{ item.title }}
      </p>
      <p class="feedback__content">
        {{ item.content }}
      </p>
      <p class="feedback__rating">
        <b-icon icon="star-fill" style="color: #fcc589"></b-icon>
        <b-icon icon="star-fill" style="color: #fcc589"></b-icon>
        <b-icon icon="star-fill" style="color: #fcc589"></b-icon>
        <b-icon icon="star-fill" style="color: #fcc589"></b-icon>
        <b-icon icon="star-half" style="color: #fcc589"></b-icon>
        <span>&nbsp;&nbsp;{{ item.rate_user }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPhotoItem",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
.item {
  img {
    height: 125px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  .feedback {
    padding: 10px 15px;
    background-color: #f7f7f9;
    color: #b4b4b5;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    p {
      margin-bottom: 5px;
      font-size: 12px;
    }
    &__title {
      margin-bottom: 5px;
      color: $primary-text-color;
      font-weight: bold;
      font-size: 14px;
    }
  }
}
</style>

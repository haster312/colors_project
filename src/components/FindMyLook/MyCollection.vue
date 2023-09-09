<template>
  <b-container fluid>
    <section>
      <h2 class="section-title">My Collection</h2>
      <div class="text-center">
        <p v-if="collections.length === 0">You don't have any collections</p>
        <b-button class="btn-general mb-3" @click="createNewCollection"
          >Create new collection</b-button
        >
      </div>
      <ul class="collection-list" v-if="collections.length > 0">
        <li
          class="item"
          v-for="(collection, index) in collections"
          v-bind:key="collection.title"
        >
          <h4>{{ collection.title }}</h4>
          <p
            class="text-decoration-underline"
            @click="openProducts('product' + collection.id)"
          >
            <strong>Total Products:</strong> {{ totalProduct(collection) }}
          </p>
          <b-collapse :id="'product' + collection.id" class="mt-2 mb-2">
            <b-card>
              <p
                v-for="category of Object.keys(collection.products)"
                v-bind:key="category"
              >
                {{ category }}: {{ collection.products[category].name }}
              </p>
            </b-card>
          </b-collapse>
          <p><strong>Reason:</strong> {{ collection.reason }}</p>
          <div class="text-end">
            <button
              class="btn btn-sm btn-try-collection me-3"
              @click="remove(index)"
            >
              Remove
            </button>
            <button
              class="btn btn-sm btn-try-collection"
              @click="tryCollection(index)"
            >
              Try this
            </button>
          </div>
        </li>
      </ul>
    </section>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MyCollection",
  computed: {
    ...mapGetters({
      collections: "Recommendation/collections",
      recommendations: "Recommendation/recommendations",
    }),
  },
  methods: {
    ...mapActions({
      setCollection: "Recommendation/setCollection",
      removeCollection: "Recommendation/removeCollection",
      loadRecommendations: "Recommendation/loadRecommendations",
      createCollectionByRecommendation:
        "Recommendation/createCollectionByRecommendation",
    }),
    openProducts(id) {
      this.$root.$emit("bv::toggle::collapse", id);
    },
    remove(index) {
      this.removeCollection(this.collections[index]);
    },
    tryCollection(index) {
      this.setCollection(this.collections[index]);
      this.$router.push({ name: "TryOn" });
    },
    totalProduct(collection) {
      return Object.keys(collection.products).length;
    },
    createNewCollection() {
      this.loadRecommendations();
      this.createCollectionByRecommendation({
        ...this.recommendations[0],
        title: "First Collection",
      });
      this.$router.push({ name: "TryOn" });
    },
  },
};
</script>

<style scoped lang="scss">
.collection-list {
  list-style: none;
  padding-left: 0;

  .btn-try-collection {
    padding: 5px 15px;
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    font-size: 12px;
  }

  .item {
    border-radius: 15px;
    border: 1px solid $sub-color;
    padding: 10px 20px;
    margin-bottom: 15px;

    h4 {
      font-size: 14px;
      line-height: 16px;
      font-weight: bold;
      color: #191819;
      margin-bottom: 15px;
    }
    p {
      font-size: 12px;
      margin-bottom: 10px;
      word-wrap: break-word;
    }
  }
}
</style>

import {
  SET_EFFECT,
  SET_PRODUCT_CATEGORY,
  SET_PRODUCTS,
  SET_RECOMMENDATIONS,
  SET_COLLECTION,
  SET_COLLECTIONS,
} from "./mutations";
import products from "@/fixtures/products";
import recommendations from "@/fixtures/recommendations";
import categories from "@/fixtures/categories";

const state = {
  products: [],
  recommendations: [],
  productCategory: {},
  effects: {}, //{ productId: config_set }
  collection: {
    id: null, // For storer collection
    title: null,
    reason: null,
    products: {},
  }, // { title: "Collection 1", products: { category: productDetail {} } }
  collections: [], // Includes all saved collection
};

const getters = {
  products: (state) => state.products,
  recommendations: (state) => state.recommendations,
  productCategory: (state) => state.productCategory,
  effects: (state) => state.effects,
  collection: (state) => state.collection,
  collections: (state) => state.collections,
};

const actions = {
  // Should load by API, faking by fixtures
  loadProducts({ commit }) {
    commit(SET_PRODUCTS, products);
  },
  loadRecommendations({ commit }, context = null) {
    let filterRecommendation = recommendations;
    if (context) {
      filterRecommendation = filterRecommendation.filter((recommendation) => {
        let keywords = recommendation.keywords.toLowerCase();
        if (keywords.includes(",")) {
          const matched = keywords.split(",").filter(keyword => {
            return context.includes(keyword);
          });
          return matched.length > 0;
        } else {
          return context.includes(keywords);
        }
      });
    }

    commit(SET_RECOMMENDATIONS, filterRecommendation);
  },
  loadProductCategory({ commit }) {
    const productCategory = {};
    categories.forEach((category) => {
      productCategory[category] = products.filter((product) => {
        if (category !== "Other") {
          return product.type === category;
        } else {
          return product.type === "" || product.type === undefined;
        }
      });
    });

    commit(SET_PRODUCT_CATEGORY, productCategory);
  },
  applyEffect({ commit, state }, { productId, config }) {
    const currentEffect = state.effects;

    currentEffect[productId] = config;
    commit(SET_EFFECT, currentEffect);
  },
  removeEffect({ commit, state }, productId) {
    let currentEffect = state.effects;

    if (productId in currentEffect) {
      delete currentEffect[productId];
    }
    commit(SET_EFFECT, currentEffect);
  },
  createCollectionByRecommendation({ commit, dispatch }, recommendation) {
    const collection = {
      title: recommendation.title,
      reason: recommendation.reason,
      products: {},
    };
    recommendation.products.map((value) => {
      const product = filterProductById(value.id);
      try {
        if (product) {
          collection.products[product.type ?? "Other"] = product;
          dispatch("applyEffect", {
            productId: product.id,
            config: product.configuration_reset.replace(/["]/g, "'").split(";"),
          });
        }
      } catch (e) {
        console.log(product);
      }
    });

    commit(SET_COLLECTION, collection);
  },
  updateCollection({ commit, dispatch, state }, { category, productId }) {
    let collection = { ...state.collection };
    const product = filterProductById(productId);
    if (collection.products[category] !== undefined) {
      dispatch("removeEffect", collection.products[category].id);
      collection.products[category] = product;
    }
    // Replace old selected product
    collection.products[category] = product;
    dispatch("applyEffect", {
      productId: collection.products[category].id,
      config: collection.products[category].configuration_reset
        .replace(/["]/g, "'")
        .split(";"),
    });
    commit(SET_COLLECTION, collection);
  },
  setCollection({ commit }, collection) {
    commit(SET_COLLECTION, collection);
  },
  removeCollection({ commit, state }, collection) {
    const collections = state.collections;

    commit(
      SET_COLLECTIONS,
      collections.filter((current) => current.id !== collection.id)
    );
  },
  setCollections({ commit, state }, collection) {
    let collections = state.collections;
    let isNew = false;
    for (let current of collections) {
      if (current.id === collection.id) {
        current = collection;
        break;
      }

      isNew = true;
    }

    if (isNew || collections.length === 0) {
      collections.push(collection);
    }

    commit(SET_COLLECTIONS, collections);
  },
};

function filterProductById(productId) {
  return products.find((product) => product.id === productId);
}

const mutations = {
  [SET_PRODUCTS](state, products) {
    state.products = products;
  },
  [SET_RECOMMENDATIONS](state, recommendations) {
    state.recommendations = recommendations;
  },
  [SET_PRODUCT_CATEGORY](state, productCategory) {
    state.productCategory = productCategory;
  },
  [SET_EFFECT](state, effects) {
    state.effects = effects;
  },
  [SET_COLLECTION](state, collection) {
    state.collection = collection;
  },
  [SET_COLLECTIONS](state, collections) {
    state.collections = collections;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

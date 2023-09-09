import { UPDATE_USER_INFO } from "./mutations";
const state = {
  info: {
    phone: null,
    skinType: [],
    brands: [],
  },
};

const getters = {
  info: (state) => state.info,
};

const actions = {
  clearInfo({ commit }) {
    commit(UPDATE_USER_INFO, {
      phone: null,
      brands: [],
      skinType: [],
    });
  },
  setPhone({ state, commit }, phone) {
    commit(UPDATE_USER_INFO, { ...state.info, phone });
  },
  setBrands({ state, commit }, brand) {
    let brands = [...state.info.brands];
    if (!brands.includes(brand)) {
      brands.push(brand);
    } else {
      brands.splice(brands.indexOf(brand), 1);
    }

    commit(UPDATE_USER_INFO, { ...state.info, brands });
  },
  setSkinType({ state, commit }, skin) {
    let skinType = [...state.info.skinType];
    if (!skinType.includes(skin)) {
      skinType.push(skin);
    } else {
      skinType.splice(skinType.indexOf(skin), 1);
    }

    commit(UPDATE_USER_INFO, { ...state.info, skinType });
  },
};

const mutations = {
  [UPDATE_USER_INFO](state, info) {
    state.info = info;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

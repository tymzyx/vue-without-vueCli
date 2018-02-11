import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    count: 1,
    detailData: {},
    chartsData: {}
};

const mutations = {
    add(state) {
        state.count += 1;
    },
    reduce(state) {
        state.count -= 1;
    },
    updateData(state, newData) {
        state.detailData = newData;
    },
    updateChartsData(state, newData) {
        state.chartsData = newData;
    }
};

const getters = {
    newCount: function (state) {
        return state.count += 10;
    }
};

const actions = {
    addAction(context) {
        context.commit('add');
    },
    reduceAction({commit}) {
        commit('reduce');
    }
};

const storeExp = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});

export default storeExp;
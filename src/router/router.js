import Vue from 'vue'
import Router from 'vue-router'

import detail from '../pages/detail'
import home from '../pages/home'

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: home,
        meta: {
            title: 'home'
        }
    },
    {
        path: '/detail',
        component: detail,
    }
];

export default new Router({
    routes
});
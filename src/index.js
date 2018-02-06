import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import firstVue from './components/firstVue.vue'
// import router from './router/router'
import App from './App'

import wsExp from './ws/ws'

Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(App)
});


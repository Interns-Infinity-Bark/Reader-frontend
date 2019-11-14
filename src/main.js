import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";
import Vant from 'vant';
import 'vant/lib/index.css';
import {del, get, patch, post, put} from "./utils";

Vue.config.productionTip = false;

Vue.use(Vant);

new Vue({
    router,
    store,
    "render": h => h(App)
}).$mount('#app');

window._get = get;
window._post = post;
window._patch = patch;
window._put = put;
window._delete = del;

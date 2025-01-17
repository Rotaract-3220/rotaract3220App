// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueGoodTablePlugin from 'vue-good-table';

// import the styles
import 'vue-good-table/dist/vue-good-table.css'
import EventBus from './EventBus'

Vue.prototype.$bus = EventBus;
Vue.use(VueGoodTablePlugin);
Vue.use(VueAxios, axios)
// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);
// Init App
new Vue({
	el: '#app',
	render: (h) => h(App),

	// Register App Component
	components: {
		app: App
	},
});
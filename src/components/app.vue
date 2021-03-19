<template>
	<f7-app :params="f7params" theme-dark>

<!--		 Left panel with cover effect when hidden -->
		<f7-panel left cover theme-dark :visible-breakpoint="960">
			<f7-view>
				<f7-page>
					<f7-navbar title="Menu"></f7-navbar>
<!--					<f7-block-title>Home</f7-block-title>-->
					<f7-list>

<!--						<f7-list-item v-if="isLoggedIn" view=".view-main" panel-close :title="user.card_name" no-chevron></f7-list-item>-->
						<f7-list-item link="/" view=".view-main" panel-close title="Home" no-chevron></f7-list-item>
						<f7-list-item link="/disco" view=".view-main" panel-close title="District Steering Committee" no-chevron></f7-list-item>
						<f7-list-item link="/membership" view=".view-main" panel-close title="Membership Directory" no-chevron></f7-list-item>
						<f7-list-item link="/clubs" view=".view-main" panel-close title="Clubs" no-chevron></f7-list-item>
						<f7-list-item link="/calendar" view=".view-main" panel-close title="Calendar" no-chevron></f7-list-item>
						<f7-list-item v-if="!isLoggedIn" :key="isLoggedIn" link="/login" view=".view-main" panel-close title="Login" no-chevron></f7-list-item>
						<f7-list-item v-if="isLoggedIn" link="/profile" view=".view-main" panel-close :title="user.card_name" no-chevron>
							<i class="f7-icons size-10">person_circle</i>
						</f7-list-item>
						<f7-list-item v-if="isLoggedIn" :key="isLoggedIn" @click="logout" link="/" view=".view-main" panel-close title="Logout" no-chevron></f7-list-item>
						<f7-list-item v-if="isLoggedIn" :key="isLoggedIn" link="/post" view=".view-main" panel-close title="Add Post" no-chevron></f7-list-item>

					</f7-list>
				</f7-page>
			</f7-view>
		</f7-panel>
		<!-- Your main view, should have "view-main" class -->
		<f7-view  main class="safe-areas" url="/"></f7-view>

	</f7-app>
</template>
<script>
	import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
	import cordovaApp from '../js/cordova-app.js';
	import routes from '../js/routes.js';
	import Vue from 'vue'
	import axios from 'axios'
	import VueAxios from 'vue-axios'
	import 'framework7-icons';

	export default {
		data() {
			var isLoggedIn = false;
			var usr = window.localStorage.getItem('user');
			if(usr){
				isLoggedIn = true;
			}
			return {
				// Framework7 Parameters
				isLoggedIn : isLoggedIn,
				user : JSON.parse(usr),
				f7params: {
					id: 'org.rotaract3220.one', // App bundle ID
					name: 'One Rotaract', // App name
					theme: 'auto', // Automatic theme detection,



					// App routes
					routes: routes,

					// Register service worker
					serviceWorker: Device.cordova ? {} : {
						path: '/service-worker.js',
					},
					// Input settings
					input: {
						scrollIntoViewOnFocus: Device.cordova && !Device.electron,
						scrollIntoViewCentered: Device.cordova && !Device.electron,
					},
					// Cordova Statusbar settings
					statusbar: {
						iosOverlaysWebView: true,
						androidOverlaysWebView: false,
					},
				},
			}
		},
		methods : {
			logout(){
				var ti = this;
				window.localStorage.removeItem	('user');
				this.isLoggedIn = false;
				console.log('logout');
				ti.$f7.dialog.alert('Logged out successfully!');

			}
		},
		created(){
			this.$bus.$on('loggedInChange', (e)=>{
				this.isLoggedIn = e;
				console.log('event');
			})
		},
		mounted() {
			this.$f7ready((f7) => {
				// Init cordova APIs (see cordova-app.js)
				if (Device.cordova) {
					cordovaApp.init(f7);
				}
				// Call F7 APIs here
			});
		}
	}
</script>
<template>
	<f7-page no-toolbar no-navbar panel-close="left" no-swipeback login-screen>
		<f7-navbar large :sliding="false">
			<f7-nav-left>
				<f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
			</f7-nav-left>
			<f7-nav-title sliding>One Rotaract</f7-nav-title>
			<f7-nav-title-large>One Rotaract</f7-nav-title-large>
		</f7-navbar>
		<f7-list form>
			<f7-list-input
				label="Username"
				type="text"
				placeholder="Your username"
				:value="username"
				@input="username = $event.target.value"
			></f7-list-input>
			<f7-list-input
				label="Password"
				type="password"
				placeholder="Your password"
				:value="password"
				@input="password = $event.target.value"
			></f7-list-input>
		</f7-list>
		<f7-list>
			<f7-list-button @click="signIn">Sign In</f7-list-button>
			<f7-block-footer>Rotaract 3220 Sri Lanka and Maldives.<br>&copy; Rotaract Digital Communications Unit</f7-block-footer>
		</f7-list>
	</f7-page>
</template>

<script>
	import LoginRep from './../js/LoginRepository'
	export default {
		data() {
			return {
				username: '',
				password: '',
			};
		},
		methods: {
			signIn() {
				var ti = this;
				ti.$f7.preloader.show();
				var loginCred = {
					email: this.username,
					pwd: this.password
				}
				var config = { headers: {
						'Content-Type': 'application/json'}
				}
				console.log(loginCred);
				LoginRep.post('', loginCred,config
				).then(function (t){
					console.log(t)
					var storage = window.localStorage
					if(t.data){
						storage.setItem("user", JSON.stringify(t.data[0]));
						ti.$bus.$emit('loggedInChange',true);
						// ti.$emit('loggedInChange',true);
						ti.$f7router.navigate('/')
						ti.$f7.preloader.hide();
					}else{
						ti.$f7.dialog.alert('Use proper login credentials');
						ti.$f7.preloader.hide();
					}
				}).catch(function(e){
					console.log(e);
					ti.$f7.dialog.alert('Use proper login credentials');
					ti.$f7.preloader.hide();

				})
			},
		},
		beforeMount() {

		}
	};
</script>
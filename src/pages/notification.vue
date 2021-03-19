<template>
    <f7-page no-toolbar no-navbar panel-close="left" no-swipeback login-screen>
        <f7-login-screen-title>One Rotaract</f7-login-screen-title>
        <div class="card">
            <div class="card-content" style="white-space: pre-wrap">{{notification.body}}
                <img :src="notification.imageURI" style="width: 100vw;" alt="">
            </div>
        </div>

    </f7-page>
</template>

<script>
    export default {
        data() {
            var storage = window.localStorage
            return {
                notification : JSON.parse(storage.getItem('notification')),
                password: 'scoobydoo@123',
            };
        },
        methods: {
            membership() {
                var ti = this
                ti.$f7.preloader.show();
                console.log('membership');
                MembershipRepository.get('/membership').then(function (t) {
                    console.log(t);
                    var storage = window.localStorage
                    storage.setItem("members", JSON.stringify(t.data))
                    ti.$f7.preloader.hide();
                    ti.$f7router.navigate('/membership')

                }).catch(function (e) {
                        ti.$f7.dialog.alert(e.message);
                        ti.$f7.preloader.hide();
                        // ti.$f7router.navigate('/membership')

                    }
                )
                // ti.$f7router.navigate('/dashboard')
            },
            clubs(){
                var ti = this
                ti.$f7.preloader.show();
                console.log('clubs');
                MembershipRepository.get('/clubs').then(function (t) {
                    console.log(t);
                    var storage = window.localStorage
                    storage.setItem("clubs", JSON.stringify(t.data))
                    ti.$f7.preloader.hide();
                    ti.$f7router.navigate('/clubs')

                }).catch(function (e) {
                        ti.$f7.dialog.alert(e.message);
                        ti.$f7.preloader.hide();
                        // ti.$f7router.navigate('/membership')

                    }
                )
            },
            disco(){
                var ti = this
                ti.$f7.preloader.show();
                console.log('membership');
                MembershipRepository.get('/disco').then(function (t) {
                    console.log(t);
                    var storage = window.localStorage
                    storage.setItem("disco", JSON.stringify(t.data))
                    ti.$f7.preloader.hide();
                    ti.$f7router.navigate('/disco')

                }).catch(function (e) {
                        ti.$f7.dialog.alert(e.message);
                        ti.$f7.preloader.hide();
                        // ti.$f7router.navigate('/membership')

                    }
                )
            },
            calendar(){
                var ti = this
                ti.$f7router.navigate('/calendar')
            },
            notification(){
                var ti = this
                ti.$f7router.navigate('/notification')
            },
        },
        beforeMount() {
        }
    };
</script>
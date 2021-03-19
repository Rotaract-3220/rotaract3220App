
<template>
    <f7-page no-toolbar panel-close="left" no-swipeback>
        <f7-navbar large :sliding="false">
            <f7-nav-left>
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title sliding>One Rotaract</f7-nav-title>
            <f7-nav-title-large>One Rotaract</f7-nav-title-large>
        </f7-navbar>
        <!--        <f7-login-screen-title>One Rotaract</f7-login-screen-title>-->
        <div v-for="post in posts">
            <div class="card demo-facebook-card">
                <div class="card-header">
<!--                    <div class="demo-facebook-avatar"><img src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg" width="34" height="34"/></div>-->
                    <div class="demo-facebook-name">{{ post.userName}}</div>
                    <div class="demo-facebook-date">{{ post.createdOn.toDate().toDateString()}}</div>
                </div>
                <div class="card-content">
                    <p style="white-space: pre-wrap">{{post.content}}</p>
                    <img :src = post.imgURL width="100%"/></div>
                <div v-if="isLoggedIn" class="card-footer">
                    <a href="#" v-if="!checkLike(post)" @click="like(post)" class="link"><i class="f7-icons">heart</i></a>
                    <a href="#" v-if="checkLike(post)" @click="unlike(post)" class="link"><i class="f7-icons">heart_fill</i></a>
                    <span class="badge color-red">{{ post.likes }}</span>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<style>
    .demo-facebook-card .card-header {
        display: block;
        padding: 10px;
    }
    .demo-facebook-card .demo-facebook-avatar {
        float: left;
    }
    .demo-facebook-card .demo-facebook-name {
        /*margin-left: 44px;*/
        font-size: 14px;
        font-weight: 500;
    }
    .demo-facebook-card .demo-facebook-date {
        /*margin-left: 44px;*/
        font-size: 13px;
        color: #8e8e93;
    }
    .demo-facebook-card .card-footer {
        background: #fafafa;
    }
    .demo-facebook-card .card-footer a {
        color: #81848b;
        font-weight: 500;
    }
    .demo-facebook-card .card-content img {
        display: block;
    }
    .demo-facebook-card .card-content-padding {
        padding: 15px 10px;
    }
    .demo-facebook-card .card-content-padding .likes {
        color: #8e8e93;
    }
</style>
<script>
    import firebase from  './../js/firebase';
    export default {
        data() {
            var posts = [];
            var ti = this;
            ti.$f7.preloader.show();
            firebase.firestore().collection('posts').orderBy('createdOn','desc').limit(20).get().then(data => {
                data.forEach(doc => {
                    var d = doc.data();
                    d.id = doc.id;
                    console.log(doc.id, '=>', d);

                    posts.push(d);
                });
                ti.$f7.preloader.hide();
            });
            var isLoggedIn = false;
            var usr = window.localStorage.getItem('user');
            if(usr){
                isLoggedIn = true;
            }
            return {
                posts: posts,
                isLoggedIn : isLoggedIn,
                user : JSON.parse(usr),
            };
        },
        created(){
            this.$bus.$on('loggedInChange', (e)=>{
                this.isLoggedIn = e;
                console.log('event');
            })
        },
        methods: {
            search(){
                const search = 'Kash';
                const res = this.posts.filter((post)=>{return post.content.includes(search)})
                console.log(res);
                this.posts = res;
            },
            async like(e) {
                console.log(e);
                var ref = firebase.firestore().collection('posts').doc(e.id);
                try {
                    await firebase.firestore().runTransaction(async (t) => {
                        const doc = await t.get(ref);
                        const newLikeCount = doc.data().likes + 1;
                        e.likes = newLikeCount
                        var likeArr = doc.data().likeArr;
                        if(likeArr == null){
                            likeArr = [];
                            likeArr.push(this.user.membership_id);
                        }else{
                            likeArr.push(this.user.membership_id);
                        }
                        e.likeArr = likeArr;
                        t.update(ref,{likes : newLikeCount, likeArr : likeArr});
                    })
                }catch (e) {
                    console.log(e);
                }

            },
            async unlike(e) {
                console.log(e);
                var ref = firebase.firestore().collection('posts').doc(e.id);
                try {
                    await firebase.firestore().runTransaction(async (t) => {
                        const doc = await t.get(ref);
                        var newLikeCount;
                        if(doc.data().likes >0){
                            newLikeCount = doc.data().likes - 1;
                        }else{
                            newLikeCount = 0;
                        }
                        e.likes = newLikeCount;
                        var likeArr = doc.data().likeArr;
                        if(likeArr == null){
                            likeArr = [];
                        }else{
                            likeArr = this.removeItemOnce(likeArr,this.user.membership_id);
                        }
                        e.likeArr = likeArr;
                        t.update(ref,{likes : newLikeCount, likeArr : likeArr});
                    })
                }catch (e) {
                    console.log(e);
                }

            },
            removeItemOnce(arr, value) {
                var index = arr.indexOf(value);
                if (index > -1) {
                    arr.splice(index, 1);
                }
                return arr;
            },
            checkLike(e){
                try{
                    if(e.likeArr.includes(this.user.membership_id)){
                        return true;
                    }else{
                        return false;
                    }
                }catch (e) {
                    console.log(e);
                    return false;
                }

            },

        },
        beforeMount() {

        }
    };
</script>
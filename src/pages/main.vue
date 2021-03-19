<template>
    <f7-page no-toolbar no-navbar panel-close="left" no-swipeback login-screen>
        <f7-login-screen-title>One Rotaract</f7-login-screen-title>

        <button class="button button-round-aurora" @click="disco">District Steering Committee</button>
        <button class="button button-round-aurora" @click="membership">Membership Directory</button>
        <button class="button button-round-aurora" @click="clubs">Club Directory</button>
        <button class="button button-round-aurora" @click="calendar">Rotaract Calendar</button>
        <div class="list">
            <ul>
                <li class="item-content item-input">
                    <div class="item-media"><i class="f7-icons">house</i></div>
                    <div class="item-inner">
                        <div class="item-input-wrap">
                            <input type="file" @change="setImage">
                        </div>
                    </div>
                </li>
                <li class="item-content item-input">
                    <div class="item-media"></div>
                    <div class="item-inner">
                        <div class="item-input-wrap">
                            <textarea name="dsd" id="sdfs" cols="30" @keyup="setText"  rows="10"></textarea>
<!--                            <input type="text" @keyup="setText">-->
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <button class="button button-round-aurora" @click="upload">Upload</button>



    </f7-page>
</template>

<script>
    import MembershipRepository from './../js/MembershipRepository'
    import firebase from  './../js/firebase';


    export default {
        name: 'Main',
        image: null,
        caption: null,
        data() {
            return {
                username: 'voxsar@gmail.com',
                password: 'scoobydoo@123',
            };
        },
        methods: {
            setText(e){
              console.log(e.target.value);
              this.caption = e.target.value;

            },
            setImage(e){
                console.log(e.target.files[0]);
                this.image = e.target.files[0];
            },
            upload(){
                console.log(this.image);
                const storageRef = firebase.storage().ref(this.image.name).put(this.image);
                storageRef.on('state_changed',
                snapshot => {
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    console.log(this.uploadValue);
                },
                    error => {console.log(error.message)},
                    () => {
                    storageRef.snapshot.ref.getDownloadURL().then(url =>{
                        console.log(url);
                        firebase.firestore().collection('posts').add(
                            {
                                createdOn: new Date(),
                                content:this.caption,
                                userName: 'test',
                                comments: 0,
                                likes: 0,
                                imgURL : url
                            }
                        ).then((success) => {
                            console.log(success);
                            }
                        )
                    })
                    }
            )
            },
            firebase() {
                console.log('Firebase');
                var document = {
                    "a_string": "foo",
                    "a_list": [1, 2, 3],
                    "an_object": {
                        "an_integer": 1,
                    }
                };
                var collection = "my_collection";
                FirebasePlugin.addDocumentToFirestoreCollection(document, collection, function(documentId){
                    console.log("Successfully added document with id="+documentId);
                }, function(error){
                    console.error("Error adding document: "+error);
                });

                var filters = [
                ];

                FirebasePlugin.fetchFirestoreCollection(collection, filters, function(documents){
                    console.log("Successfully fetched collection: "+JSON.stringify(documents));
                }, function(error){
                    console.error("Error fetching collection: "+error);
                });
            },
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
            window.name = 'main';
        }
    };
</script>
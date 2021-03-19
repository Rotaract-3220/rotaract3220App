
<template>
    <f7-page no-toolbar no-navbar panel-close="left" no-swipeback login-screen>
        <f7-navbar large :sliding="false">
            <f7-nav-left>
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title sliding>One Rotaract</f7-nav-title>
            <f7-nav-title-large>One Rotaract</f7-nav-title-large>
        </f7-navbar>

        <div class="list">
            <ul>
                <li class="item-content item-input">
                    <div class="item-media"><i class="f7-icons">house</i></div>
                    <div class="item-inner">
                        <div class="item-input-wrap">
                            <input type="file" @change="setImage" name="file" id="file" class="inputfile">
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
                var ti = this;
                console.log(this.image);
                const storageRef = firebase.storage().ref(this.image.name).put(this.image);
                ti.$f7.preloader.show();
                storageRef.on('state_changed',
                    snapshot => {
                        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                        console.log(this.uploadValue);
                    },
                    error => {console.log(error.message)
                        ti.$f7.preloader.hide();
                        ti.$f7.dialog.alert('Error uploading post');

                    },
                    () => {
                        storageRef.snapshot.ref.getDownloadURL().then(url =>{
                            console.log(url);
                            firebase.firestore().collection('posts').add(
                                {
                                    createdOn: new Date(),
                                    content:this.caption,
                                    userName: JSON.parse(window.localStorage.getItem('user')).card_name,
                                    comments: 0,
                                    likes: 0,
                                    imgURL : url
                                }
                            ).then((success) => {
                                    console.log(success);
                                ti.$f7.preloader.hide();
                                ti.$f7.dialog.alert('Post uploaded successfully');
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
<template>
    <f7-page no-toolbar no-navbar panel-close="left" no-swipeback login-screen>
        <f7-navbar large :sliding="false">
            <f7-nav-left>
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title sliding>One Rotaract</f7-nav-title>
            <f7-nav-title-large>One Rotaract</f7-nav-title-large>
        </f7-navbar>
        <div v-if="isSet" :key="this.isSet" style="margin-top: 15vh" >
            <div class="card">
                <div class="card-header">Rotaract Membership Directory</div>
                <div class="card-content">
                    <!-- Card content -->
                    <div class="data-table">
                        <div>
                            <vue-good-table
                                    :columns="columns"
                                    :rows="members"
                                    :pagination-options="{
                            enabled: true,
                            mode: 'records',
                            perPage: 10,
                            position: 'top',
                            perPageDropdown: [3, 7, 9],
                            dropdownAllowAll: false,
                            setCurrentPage: 2,
                            nextLabel: 'next',
                            prevLabel: 'prev',
                            rowsPerPageLabel: 'Rows per page',
                            ofLabel: 'of',
                            pageLabel: 'page', // for 'pages' mode
                            allLabel: 'All',
                          }"
                                    :search-options="{
                            enabled: true,
                            trigger: 'enter',
                            skipDiacritics: true,
                            placeholder: 'Search Members',
                            }"
                                    theme="nocturnal"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="block block-strong align-items-stretch text-align-center">
            <div class="col-25">
                <div class="preloader" style="width: 44px; height: 44px"></div>
            </div>
        </div>

    </f7-page>
</template>

<script>
    import MembershipRepository from './../js/MembershipRepository'
    import LoginRep from './../js/LoginRepository'
    export default {
        data() {
            var ti = this
            var memdata = null;
            var isSet = false;

            return {
                columns: [
                    {
                        label: 'Name',
                        field: 'card_name',
                    },
                    {
                        label: 'Club',
                        field: 'c_name',
                    },
                ],
                members : memdata,
                isSet : isSet
            };
        },
        mounted(){

        },
        methods: {
            signIn() {
                var ti = this
                console.log(ti);
                LoginRep.post('',
                    {
                        grant_type: "password",
                        client_id: 11,
                        client_secret: "Gpkv1RmOqLtRUoMuHRdqvr8ep5cz2ygTb37Zr05K",
                        username: this.username,
                        password: this.password,
                        scope: "*"
                    }).then(function (t){
                    console.log(t)
                    var storage = window.localStorage
                    storage.setItem("access_token", t.data.access_token)
                    ti.$f7router.navigate('/dashboard')
                }).catch(function(e){
                    ti.$f7.dialog.alert('Use proper login credentialsl');
                })
            },
        },
        beforeMount() {
            var ti = this;
            ti.$f7.preloader.show();
            MembershipRepository.get('/membership').then(function (t) {
                console.log(t);
                var storage = window.localStorage
                ti.members = t.data;
                storage.setItem("members", JSON.stringify(t.data))
                ti.$f7.preloader.hide();
                ti.isSet = true;
            }).catch(function (e) {
                    ti.$f7.dialog.alert(e.message);
                    ti.$f7.preloader.hide();
                    // ti.$f7router.navigate('/membership')

                }
            );
        }
    };
</script>
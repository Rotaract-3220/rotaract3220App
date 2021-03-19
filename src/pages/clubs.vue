<template>
    <f7-page no-toolbar no-navbar panel-close="left" no-swipeback login-screen>
        <f7-navbar large :sliding="false">
            <f7-nav-left>
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title sliding>One Rotaract</f7-nav-title>
            <f7-nav-title-large>One Rotaract</f7-nav-title-large>
        </f7-navbar>
        <div v-if="isSet">
            <div class="card">
                <div class="card-header">Club Details</div>
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
                            skipDiacritics: true,
                            placeholder: 'Search Clubs',
                            }"
                                    theme="nocturnal"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </f7-page>
</template>

<script>
    import LoginRep from './../js/LoginRepository'
    import MembershipRepository from './../js/MembershipRepository'
    export default {
        data() {
            var storage = window.localStorage
            return {
                columns: [
                    {
                        label: 'Club',
                        field: 'c_name',
                    },
                    {
                        label: 'President',
                        field: 'president.card_name',
                    },
                    {
                        label: 'President Contact No',
                        field: 'president.mobile',
                    },
                    {
                        label: 'President E-mail Address',
                        field: 'president.email',
                    },
                ],
                members : null,
                isSet: false,
            };
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
            var ti = this
            ti.$f7.preloader.show();
            console.log('clubs');
            MembershipRepository.get('/clubs').then(function (t) {
                console.log(t);
                var storage = window.localStorage
                ti.members = t.data
                ti.$f7.preloader.hide();
                ti.isSet = true;

            }).catch(function (e) {
                    ti.$f7.dialog.alert(e.message);
                    ti.$f7.preloader.hide();
                    // ti.$f7router.navigate('/membership')

                }
            )
        }
    };
</script>
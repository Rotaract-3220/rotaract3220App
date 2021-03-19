<template>
    <f7-page no-toolbar no-navbar panel-close="left" no-swipeback login-screen>
        <f7-navbar large :sliding="false">
            <f7-nav-left>
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title sliding>One Rotaract</f7-nav-title>
            <f7-nav-title-large>One Rotaract</f7-nav-title-large>
        </f7-navbar>
        <div v-if="isSet" style="margin-top: 15vh">
            <div class="card">
                <div class="card-header">District Steering Committee</div>
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
                            placeholder: 'Search District Steering Committee',
                            }"
                                    theme="nocturnal"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
<!--        <div v-else class="block block-strong align-items-stretch text-align-center">-->
<!--            <div class="col-25">-->
<!--                <div class="preloader" style="width: 44px; height: 44px"></div>-->
<!--            </div>-->
<!--        </div>-->


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
                        label: 'Name',
                        field: 'card_name',
                    },
                    {
                        label: 'Designation',
                        field: 'designation',
                    },
                    {
                        label: 'Mobile No',
                        field: 'mobile',
                    },
                    {
                        label: 'E-mail',
                        field: 'email',
                    },
                ],
                members : null,
                isSet : false
            };
        },
        methods: {
        },
        beforeMount() {
            var ti = this
            ti.$f7.preloader.show();
            console.log('membership');
            MembershipRepository.get('/disco').then(function (t) {
                console.log(t);
                var storage = window.localStorage
                ti.members = t.data;
                storage.setItem("disco", JSON.stringify(t.data))
                ti.$f7.preloader.hide();
                ti.$f7router.navigate('/disco')
                ti.isSet = true

            }).catch(function (e) {
                    ti.$f7.dialog.alert(e.message);
                    ti.$f7.preloader.hide();
                    // ti.$f7router.navigate('/membership')

                }
            )
        }
    };
</script>
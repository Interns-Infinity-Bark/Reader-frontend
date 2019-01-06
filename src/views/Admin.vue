<template>
    <div class="container">
        <van-search placeholder="搜索🐶" v-model="searchInput" @search="onSearch" @clear="onClear"></van-search>
        <van-list finished>
            <van-cell v-for="user in users" :key="user.id"
                      :title="user.username">
                <template slot="right-icon">
                    <span style="color: #aaa;">可用</span>
                    <van-switch v-model="user.isActive" size="20px" style="margin: 0 12px 0 4px;"
                                @change="handleUserActiveChange($event, user.id)" />
                    <van-button type="danger" size="mini" @click="handleDeleteUser(user.id)">删除</van-button>
                </template>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import {del, get, put} from "../utils";
    import { Toast, Dialog } from 'vant';

    export default {
        name: "Admin",
        data() {
            return {
                users: [],
                searchInput: '',
            };
        },
        computed: {
            ...mapGetters(['isAdminLoggedIn']),
        },
        async created() {
            this.fetchData();
        },
        methods: {
            async fetchData() {
                if (!this.isAdminLoggedIn) {
                    return;
                }
                const ret = await get('/reader/admin/users');
                if (ret.status === 'ok') {
                    this.users = ret.data.users;
                }
            },
            async onSearch() {
                if (!this.searchInput) {
                    this.onClear();
                    return;
                }
                const ret = await get('/reader/admin/users?username=' + encodeURIComponent(this.searchInput));
                if (ret.status === 'ok') {
                    this.users = ret.data.users;
                }
            },
            async onClear() {
                this.fetchData();
            },
            async handleUserActiveChange(isActive, userId) {
                const ret = await put(`/reader/admin/${isActive ? 'enableUser' : 'disableUser'}`, { userId });
                if (ret.status !== 'ok') {
                    Toast.fail(ret.message || '操作失败');
                }
            },
            handleDeleteUser(userId) {
                Dialog.confirm({
                    title: '是否确认删除此用户？'
                }).then(async () => {
                    const ret = await del('/reader/admin/deleteUser', { userId });
                    if (ret.status !== 'ok') {
                        Toast.fail(ret.message || '操作失败');
                    } else {
                        this.fetchData();
                    }
                });

            },
        },
    }
</script>

<style scoped>

</style>

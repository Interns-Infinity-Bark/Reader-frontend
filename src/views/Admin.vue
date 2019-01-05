<template>
    <div class="container">
        <van-search placeholder="搜索🐶" v-model="searchInput" @search="onSearch" @clear="onClear"></van-search>
        <van-list finished>
            <van-cell v-for="user in users" :key="user.userId"
                      :title="user.username">
                <template slot="right-icon">
                    <span style="color: #aaa;">禁用</span>
                    <van-switch v-model="user.banned" size="20px" style="margin: 0 12px 0 4px;" />
                    <van-button type="danger" size="mini">删除</van-button>
                </template>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
    export default {
        name: "Admin",
        data() {
            return {
                users: [
                    {
                        userId: 1,
                        username: '皮皮虾',
                        banned: false,
                    },
                    {
                        userId: 2,
                        username: '长者',
                        banned: false,
                    }
                ],
                searchInput: '',
            };
        },
        methods: {
            async onSearch() {
                if (!this.searchInput) {
                    this.onClear();
                    return;
                }

            },
            async onClear() {

            },
        },
    }
</script>

<style scoped>

</style>

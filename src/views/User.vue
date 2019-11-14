<template>
    <div class="container" style="padding-left: 15px; padding-right: 15px;">
        <div class="logo">
            <img :src="logo" alt="Logo"/>
        </div>
        <div v-if="isloggedin" style="margin-top: 100px;">
            <p style="text-align: center">你好，{{username}}</p>
            <van-button type="default" block @click="logout" style="margin-top: 45px;">登出</van-button>
        </div>
        <div v-else style="margin-top: 100px;">
            <p style="text-align: center">加入追风云阅读，享受更多精彩</p>
            <van-button type="primary" block @click="toLogin" style="margin-top: 45px;">登录</van-button>
            <van-button type="default" block @click="toRegister" style="margin-top: 15px;">注册</van-button>
        </div>
    </div>
</template>

<script>
    import logo from '../assets/logo.png';
    import {get} from '../utils';
    import {getSession} from "../spider";

    export default {
        name: "User",
        data() {
            return {
                username: '',
                isloggedin: false,
                logo,
            };
        },
        async mounted() {
            const res = await getSession();
            if (res.status === 'ok') {
                this.username = res.data.user.username;
                this.isloggedin = true;
            }
        },
        methods: {
            async logout() {
                const res = await get(`/reader/logout`);
                alert(res.message);
                if (res.status === 'ok') {
                    return this.$router.push('/');
                }
            },
            toLogin() {
                this.$router.push('/login');
            },
            toRegister() {
                this.$router.push('/register');
            },
        }
    }
</script>

<style lang="less">
    .logo {
        text-align: center;
        margin-top: 100px;

        img {
            width: 60px;
            height: 60px;
        }
    }
</style>

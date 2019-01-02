<template>
    <div class="container" style="padding-left: 15px; padding-right: 15px;">
        <div class="logo">
            <img :src="logo" alt="Logo"/>
        </div>
        <div v-if="isLoggedIn()" style="margin-top: 100px;">
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
    import {isLoggedIn, setSession} from '../utils';

    export default {
        name: "User",
        data() {
            return {
                username: window.__session.username,
                logo,
            };
        },
        methods: {
            isLoggedIn,
            logout() {
                setSession({
                    username: '',
                    expires: 0,
                });
                this.$forceUpdate();
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

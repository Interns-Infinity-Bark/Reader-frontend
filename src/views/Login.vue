<template>
    <div class="container">
        <div class="logo">
            <img :src="logo" alt="Logo"/>
        </div>
        <van-cell-group>
            <van-field v-model="username" label="用户名" placeholder="请输入用户名"></van-field>
            <van-field v-model="password" label="密码" placeholder="请输入密码" type="password"></van-field>
        </van-cell-group>
        <van-button type="primary" size="large" block style="margin-top: 30px;" @click="login">登录</van-button>
        <div class="content" style="margin-top: 12px;">
            还没有账号？
            <router-link to="/register">注册</router-link>
        </div>
    </div>
</template>

<script>
    import logo from '../assets/logo.png';
    import {setSession} from '../utils';

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
                logo,
            };
        },
        methods: {
            login() {
                if (!this.username || !this.password) {
                    return this.$dialog.alert({
                        message: '请输入用户名和密码',
                    });
                }
                const users = JSON.parse(localStorage.getItem('users')) || {};
                if (users[this.username] && users[this.username].password === this.password) {
                    setSession({
                        username: this.username,
                        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
                        fav: {},
                    });
                    return this.$router.push('/');
                }
                this.$dialog.alert({
                    message: '用户名或密码错误',
                });
            },
        }
    }
</script>

<style lang="less">
    .logo {
        text-align: center;
        margin-top: 90px;
        margin-bottom: 45px;

        img {
            width: 60px;
            height: 60px;
        }
    }
</style>

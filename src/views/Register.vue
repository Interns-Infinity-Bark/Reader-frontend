<template>
    <div class="container">
        <div class="logo">
            <img :src="logo" alt="logo"/>
        </div>
        <van-cell-group>
            <van-field v-model="username" label="用户名" placeholder="请输入用户名"></van-field>
            <van-field v-model="password" label="密码" placeholder="请输入密码" type="password"></van-field>
            <van-field v-model="confirmPassword" label="确认密码" placeholder="请再次输入密码" type="password"></van-field>
        </van-cell-group>
        <van-button type="primary" size="large" block style="margin-top: 30px;" @click="register">注册</van-button>
        <div class="content" style="margin-top: 12px;">
            已经有账号了?
            <router-link to="/login">登录</router-link>
        </div>
    </div>
</template>

<script>
    import logo from '../assets/logo.png';
    import {post} from '../utils';

    export default {
        name: "Register",
        data() {
            return {
                username: '',
                password: '',
                confirmPassword: '',
                logo,
            };
        },
        methods: {
            async register() {
                const data = await post(`/reader/register`, {
                    username: this.username,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                });
                if (data.status === 'ok') {
                    this.$store.dispatch('getUserSession');
                    alert('注册成功');
                    this.$router.push('/');
                } else {
                    alert(data.message);
                }
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

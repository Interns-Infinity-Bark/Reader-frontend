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
    import {setSession} from '../utils';

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
            register() {
                if (!this.username || !this.password || !this.confirmPassword) {
                    return this.$dialog.alert({
                        message: '请输入用户名和密码',
                    });
                }
                if (this.password !== this.confirmPassword) {
                    return this.$dialog.alert({
                        message: '两次输入的密码不一致',
                    });
                }
                const users = JSON.parse(localStorage.getItem('users')) || {};
                if (users[this.username]) {
                    return this.$dialog.alert({
                        message: '该用户已被注册',
                    });
                }
                users[this.username] = {
                    username: this.username,
                    password: this.password,
                };
                localStorage.setItem('users', JSON.stringify(users));
                setSession({
                    username: this.username,
                    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
                });
                this.$dialog.alert({
                    message: '注册成功',
                }).then(() => {
                    this.$router.push('/');
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

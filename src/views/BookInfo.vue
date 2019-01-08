<template>
    <div class="container">
        <div class="content">
            <van-row>
                <van-col span="12" style="padding: 8px 16px;">
                    <img v-bind:src="cover" alt="cover" style="width: 100%;">
                </van-col>
                <van-col span="12">
                    <h2>{{bookInfo.title}}</h2>
                    <p>作者: {{bookInfo.author}}</p>
                    <p>分类: {{bookInfo.category}}</p>
                    <p>字数: {{bookInfo.wordCount}}</p>
                    <p>评分: {{score}}</p>
                </van-col>
                <van-col span="24">
                    <h3 class="section-header">简介</h3>
                    <div v-html="longIntro"></div>
                    <p style="color: #acacac; font-size: 12px;">最近更新于 {{updated}}</p>
                </van-col>
            </van-row>
        </div>
        <div class="content">
            <h3 class="section-header">章节列表</h3>
        </div>
        <van-list finished>
            <van-cell v-for="(item, index) in chapterList" :key="item.id"
                      :title="item.title"
                      is-link :to="formatLink(index, item.id)"
                      clickable
                      size="large">
            </van-cell>
        </van-list>
    </div>
</template>

<script>
    import logo from '../assets/logo.png';
    import {getBook, getChaptersByBookId} from "../spider";
    import xss from 'xss';
    import moment from 'moment';
    import _ from 'lodash';

    export default {
        name: "BookInfo",
        data() {
            return {
                bookID: this.$route.params.id,
                bookInfo: {},
                cover: logo,
                chapterList: [],
            }
        },
        computed: {
            score() {
                return +_.get(this, 'bookInfo.score', '').toString().slice(0, 3);
            },
            longIntro() {
                return '\u3000\u3000' + xss(this.bookInfo.introduction).replace(/[\t|\u3000]/g, '')
                    .replace(/[\u21b5\n]+/g, '<br/>\u3000\u3000');
            },
            updated() {
                return moment(this.bookInfo.updatedAt).fromNow();
            }
        },
        async mounted() {
            const book = await getBook(this.bookID);
            this.bookInfo = book.data.book;
            if (this.bookInfo.cover) {
                this.cover = '/statics' + this.bookInfo.cover;
            }
            this.chapterList = (await getChaptersByBookId(this.bookID)).data.chapters;
        },
        methods: {
            formatLink(index, link) {
                return `/detail/${encodeURIComponent(this.bookID)}/${encodeURIComponent(index)}/${encodeURIComponent(link)}`;
            },
        },
    }
</script>

<style scoped>
    .section-header {
        margin-bottom: 4px;
    }
</style>

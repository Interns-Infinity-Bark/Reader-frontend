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
                    <p>分类: {{bookInfo.majorCate}}</p>
                    <p>字数: {{bookInfo.wordCount}}</p>
                    <p>评分: {{score}}</p>
                </van-col>
                <van-col span="24">
                    <b><h3 class="section-header">简介</h3></b>
                    <p>{{bookInfo.longIntro}}</p>
                    <p style="color: #acacac; font-size: 12px;">最近更新于 {{updated}}</p>
                </van-col>
            </van-row>
        </div>

        <div class="content">
            <b><h3 class="section-header">章节列表</h3></b>
        </div>

        <van-list finished>
            <van-cell v-for="(item, index) in chapterList" :key="item.link"
                      :title="item.title"
                      is-link :to="formatLink(index, item.link)"
                      clickable
                      size="large">
            </van-cell>
        </van-list>

    </div>
</template>

<script>
    import logo from '../assets/logo.png';
    import {getBook, getChaptersBySourceId, getMixSource} from "../spider";
    import moment from 'moment';
    import _ from 'lodash';

    export default {
        name: "BookInfo",
        data() {
            return {
                bookID: this.$route.params.id,
                bookInfo: {},
                sourceId: null,
                cover: logo,
                chapterList: [],
            }
        },
        computed: {
            updated() {
                return moment(this.bookInfo.updated).fromNow();
            },
            score() {
                return +_.get(this, 'bookInfo.rating.score', '').toString().split('').splice(0, 3).join('');
            }
        },
        async mounted() {
            this.bookInfo = await getBook(this.bookID);
            if (this.bookInfo.cover) {
                this.cover = '/statics' + this.bookInfo.cover;
            }
            this.sourceId = (await getMixSource(this.bookID))[0]._id;
            this.chapterList = (await getChaptersBySourceId(this.sourceId)).chapters;
        },
        methods: {
            formatLink(index, link) {
                return `/Detail/${encodeURIComponent(this.bookID)}/${encodeURIComponent(this.sourceId)}/${encodeURIComponent(index)}/${encodeURIComponent(link)}`;
            },
        },
    }
</script>

<style scoped>
    .section-header {
        margin-bottom: 4px;
    }
</style>

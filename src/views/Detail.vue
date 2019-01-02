<template>
    <div class="container">
        <van-cell :border="false">
            <h2 style="text-align: center">{{chapter.title}}</h2>
            <div v-if="chapter.isVip" style="text-align: center">
                本章是收费章节, 暂时无法阅读
            </div>
            <div v-else v-html="content"></div>
            <p>{{comments.length}} 条评论</p>
            <van-list finished>
                <van-cell v-for="(item, index) in comments" :key="index" :value="moment(item.createdAt).fromNow()">
                    <template slot="title">
                        <p style="margin-top: 0; margin-bottom: 0;">{{item.author}}</p>
                        <pre style="margin-top: 8px; margin-bottom: 0;">{{item.content}}</pre>
                    </template>
                </van-cell>
            </van-list>
        </van-cell>
        <van-field v-model="commentContent"
                   type="textarea"
                   :placeholder="isLoggedIn() ? '评论内容' : '未登录, 无法发表评论'"
                   :disabled="!isLoggedIn()"></van-field>
        <van-cell>
            <van-button v-if="isLoggedIn()" type="primary" block @click="addComment">
                发表评论
            </van-button>
            <van-button v-else type="default" block @click="toLogin">
                登录以发表评论
            </van-button>
        </van-cell>
        <div class="content">
            <van-row>
                <van-col span="10">
                    <van-button v-if="index > 0" size="small"
                                style="margin-top: 16px; margin-bottom: 16px; width: 100%;"
                                @click="toLink(index - 1)">
                        上一章
                    </van-button>
                    <van-button v-else size="small" disabled="disabled"
                                style="margin-top: 16px; margin-bottom: 16px; width: 100%;">
                        上一章
                    </van-button>
                </van-col>
                <van-col span="10" offset="4">
                    <van-button v-if="index + 1 < chapterList.length " size="small"
                                style="margin-top: 16px; margin-bottom: 16px; width: 100%;"
                                @click="toLink(index + 1)">
                        下一章
                    </van-button>
                    <van-button v-else size="small" disabled="disabled"
                                style="margin-top: 16px; margin-bottom: 16px; width: 100%;">
                        下一章
                    </van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import {isLoggedIn} from '../utils';
    import xss from 'xss';
    import moment from 'moment';
    import {getChapter, getChaptersBySourceId} from "../spider";

    export default {
        name: 'Detail',
        data() {
            return {
                bookId: this.$route.params.bookId,
                sourceId: this.$route.params.sourceId,
                index: +this.$route.params.index,
                link: this.$route.params.link,
                chapterList: [],
                chapter: {},
                comments: [],
                commentContent: '',
            }
        },
        created() {
            moment.locale('zh-cn');
        },
        computed: {
            content() {
                return '\u3000\u3000' + xss(this.chapter.cpContent).replace(/[\t|\u3000]/g, '')
                    .replace(/[\u21b5\n]+/g, '<br/>\u3000\u3000');
            }
        },
        watch: {
            '$route.params': async function (newParams) {
                this.bookId = newParams.bookId;
                this.sourceId = newParams.sourceId;
                this.index = +newParams.index;
                this.link = newParams.link;
                this.chapterList = (await getChaptersBySourceId(this.sourceId)).chapters;
                this.chapter = (await getChapter(this.link)).chapter;
                this.getComments();
                this.commentContent = '';
            }
        },
        async mounted() {
            this.chapterList = (await getChaptersBySourceId(this.sourceId)).chapters;
            this.chapter = (await getChapter(this.link)).chapter;
            this.getComments();
        },
        methods: {
            xss,
            toLink(index) {
                this.$router.replace(`/detail/${encodeURIComponent(this.bookId)}/${encodeURIComponent(this.sourceId)}/${encodeURIComponent(index)}/${encodeURIComponent((this.chapterList[index] || {}).link)}`);
                window.scrollTo(0, 0);
            },
            isLoggedIn,
            moment,
            getComments() {
                const allComments = JSON.parse(localStorage.getItem('comments')) || {};
                this.comments = allComments[this.chapter.id] || [];
            },
            addComment() {
                const comment = {
                    author: window.__session.username,
                    content: this.commentContent,
                    createdAt: Date.now(),
                };
                this.comments.push(comment);
                const allComments = JSON.parse(localStorage.getItem('comments')) || {};
                allComments[this.chapter.id] = this.comments;
                localStorage.setItem('comments', JSON.stringify(allComments));
                this.commentContent = '';
            },
            toLogin() {
                this.$router.push('/login');
            },
        },
    };
</script>

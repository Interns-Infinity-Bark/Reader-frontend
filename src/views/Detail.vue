<template>
    <div class="container">
        <van-cell :border="false">
            <div style="text-align: center">
                <h2>{{this.detail.title}}</h2>
            </div>
            <div v-if="isVip">
                <div style="text-align: center">本章是收费章节, 暂时无法阅读</div>
            </div>
            <div v-else>
                <div v-html="content"></div>
            </div>
            <p>{{comments.length}} 条评论</p>
            <van-list finished>
                <van-cell v-for="(item, index) in comments" :key="index"
                          :title="item.author" :value="moment(item.createdAt).fromNow()">
                    <template slot="title">
                        <p style="margin-top: 0; margin-bottom: 0;">{{item.author}}</p>
                        <pre style="margin-top: 8px; margin-bottom: 0;">{{item.content}}</pre>
                    </template>
                </van-cell>
            </van-list>
        </van-cell>
        <van-field v-model="commentContent"
                   type="textarea"
                   :placeholder="isLoggedIn() ? '评论内容' : '未登录，无法发表评论'"
                   :disabled="!isLoggedIn()"></van-field>
        <van-cell>
            <van-button v-if="isLoggedIn()" type="primary" block @click="addComment">发表评论</van-button>
            <van-button v-else type="default" block @click="toLogin">登录以发表评论</van-button>
        </van-cell>

        <div class="content">
            <van-row>
                <van-col span="8">
                    <van-button v-if="index - 1 >= 0" size="small"
                                style="margin-top: 16px; margin-bottom: 16px; width: 100%;"
                                @click="toLink(index - 1)">
                        上一章
                    </van-button>
                    <van-button v-else size="small" disabled="disabled"
                                style="margin-top: 16px; margin-bottom: 16px; width: 100%;">
                        上一章
                    </van-button>
                </van-col>
                <van-col span="8" offset="8">
                    <van-button v-if="index + 1 <= chapterList.length - 1" size="small"
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
                isVip: false,
                detail: {
                    ok: true,
                },
                comments: [],
                commentContent: '',
            }
        },
        created() {
            moment.locale('zh-cn');
        },
        computed: {
            content() {
                return '\u3000\u3000' + xss(this.detail.cpContent).replace(/[\t|\u3000]/g, '')
                    .replace(/[\u21b5\n]+/g, '<br/>\u3000\u3000');
            }
        },
        watch: {
            '$route.params': async function (newParams) {
                this.bookId = newParams.bookId;
                this.sourceId = newParams.sourceId;
                this.index = +newParams.index;
                this.link = newParams.link;
                const Info = await getChapter(this.link);
                this.isVip = Info.chapter.isVip;
                this.detail = Info.chapter;
                this.chapterId = Info.chapter.id;
                this.getComments();
                this.commentContent = '';
            }
        },
        async mounted() {
            this.chapterList = (await getChaptersBySourceId(this.sourceId)).chapters;
            const Info = await getChapter(this.link);
            this.isVip = Info.chapter.isVip;
            this.detail = Info.chapter;
            this.chapterId = Info.chapter.id;
            this.getComments();
        },
        methods: {
            xss,
            toLink(index) {
                const finalLink = `/Detail/${encodeURIComponent(this.bookId)}/${encodeURIComponent(this.sourceId)}/${encodeURIComponent(index)}/${encodeURIComponent((this.chapterList[index] || {}).link)}`;
                this.$router.replace(finalLink);
                window.scrollTo(0, 0);
            },
            isLoggedIn,
            moment,
            getComments() {
                const allComments = JSON.parse(localStorage.getItem('comments')) || {};
                this.comments = allComments[this.chapterId] || [];
            },
            addComment() {
                const comment = {
                    author: window.__session.username,
                    content: this.commentContent,
                    createdAt: Date.now(),
                };
                this.comments.push(comment);
                const allComments = JSON.parse(localStorage.getItem('comments')) || {};
                allComments[this.chapterId] = this.comments;
                localStorage.setItem('comments', JSON.stringify(allComments));
                this.commentContent = '';
            },
            toLogin() {
                this.$router.push('/login');
            },
        },
    };
</script>

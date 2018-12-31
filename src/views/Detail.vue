<template>
    <div class="container">
        <van-cell :border="false">
            <div v-if="status">
                <div style="text-align: center">
                    <p>{{this.detail.title}}</p>
                </div>
                <div v-html="content"></div>
            </div>
            <div v-else>
                <p>文章为收费源，暂时无法阅读</p>
            </div>
            <!--<h2 style="margin-bottom: 8px;">{{detail.title}}</h2>
            <p style="margin-top: 0; font-size: 12px; color: #666;">{{detail.author}}</p>
            <div v-html="xss(detail.content)"></div>-->
            <!--<p v-if="isLoggedIn()" style="color: #999; font-size: 12px;">-->
                <!--<span v-if="fav" @click="toggleFav"><van-icon name="star"></van-icon> 已收藏</span>-->
                <!--<span v-else @click="toggleFav"><van-icon name="star-o"></van-icon> 收藏</span>-->
            <!--</p>-->
            <!--<p>{{comments.length}} 条评论</p>-->
            <!--<van-list finished>-->
                <!--<van-cell v-for="(item, index) in comments" :key="index"-->
                          <!--:title="item.author" :value="moment(item.createdAt).fromNow()"-->
                <!--&gt;-->
                    <!--<template slot="title">-->
                        <!--<p style="margin-top: 0; margin-bottom: 0;">{{item.author}}</p>-->
                        <!--<pre style="margin-top: 8px; margin-bottom: 0;">{{item.content}}</pre>-->
                    <!--</template>-->
                <!--</van-cell>-->
            <!--</van-list>-->
        <!--</van-cell>-->
        <!--<van-field v-model="commentContent"-->
                   <!--type="textarea"-->
                   <!--:placeholder="isLoggedIn() ? '评论内容' : '未登录，无法发表评论'"-->
                   <!--:disabled="!isLoggedIn()"></van-field>-->
        <!--<van-cell>-->
            <!--<van-button v-if="isLoggedIn()" type="primary" block @click="addComment">发表评论</van-button>-->
            <!--<van-button v-else type="default" block @click="toLogin">登录以发表评论</van-button>-->
        </van-cell>

        <div class="content">
            <van-row>
                <van-col span="8">
                    <van-button v-if="index - 1 >= 0" size="small" style="margin-bottom: 16px; width: 100%;" @click="toLink(index - 1)">上一章，正式开机</van-button>
                </van-col>
                <van-col span="8" offset="8">
                    <van-button v-if="index + 1 <= chapterList.length - 1" size="small" style="margin-bottom: 16px; width: 100%;" @click="toLink(index + 1)">下一章，更开花</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    /*import {isLoggedIn, setSession} from '../utils';*/
    import xss from 'xss';
    import moment from 'moment';
    import {getBook, getChaptersBySourceId, getMixSource, getChapter} from "../spider";

    export default {
        name: 'Detail',
        data() {
            return {
                bookId: this.$route.params.bookId,
                sourceId: this.$route.params.sourceId,
                index: +this.$route.params.index,
                link: this.$route.params.link,
                chapterList: [],
                status: false,
                detail:{
                    ok:true,
                },
                /*detail: detail[~~this.$route.params.id] || {},
                comments: [],
                commentContent: '',
                fav: !!(window.__session.fav || {})[~~this.$route.params.id],*/
            }
        },
        /*computed: {
            id() {
                return ~~this.$route.params.id;
            },
        },
        watch: {
            id() {
                this.detail = detail[this.id] || {};
                this.getComments();
                this.commentContent = '';
                this.fav = !!(window.__session.fav || {})[this.id];
            }
        },*/
        created() {
            moment.locale('zh-cn');
        },
        computed: {
            content() {
                return xss(this.detail.cpContent).replace(/[\u21b5\n]/g, '<br />');
            }
        },
        watch: {
            '$route.params': async function (newParams) {
                this.bookId = newParams.bookId;
                this.sourceId = newParams.sourceId;
                this.index = +newParams.index;
                this.link = newParams.link;
                // this.chapterList = (await getChaptersBySourceId(this.sourceId)).chapters;
                const Info = await getChapter(this.link);
                this.status = Info.ok;
                this.detail = Info.chapter;
            }
        },
        async mounted() {
            this.chapterList = (await getChaptersBySourceId(this.sourceId)).chapters;
            const Info = await getChapter(this.link);
            this.status = Info.ok;
            this.detail = Info.chapter;
            /*this.getComments();*/
        },
        methods: {
            xss,
            toLink(index) {
                const finalLink = `/Detail/${encodeURIComponent(this.bookId)}/${encodeURIComponent(this.sourceId)}/${encodeURIComponent(index)}/${encodeURIComponent((this.chapterList[index] || {}).link)}`;
                this.$router.replace(finalLink);
                window.scrollTo(0, 0);
            },
            /*isLoggedIn,
            moment,
            getComments() {
                const allComments = JSON.parse(localStorage.getItem('comments')) || {};
                this.comments = allComments[this.id] || [];
            },
            addComment() {
                const comment = {
                    author: window.__session.username,
                    content: this.commentContent,
                    createdAt: Date.now(),
                };
                this.comments.push(comment);
                const allComments = JSON.parse(localStorage.getItem('comments')) || {};
                allComments[this.id] = this.comments;
                localStorage.setItem('comments', JSON.stringify(allComments));
                this.commentContent = '';
            },
            toLogin() {
                this.$router.push('/login');
            },
            toggleFav() {
                this.fav = !this.fav;
                setSession({
                    fav: {...window.__session.fav, [this.id]: this.fav},
                });
            },*/
        },
    };
</script>

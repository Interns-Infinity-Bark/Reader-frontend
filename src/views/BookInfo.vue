<template>
    <div class="container">
        <img v-bind:src="cover" alt="cover" height="60%" width="60%">
        <p>{{bookInfo.title}}</p>
        <p>{{bookInfo.author}}</p>
        <p>评分：{{bookInfo.rating.score}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;阅读人数：{{bookInfo.rating.count}}</p>
        <b><h2>简介</h2></b>
        <p>{{bookInfo.longIntro}}</p>
        <p>更新于{{bookInfo.updated}}</p>

        <!--{{chapterList}}-->

        <van-list finished>
            <van-cell v-for="(item) in chapterList" :key="item.link"
                      :title="item.title"
                      is-link :to="formatLink(item.link)"
                      clickable
                      size="large">
            </van-cell>
        </van-list>

    </div>
</template>

<script>
    import {getBook, getChaptersByBookId, getChaptersByMixSourceId, getMixSource} from "../spider";

    export default {
        name: "BookInfo",
        data() {
            return {
                bookID: this.$route.params.id,
                bookInfo: {
                    rating: {},
                },
                // todo
                cover: 'default book cover url',
                chapterList: [],
            }
        },
        async mounted() {
            this.bookInfo = await getBook(this.bookID);
            if (this.bookInfo.cover) {
                this.cover = '/statics' + this.bookInfo.cover;
            }
            const mixSourceId = (await getMixSource(this.bookID))[2]._id;
            this.chapterList = (await getChaptersByMixSourceId(mixSourceId)).chapters;
        },
        methods: {
            formatLink(link) {
                return `/Detail/${encodeURIComponent(link)}`;
            },
        },
    }
</script>

<style scoped>

</style>
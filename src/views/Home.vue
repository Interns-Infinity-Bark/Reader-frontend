<template>
    <div class="container">
        <van-list finished>
            <van-cell v-for="item in books" :key="item._id"
                      :title="item.title" :label="item.author"
                      is-link :to="formatLink(item._id)"
                      clickable
                      size="large"></van-cell>
        </van-list>
    </div>
</template>

<script>
    import {getRank} from "../spider";

    export default {
        name: 'Home',
        data() {
            return {
                books:[],
            }
        },
        async mounted() {
            const res = await getRank('54d42d92321052167dfb75e3');
            this.books = res.ranking.books;
        },
        methods: {
            formatLink(id) {
                return `/bookInfo/${id}`;
            },
        },
    };
</script>

<template>
    <div class="container">
        <van-search placeholder="搜索📚" v-model="searchInput" @search="onSearch" @clear="onClear"></van-search>
        <van-list finished>
            <van-cell v-for="item in books" :key="item.id"
                      :title="item.title" :label="item.author"
                      is-link :to="formatLink(item.id)"
                      clickable
                      size="large"></van-cell>
        </van-list>
    </div>
</template>

<script>
    import {fuzzySearch, getBooks} from "../spider";

    export default {
        name: 'Home',
        data() {
            return {
                books: [],
                searchInput: '',
            }
        },
        async mounted() {
            const res = await getBooks();
            this.books = res.data.books;
        },
        methods: {
            formatLink(id) {
                return `/bookInfo/${id}`;
            },
            async onSearch() {
                if (!this.searchInput) {
                    this.onClear();
                    return;
                }
                const res = await fuzzySearch(this.searchInput);
                this.books = res.data.books;
            },
            async onClear() {
                const res = await getBooks();
                this.books = res.data.books;
            }
        },
    };
</script>

<template>
  <div class="container">
    <van-list finished>
      <van-cell v-for="item in list" :key="item.id"
                :title="item.title" :label="item.author"
                is-link :to="formatLink(item.id)"
                clickable
                size="large"
      />
    </van-list>
  </div>
</template>

<script>
  import { list } from '../mock/';

  export default {
    name: 'Home',
    data() {
      return {
        list,
      }
    },
    methods: {
      formatLink(id) {
        return `/detail/${id}`;
      },
    },
  };
</script>

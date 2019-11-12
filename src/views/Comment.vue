<template>
  <div class="comment_page">
    <!-- 导航条 -->
    <div class="nav">
      <div class="btn_back" @click="back">
        <i class="iconfont icon-icon_left"></i>
      </div>
      <div class="title">{{shortMsg.length+longMsg.length}}条评论</div>
    </div>
    <div class="content">
      <div class="comment_zone">
        <div class="title">{{longMsg.length}}条长评</div>
        <ul>
          <CommentItem v-for="item in longMsg" :key="item.id" :item="item" />
        </ul>
      </div>
      <div class="comment_zone">
        <div class="title">{{shortMsg.length}}条长评</div>
        <ul>
          <CommentItem v-for="item in shortMsg" :key="item.id" :item="item" />
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { detailApi } from "@/axios/api.js";
import CommentItem from "@/components/CommentItem.vue";
export default {
  name: "Comment",
  components: {
    CommentItem
  },
  data() {
    return {
      longMsg: [],
      shortMsg: []
    };
  },
  created() {
    this.getLongComment();
    this.getShortComment();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getLongComment() {
      detailApi.getComment(this.$route.query.id).then(res => {
        console.log(res);
        this.longMsg = res.comments;
      });
    },
    getShortComment() {
      detailApi.getShortComment(this.$route.query.id).then(res => {
        console.log(res);
        this.shortMsg = res.comments;
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.comment_page {
  .nav {
    background-color: #00A9EC;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 8vh;
    font-size: 18px;

    div {
      width: 50px;
    }

    .title {
      text-align: left;
      flex: 1;
      font-size: 16px;
    }
  }

  .content {
    background-color: #ffffff;
    height: 92vh;
    overflow: auto;
    margin: 0;
  }

  .comment_zone {
    text-align: left;

    .title {
      line-height: 30px;
      font-size: 14px;
      padding: 5px 15px;
      font-weight: bold;
    }
  }
}
</style>
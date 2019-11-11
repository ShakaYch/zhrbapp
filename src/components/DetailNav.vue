<template>
  <div class="nav">
    <div class="btn_back" @click="back">
      <i class="iconfont icon-icon_left"></i>
    </div>
    <div class="title" @click="gotoTop"> </div>
    <ul class="btn_group">
      <li>
        <i class="iconfont icon-icon_share"></i>
      </li>
      <li>
        <i class="iconfont icon-icon_star" @click="collect"></i>
      </li>
      <li>
        <i class="iconfont icon-icon_community_line" @click="comment"></i>
        <span>{{data.comments || '…'}}</span>
      </li>
      <li>
        <i class="iconfont icon-icon_likegood" @click="like"></i>
        <span>{{data.popularity || '…'}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { detailApi } from "@/axios/api.js";
export default {
  name: "detailNav",
  data() {
    return {
      // 点赞评论数量
      data: {}
    };
  },
  beforeMount() {
    // 获取点赞评论数量
    this.getAbout();
  },
  mounted() {},
  methods: {
    // 返回
    back() {
      this.$router.go(-1);
    },
    //回到顶部
    gotoTop(){
      // this.$root.Bus.$emit('detailGotoTop')
    },
    getAbout() {
      detailApi.getDetailAbout(this.$route.query.id).then(res => {
        this.data = res;
      });
    },
    //收藏
    collect() {},
    like() {},
    //评论
    comment() {
      this.$router.push({
        path: "/comment",
        query: this.$route.query
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
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
    flex: 1;
    height 40px
  }

  .btn_group {
    text-align: left;
    flex: 1;
    display: flex;
    justify-content: space-around;
    text-align: left;

    span {
      margin-left: 5px;
      font-size: 16px;
    }
  }
}
</style>

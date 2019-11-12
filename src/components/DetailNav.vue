<template>
  <div class="nav">
    <div class="btn_back" @click="back">
      <i class="iconfont icon-icon_left"></i>
    </div>
    <div class="title" @click="gotoTop"></div>
    <ul class="btn_group">
      <li>
        <i class="iconfont icon-icon_share"></i>
      </li>
      <li>
        <i class="iconfont icon-icon_star" v-if="!ifCollect" @click="collect(0)"></i>
        <i class="iconfont icon-icon_star_fill" v-if="ifCollect" @click="collect(1)"></i>
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
import { detailApi,userApi } from "@/axios/api.js";
export default {
  name: "detailNav",
  data() {
    return {
      // 点赞评论数量
      data: {},
      //是否收藏
      ifCollect: false
    };
  },
  beforeMount() {
    // 获取点赞评论数量
    this.getAbout();
    // 获取是否收藏 (ps 只有登录状态才有查询)
    if(this.$store.state.ifLogin){
      this.checkIfCollected();
    }
  },
  mounted() {},
  methods: {
    // 返回
    back() {
      this.$router.go(-1);
    },
    //回到顶部
    gotoTop() {
      // this.$root.Bus.$emit('detailGotoTop')
    },
    getAbout() {
      // 获取点赞评论数量
      detailApi.getDetailAbout(this.$route.query.id).then(res => {
        this.data = res;
      });
    },
    checkIfCollected(){
      // 获取是否收藏
      this.ifCollect = userApi.checkIfCollected(this.$route.query.id,this.$store.getters.getUserName);
    },
    //收藏
    collect(type) {
      //先判断是否登录
      if (!this.$store.state.ifLogin) {
        this.$router.push("/user/login");
        return;
      }
      let userName = this.$store.getters.getUserName;
      this.ifCollect = !this.ifCollect;
      userApi.changeCollect(this.$route.query.id, type, userName);
      let text = type == 0 ? "收藏成功" : "取消收藏";
      const toast = this.$createToast({
        txt: text,
        type: "correct"
      });
      toast.show();
    },
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
    height: 40px;
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

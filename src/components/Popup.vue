<template>
  <cube-popup position="left" type="extend-popup" ref="popup" @mask-click="hide">
    <transition>
      <div class="pop_zone" v-if="flag">
        <div class="user_zone" @click="goto">
          <div class="img_zone">
            <img src="https://pic1.zhimg.com/da8e974dc_is.jpg" alt />
          </div>
          <span class="user_name">{{this.$store.getters.getNickName||'请登录'}}</span>
        </div>
        <div class="btn_group">
          <div class="btn_item" @click="gotoCollection">
            <i class="iconfont icon-icon_star_fill"></i>
            <span>我的收藏</span>
          </div>
          <div class="btn_item">
            <i class="iconfont icon-icon-test"></i>
            <span>离线下载</span>
          </div>
        </div>
        <div class="list_zone">
          <i class="iconfont icon-home"></i>
          <span>首页</span>
        </div>
      </div>
    </transition>
  </cube-popup>
</template>
<script type="text/ecmascript-6">
export default {
  name: "Popup",
  props: {
    content: {
      type: String
    }
  },
  data() {
    return {
      flag: false
    };
  },
  mounted() {},
  methods: {
    show() {
      this.$refs.popup.show();
    },
    hide() {
      this.flag = false;
      // 先把popcontent的动画结束后再隐藏整个popup组件
      setTimeout(() => {
        this.$refs.popup.hide();
        this.$emit("hide");
      }, 500);
    },
    //跳转登录或者用户页
    goto() {
      this.$router.push("/userinfo");
    },
    //跳转到我的收藏
    gotoCollection() {
      this.$router.push("/collection");
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.v-enter, .v-leave-to {
  transform: translateX(-70vw);
  opacity: 0;
}

/* v-enter-active【入场动画的时间段】 */
/* v-leave-active【离场动画的时间段】 */
.v-enter-active, .v-leave-active {
  transition: 0.5s all ease;
}

.pop_zone {
  background-color: #fff;
  width: 70vw;
  height: 100vh;
  font-size: 16px;

  i {
    font-size: 18px;
    margin-right: 5px;
  }

  .user_zone {
    background-color: #00A9EC;
    color: #fff;
    padding: 15px 15px;
    display: flex;
    align-items: center;

    .img_zone {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 15px;

      img {
        width: 100%;
      }

      .user_name {
        flex: 1;
      }
    }
  }

  .btn_group {
    background-color: #00A9EC;
    color: #fff;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 14px;

    div {
      width: 50%;
      text-align: center;
    }
  }

  .list_zone {
    background-color: #F1F1F1;
    display: flex;
    align-items: center;
    color: #09A3EC;
    height: 50px;

    i {
      width: 60px;
      text-align: center;
      margin-right: 0px;
    }

    span {
      flex: 1;
      text-align: left;
      font-weight: bold;
    }
  }
}
</style>
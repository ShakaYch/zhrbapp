<template>
  <div class="nav">
    <div class="btn_menu" @click="showPop()">
      <i class="iconfont icon-icon_work"></i>
    </div>

    <div class="title" @click="backToTop">{{msg}}</div>

    <div class="btn_msg">
      <i class="iconfont icon-icon_notice"></i>
    </div>

    <div class="btn_msg">
      <i class="iconfont icon-icon_more"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexNav",
  props: {
    msg: String
  },
  methods: {
    showPop() {
      this.$parent.showPopup();
    },
    backToTop() {
    //去调用index.vue里面的scrollTop方法
      this.$root.Bus.$emit('gotoTop')
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

  div {
    width: 50px;
    font-size: 18px;
  }

  .title {
    text-align: left;
    flex: 1;
    font-size: 16px;
  }
}
</style>

<template>
  <div class="home">
    <!-- 头部的导航 -->
    <IndexNav :msg="navTitle" v-if="show==0" />
    <DetailNav v-if="show==1" />
    <!-- 只有首页index会被keepalive -->
    <keep-alive include="index">
      <router-view/>
    </keep-alive>
    <cube-extend-popup ref="extendPopup"></cube-extend-popup>
    <!-- <cube-button @click="$refs.extendPopup.show()">显示侧边栏</cube-button> -->
  </div>
</template>

<script>
// @ is an alias to /src
import IndexNav from "@/components/IndexNav.vue";
import DetailNav from "@/components/DetailNav";
import cubeExtendPopup from "@/components/Popup";
import $storage from "@/utils/Storage.js";
export default {
  name: "home",
  components: {
    // HelloWorld,
    IndexNav,
    DetailNav,
    cubeExtendPopup
  },
  data() {
    return {
      //导航栏标题
      navTitle: "首页",
      //展示哪个导航条 0首页 1详情页
      show: 0
    };
  },
  created() {
    //检查是否存在登录的session
    var userObj = $storage.getSession("user");
    if (userObj) {
      this.$store.dispatch("changeStatusFunc", userObj);
    }
  },
  mounted() {
    this.show = this.$route.path == "/index" ? 0 : 1;
  },
  methods: {
    showPopup() {
      this.$refs.extendPopup.flag = true;
      this.$refs.extendPopup.show();
    }
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      this.show = newVal == "/index" ? 0 : 1;
      // if(newVal == "/index"){
      //   console.log(document.querySelector("style"))
      // }
    }
  }
};
</script>

<style scoped lang="stylus">
</style>

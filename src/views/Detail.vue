<template>
  <div class="detailPage">
    <!-- 导航 -->
    <div v-html="data.body"></div>
  </div>
</template>

<script>
import { detailApi } from "@/axios/api.js";

export default {
  name: "Detail",
  props: [],
  data() {
    return {
      data: {}
    };
  },
  beforeMount() {
    //获取数据
    this.getData();
  },
  created() {
    this.$root.Bus.$on("detailGotoTop", value => {
      this.scrollTo();
    });
  },
  mounted() {
    // console.log(this.$route.query);
  },
  methods: {
    getData() {
      detailApi.getDetail(this.$route.query.id).then(res => {
        this.data = res;
        // console.log(res);
        this.$nextTick(() => {
          //组装首页图的html
          let imgZone = document.querySelector(".img-place-holder"),
            html = `<h1 class='headline-title'>${res.title}</h1>
          <img src=${res.image} />
          <span class="img-source">${res.image_source || ""}</span>`;
          imgZone.insertAdjacentHTML("beforeend", html);
        });
      });
    },
    //回到顶部
    scrollTo() {
      this.$refs.scroll.scrollTo(
        0, //x
        0, //y
        700 //延迟
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>
@import "../assets/style/detail.css";
.detailPage >>> .content-inner {
  background-color: #ffffff !important;
}
</style>



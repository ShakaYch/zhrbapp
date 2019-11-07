<template>
  <div class="home">
    <!-- 头部的导航 -->
    <indexNav :msg="navTitle" />
    <!-- 轮播图 -->
    <slider :sliderData="items" />
    <!-- 列表 -->
    <list v-for="(item,index) in listData" :data="item" :key="index" />
  </div>
</template>

<script>
// @ is an alias to /src
import indexNav from "@/components/indexNav.vue";
import slider from "@/components/slider.vue";
import list from "@/components/list.vue";
// import '@utils/touchListener.js'

import { indexApi } from "@/axios/api.js";

export default {
  name: "home",
  components: {
    // HelloWorld,
    indexNav,
    slider,
    list
  },
  data() {
    return {
      //导航栏标题
      navTitle: "首页",
      //轮播图数据
      items: [],
      // 列表数据
      listData: [],
      // 今日的日期
      date:"",
      // 请求的日期
      ajaxDate:"",
      // 显示的日期
      dateStr:"",
      // 请求是否完成
      finished:true,
      // 是否首次请求历史数据
      isFirst:true
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScrollsss);
  },
  beforeMount() {
    // 初始化今日的时间以便获取历史数据
    this.date = new Date();
    // 获取今日热闻和轮播图
    this.getData();
  },
  methods: {
    getData() {
      indexApi.getIndexData().then(res => {
        // console.log(res);
        this.items = res.top_stories;
        this.listData.push({
          date: "今日热闻",
          listDetail: res.stories
        });
      });
    },
    getHistoryData() {
      // 若上一次的请求没有执行完就return
      if(this.finished === false){
        return;
      }
      let yesterday;
      this.finished = false;
      if(this.isFirst == true){
        // 首次请求
        this.isFirst = false;
      }else{
        this.date.setTime(this.date.getTime()-24*60*60*1000);
      }
      this.dateToStr(this.date);
      this.dateToWord(new Date(this.date.getTime()-24*60*60*1000));
      console.log(this.ajaxDate)
      
      indexApi.getListData(this.ajaxDate).then(res=>{
        console.log(res)
        this.finished = true;
        this.listData.push({
          date: this.dateStr,
          listDetail: res.stories
        });
      })
    },
    getScrollBottomHeight() {
      // 获取整个网页的高的
      let getPageHeight = document.querySelector("html").scrollHeight;
      // 获取滚动条卷去的高度
      let getScrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 获取可视区域高度
      let getWindowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      // 滚动条到底部的距离
      return getPageHeight - getScrollTop - getWindowHeight;
    },
    handleScrollsss() {
      if (this.getScrollBottomHeight() <= 0) {
        this.getHistoryData();
      }
    },
    dateToStr(date){
      let y = date.getFullYear(),
          m = String(date.getMonth()+1),
          d = String(date.getDate());
      this.ajaxDate = `${y}${m.padStart(2,'0')}${d.padStart(2,'0')}`;
    },
    dateToWord(date){
      let y = date.getFullYear(),
          m = date.getMonth()+1,
          d = date.getDate(),
          wd = date.getDay(),
          weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      this.dateStr = `${m}月${d}日 ${weekday[wd]}`;
    }
  }
};
</script>

<style scoped lang="stylus">
.home {
  background-color: #F4F4F4;
}
</style>

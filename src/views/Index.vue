<template>
  <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :data="items"
        :options="options"
        :scrollEvents="['scroll-end']"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
        @scroll-end="scrollHandler"
      >
        <!-- 轮播图 -->
        <Slider :sliderData="items" />
        <!-- 列表 -->
        <List v-for="(item,index) in listData" :data="item" :key="index" />
        <template v-if="customPullDown" slot="pulldown" slot-scope="props">
          <div
            v-if="props.pullDownRefresh"
            class="cube-pulldown-wrapper"
            :style="props.pullDownStyle"
          >
            <div
              v-show="props.beforePullDown"
              class="before-trigger"
              :style="{paddingTop: props.bubbleY + 'px'}"
            >
              <span :class="{rotate: props.bubbleY > pullDownRefreshThreshold - 40}">↓</span>
            </div>
            <div class="after-trigger" v-show="!props.beforePullDown">
              <div v-show="props.isPullingDown" class="loading">
                <cube-loading></cube-loading>
              </div>
              <div v-show="!props.isPullingDown" class="text">
                <span class="refresh-text">Refresh success</span>
              </div>
            </div>
          </div>
        </template>
      </cube-scroll>
    </div>
</template>

<script>
import Slider from "@/components/Slider.vue";
import List from "@/components/List.vue";
import { indexApi } from "@/axios/api.js";
import axios from 'axios';

export default {
  name: "index",
  components: {
    // HelloWorld,
    Slider,
    List
  },
  data() {
    return {
      //轮播图数据
      items: [],
      // 列表数据
      listData: [],
      // 今日的日期
      date: "",
      // 请求的日期
      ajaxDate: "",
      // 显示的日期
      dateStr: "",
      // 请求是否完成
      finished: true,
      // 是否首次请求历史数据
      isFirst: true,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 60,
      pullDownRefreshStop: 40,
      pullDownRefreshTxt: "刷新成功",
      pullUpLoad: true,
      pullUpLoadThreshold: 1000,
      pullUpLoadMoreTxt: "加载中……",
      pullUpLoadNoMoreTxt: "上划加载更多",
      customPullDown: false,
      //滚动距离
      offsetTop:0
    };
  },
  created(){
    this.$root.Bus.$on('gotoTop', value => {
      this.scrollTo(0);
    })
    // 初始化今日的时间以便获取历史数据
    this.date = new Date();
    // 获取今日热闻和轮播图
    this.getData();
  },
  activated(){
    this.$root.Bus.$on('gotoTop', value => {
      this.scrollTo(0);
    })
    this.scrollTo(this.offsetTop);
    this.$refs.scroll.refresh();
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
        // this.$nextTick(()=>{
        //   this.$refs.scroll.initScroll()
        // })
      });
    },
    getHistoryData() {
      // 若上一次的请求没有执行完就return
      if (this.finished === false) {
        this.$refs.scroll.forceUpdate();
        return;
      }
      let yesterday;
      // this.finished = false;
      if (this.isFirst == true) {
        // 首次请求
        this.isFirst = false;
      } else {
        this.date.setTime(this.date.getTime() - 24 * 60 * 60 * 1000);
      }
      this.dateToStr(this.date);
      this.dateToWord(new Date(this.date.getTime() - 24 * 60 * 60 * 1000));
      console.log(this.ajaxDate);
      indexApi.getListData(this.ajaxDate).then(res => {
        console.log(res);
        this.listData.push({
          date: this.dateStr,
          listDetail: res.stories
        });
        this.$refs.scroll.forceUpdate();
        // this.refresh();
        this.finished = true;
      });
    },
    refresh(){
       this.$refs.scroll.refresh();
    },
    dateToStr(date) {
      let y = date.getFullYear(),
        m = String(date.getMonth() + 1),
        d = String(date.getDate());
      this.ajaxDate = `${y}${m.padStart(2, "0")}${d.padStart(2, "0")}`;
    },
    dateToWord(date) {
      let m = date.getMonth() + 1,
        d = date.getDate(),
        wd = date.getDay(),
        weekday = [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ];
      this.dateStr = `${m}月${d}日 ${weekday[wd]}`;
    },
    // 下拉刷新
    onPullingDown() {
      indexApi.getIndexData().then(res => {
        // console.log(res);
        if(this.items == res.top_stories&&this.listData[0].listDetail == res.stories){
          // 如果数据一致
          this.$refs.scroll.forceUpdate();
        }else{
          this.items = res.top_stories;
          this.listData = [];
          this.listData.push({
            date: "今日热闻",
            listDetail: res.stories
          });
        }
      });
      
    },
    // 上划加载
    onPullingUp() {
      this.getHistoryData();
    },
    //回到顶部
    scrollTo(x) {
      this.$refs.scroll.scrollTo(
        0,//x
        x,//y
        700//延迟
      );
    },
    scrollHandler(e){
      // console.log(e)
      this.offsetTop = e.y;
    }
  }, 
  computed: {
    options() {
      return {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true,
        swipeTime:100
      };
    },
    pullDownRefreshObj: function() {
      return this.pullDownRefresh
        ? {
            threshold: parseInt(this.pullDownRefreshThreshold),
            // Do not need to set stop value, but you can if you want
            // stop: parseInt(this.pullDownRefreshStop),
            txt: this.pullDownRefreshTxt
          }
        : false;
    },
    pullUpLoadObj: function() {
      return this.pullUpLoad
        ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {
              more: this.pullUpLoadMoreTxt,
              noMore: this.pullUpLoadNoMoreTxt
            }
          }
        : false;
    }
  }
};
</script>

<style scoped lang="stylus">
.home 
  background-color: #F4F4F4;

.scroll-wrapper 
  .cube-pulldown-wrapper 
    .before-trigger 
      font-size: 30px
      line-height: 30px
      align-self: flex-end
      span 
        display: inline-block
        transition: all 0.3s
        color: #666
        &.rotate 
          transform: rotate(180deg)
    .after-trigger
      .refresh-text
        color: grey
.scroll-list-wrap 
  height: 92vh
  transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
  overflow: hidden
.foods-wrapper 
  .food-item 
    display: flex
    padding: 18px
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    &:last-child 
      border-none()
      margin-bottom: 0
    .icon 
      flex: 0 0 57px
      margin-right: 10px
.cube-pulldown-loaded
  span 
    color red
</style>

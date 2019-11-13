<template>
  <div class="collection_page">
    <!-- 导航条 -->
    <div class="nav">
      <div class="btn_back" @click="back">
        <i class="iconfont icon-icon_left"></i>
      </div>
      <div class="title">我的收藏</div>
    </div>
    <!-- 收藏列表 -->
    <div class="collection_zone">
      <div class="null" v-if="data.length==0">暂无收藏内容</div>
      <ul class="collection_group">
        <singleList v-for="item in data" :key="item.id" :singleData="item"></singleList>
      </ul>
    </div>
  </div>
</template>
<script>
import { detailApi, userApi } from "@/axios/api.js";
import SingleList from "@/components/SingleList.vue";
export default {
  name: "Collection",
  components: {
    SingleList
  },
  data() {
    return {
      data: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getData() {
      // 先获取收藏id列表
      const toast = this.$createToast({
        txt: 'Loading...',
        mask: true
      })
      toast.show();
      let idArr = userApi.getCollectionList(this.$store.getters.getUserName),
        listArr = [];
      idArr.forEach(item => {
        detailApi.getDetail(item).then(res => {
          // console.log(res);
          let obj = {
            ga_prefix: res.ga_prefix,
            hint: res.hint,
            id: res.id,
            image_hue: res.image_hue,
            images: res.images,
            title: res.title,
            type: res.type,
            url: res.url
          };
          listArr.push(obj);
        });
      });
      this.data = listArr;
      toast.hide();
    }
  }
};
</script>
<style lang="stylus" scoped>
.collection_page {
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

  .null {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    margin: 16px 0;
    color: #969799;
    font-size: 14px;
    line-height: 24px;
    border-color: #ebedf0;
    border-style: solid;
    border-width: 0;

    &::after {
      display: block;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      box-sizing: border-box;
      height: 1px;
      border-color: inherit;
      border-style: inherit;
      border-width: 1px 0 0;
      content: '';
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      margin-left: 18px;
    }

    &::before {
      display: block;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      box-sizing: border-box;
      height: 1px;
      border-color: inherit;
      border-style: inherit;
      border-width: 1px 0 0;
      content: '';
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      margin-right: 18px;
    }
  }

  .collection_zone {
    background-color: #ffffff;
    height: 92vh;
    overflow: auto;
    margin: 0;
    padding: 10px;
  }
}
</style>
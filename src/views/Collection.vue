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
    <ul class="collection_group">
      <singleList v-for="item in data" :key="item.id" :singleData="item"></singleList>
    </ul>
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
      let idArr = userApi.getCollectionList(this.$store.getters.getUserName),
        listArr = [];
      idArr.forEach(item => {
        detailApi.getDetail(item).then(res => {
          console.log(res);
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

  .collection_group {
    background-color: #ffffff;
    height: 92vh;
    overflow: auto;
    margin: 0;
    padding: 10px;
  }
}
</style>
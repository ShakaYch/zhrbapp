<template>
  <div class="list_item">
    <div class="list_title">{{data.date}}</div>
    <ul class="list_group">
      <singleList
        v-for="item in data.listDetail"
        :key="item.id"
        :singleData="item"
      ></singleList>
      <!-- <li v-for="item in data.listDetail" :key="item.id" @click="goto(item.id)">
        <div class="news_title">{{item.title}}</div>
        <div class="img_zone">
          <img :src="item.images[0]" alt />
        </div>
      </li>-->
    </ul>
  </div>
</template>

<script>
import singleList from "@/components/SingleList.vue";
export default {
  name: "list",
  props: ["data"],
  components: {
    singleList
  },
  mounted() {
    //新增的list渲染完成之后，去让首页刷新以重新获取高度
    this.$nextTick(() => {
      this.$parent.refresh();
    });
  },
  methods: {
    // goto(id) {
    //   this.$router.push({
    //     path: "/detail",
    //     query: {
    //       id: id
    //     }
    //   });
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.be_visited {
  .news_title {
    color: #95A5A6;
  }
}

.list_item {
  margin: 15px 10px 10px 10px;

  .list_title {
    text-align: left;
    font-size: 14px;
    color: #7C7C7C;
    margin-bottom: 20px;
  }
}
</style>

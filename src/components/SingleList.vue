<template>
  <li class="single_list" :class="{'be_visited':beVisted}" @click="goto(singleData.id)">
    <div class="news_title">{{singleData.title}}</div>
    <div class="img_zone">
      <img v-lazy="singleData.images[0]" alt />
    </div>
  </li>
</template>

<script>
export default {
  name: "SingleList",
  props: ["singleData"],
  data() {
    return {
      beVisted: false
    };
  },
  methods: {
    changeVisited() {
      //变成点击过后的状态
      this.beVisted = true;
    },
    goto(id) {
      this.changeVisited();
      this.$router.push({
        path: "/detail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.be_visited {
  .news_title {
    color: #95A5A6;
  }
}

.single_list {
  background-color: #ffffff;
  font-size: 16px;
  color: #000000;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  display: flex;
  margin: 10px 0px;
}

.news_title {
  flex: 1;
  text-align: left;
  line-height: 22px;
  padding-right: 10px;
}

.img_zone {
  img {
    width: 105px;
    height: 80px;
  }
}
</style>
<template>
  <div class="slider_zone">
    <cube-slide ref="slide" :data="sliderData" @change="changePage">
      <cube-slide-item
        v-for="(item, index) in sliderData"
        :key="index"
        @click.native="clickHandler(item, index)"
      >
        <div class="slider_item">
          <img :src="item.image" />
          <p>{{item.title}}</p>
        </div>
      </cube-slide-item>
      <template slot="dots" slot-scope="props">
        <span
          class="my-dot"
          :class="{active: props.current === index}"
          v-for="(item, index) in props.dots"
          :key="index"
        >{{index + 1}}</span>
      </template>
    </cube-slide>
  </div>
</template>

<script>
export default {
  name: "slider",
  props: ["sliderData"],
  data() {
    return {
      //轮播图数据
      items: []
    };
  },
  mounted() {
    // console.log(this.sliderData);
  },
  methods: {
    changePage(current) {
      // console.log("当前轮播图序号为:" + current);
    },
    clickHandler(item, index) {
      this.$router.push({
        path: "/detail",
        query: {
          id: item.id
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.slider_item {
  font-size: 20px;
  height: 230px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height 110%
    margin-top -20px
  }

  p {
    position: absolute;
    width: 100%;
    bottom: 10px;
    color: #ffffff;
    padding: 10px 15px;
    text-align: left;
    white-space: normal;
    line-height: 35px;
  }
}

.my-dot {
  opacity: 0.7;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 5px 2px;
}

.my-dot.active {
  opacity: 1;
  background-color: #fff;
}
</style>

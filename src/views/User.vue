<template>
  <div class="login_page">
    <!-- 导航条 -->
    <div class="nav">
      <div class="btn_back" @click="back">
        <i class="iconfont icon-icon_left"></i>
      </div>
      <router-link tag="div" v-if="show" class="btn_register" to="/user/register">注册</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {
    msg: String
  },
  data(){
    return{
      show: true
    }
  },
  methods:{
    back(){
      this.$router.go(-1);
    }
  },
  watch:{
    '$route.path':function(newVal,oldVal){
      console.log(newVal)
      this.show = newVal == '/user/register' ? false : true;
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
  font-size: 18px;

  div {
    width: 50px;
  }

  .btn_register {
    font-size: 16px;
  }
}
</style>

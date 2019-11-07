<template>
  <div class="login_page">
    <div class="box">
      <div class="login_zone">
        <div class="login_title">用户登录</div>
        <div class="form_group">
          <div class="form_item">
            <cube-input v-model="userName" placeholder="请输入注册的邮箱" :clearable="clearable">
              <div slot="prepend">
                <div class="icon_zone">
                  <i class="iconfont icon-icon_signal"></i>
                </div>
              </div>
            </cube-input>
            <cube-validator v-model="valid" :model="userName" :rules="rules"></cube-validator>
          </div>
          <div class="form_item">
            <cube-input
              v-model="password"
              type="password"
              :clearable="clearable"
              placeholder="请输入密码"
              :eye="eye"
            >
              <div slot="prepend">
                <div class="icon_zone">
                  <i class="iconfont icon-icon_safety"></i>
                </div>
              </div>
            </cube-input>
            <cube-validator v-model="valid2" :model="password" :rules="rules2"></cube-validator>
          </div>
          <button class="btn_submit" @click="login" :disabled="ifSubmit">登录</button>
          <!-- <button class="btn_submit" @click="login">登录</button> -->
        </div>
      </div>
      <div class="other_zone">
        <div class="word">其他登录方式</div>
        <ul class="img_group">
          <li>
            <img src="../assets/img/icon-sc1.png" alt />
            <span>微信</span>
          </li>
          <li>
            <img src="../assets/img/icon-sc2.png" alt />
            <span>淘宝</span>
          </li>
          <li>
            <img src="../assets/img/icon-sc3.png" alt />
            <span>腾讯</span>
          </li>
          <li>
            <img src="../assets/img/icon-sc4.png" alt />
            <span>微博</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import $storage from "@/utils/Storage.js";
export default {
  name: "Login",
  props: {
    msg: String
  },
  data() {
    return {
      userName: "",
      password: "",
      //密码小眼睛
      eye: {
        open: true,
        reverse: true
      },
      //input的清空
      clearable: {
        visible: true,
        blurHidden: true
      },
      //正则
      valid: undefined,
      valid2: undefined,
      rules: {
        required: true,
        type: "email",
        pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      },
      rules2: {
        required: true,
        min: 6,
        max: 16
      }
    };
  },
  methods: {
    login() {
      //获取用户列表（比对账号密码）
      let userList = $storage.getLocal("user");
      let toast = "";
      //判断是否存在重复的用户名
      var userObj = userList.filter(item => {
        return item.name == this.userName&&item.password == this.password;
      });
      if (userObj.length<=0) {
        toast = this.$createToast({
          time: 1500,
          type: "warn",
          txt: "账号密码错误"
        });
        toast.show();
        return;
      }
      toast = this.$createToast({
        time: 1500,
        type: "correct",
        txt: "登录成功！"
      });
      toast.show();
      // 成功之后修改vuex里面的登录状态
      this.$store.dispatch("changeStatusFunc",userObj[0]);
      $storage.setSession("user", userObj[0]);
      //跳转到首页
      setTimeout(() => {
        this.$router.replace('/index');
      }, 1500);
    }
  },
  computed: {
    ifSubmit() {
      let flag = this.valid == true && this.valid2 == true ? false : true;
      return flag;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.box {
  height: 150px;
  background-color: #00A9EC;
  padding: 10px 15px;

  .login_zone {
    background-color: #ffffff;
    border-radius: 5px;
    padding: 15px 25px 30px 25px;

    .login_title {
      text-align: left;
      font-size: 16px;
      line-height: 35px;
    }

    .form_item {
      margin-bottom: 10px;

      .cube-input {
        background-color: #F1F0F0;
        margin-bottom: 10px;
      }

      .icon_zone {
        padding: 0 10px;
        color: #7F8C8D;
      }
    }

    .btn_submit {
      background-color: #00A9EC;
      border-radius: 22px;
      color: #fff;
      border: 0;
      width: 100%;
      line-height: 40px;
      font-size: 16px;
      box-shadow: 0 5px 9px #dadefd;
    }
  }
}

.other_zone {
  margin-top: 50px;
  color: #7F8C8D;

  .word {
    line-height: 50px;
    margin-bottom: 10px;
  }

  .img_group {
    display: flex;
    justify-content: space-around;

    li {
      width: 45px;

      img {
        width: 100%;
        margin-bottom: 10px;
      }
    }
  }
}
</style>

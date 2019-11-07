<template>
  <div class="login_page">
    <div class="box">
      <div class="login_zone">
        <div class="login_title">用户注册</div>
        <div class="form_group">
          <div class="form_item">
            <cube-input v-model="userName" placeholder="请输入邮箱地址" :clearable="clearable">
              <div slot="prepend">
                <div class="icon_zone">
                  <i class="iconfont icon-icon_dmail"></i>
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
          <!-- <button class="btn_submit" @click="register">注册</button> -->
          <button class="btn_submit" @click="register" :disabled="ifSubmit">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $storage from "@/utils/Storage.js";
export default {
  name: "Register",
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
    register() {
      let user = [
        {
          name: this.userName,
          password: this.password,
          nickname: this.userName
        }
      ];
      //若原来有就拼接(重复校验)  若无则创建一个
      let userList = $storage.getLocal("user");
      let toast = "";
      if (userList) {
        //判断是否存在重复的用户名
        var ifSame = userList.some(item => {
          return item.name == this.userName;
        });
        if (ifSame == true) {
          toast = this.$createToast({
            time: 1500,
            type: "warn",
            txt: "已存在重复的用户名"
          });
          toast.show();
          return;
        }
        $storage.addLocal("user", user);
      } else {
        $storage.setLocal("user", user);
      }
      toast = this.$createToast({
        time: 1500,
        type: "correct",
        txt: "注册成功！即将为您跳转到登录页……"
      });
      toast.show();
      setTimeout(_ => {
        this.$router.go(-1);
      },2000);
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
      outline: none;
    }

    .btn_submit[disabled] {
      opacity: 0.5;
    }
  }
}
</style>

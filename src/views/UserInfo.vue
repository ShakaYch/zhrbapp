<template>
  <div class="unserinfo_page">
    <!-- 导航条 -->
    <div class="nav">
      <div class="btn_back" @click="back">
        <i class="iconfont icon-icon_left"></i>
      </div>
      <div class="title">个人主页</div>
      <div class="btn_revise">
        <i class="iconfont icon-icon-revise" v-show="readonly" @click="revise"></i>
        <i class="iconfont icon-icon-ok" v-show="!readonly" @click="ok"></i>
      </div>
    </div>
    <!-- 页面部分 -->
    <div class="content">
      <div class="img_zone">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572520399657&di=f67818e70258652f3746945765b4910d&imgtype=0&src=http%3A%2F%2Fimg.yzcdn.cn%2Fupload_files%2F2018%2F07%2F16%2FFun-GamDs57P5o7Ndl4JbU7Zy5hU.jpg"
          alt
        />
      </div>
      <div class="nickname_zone">
        <input
          ref="nickname"
          type="text"
          :readonly="readonly"
          v-model="inputValue"
          :class="{'revise':!readonly}"
        />
      </div>
      <!-- <div class="select_zone"></div> -->
      <div class="btn_zone">
        <button class="btn_logout" @click="logout">登出</button>
      </div>
    </div>
  </div>
</template>

<script>
import $storage from "@/utils/Storage.js";
export default {
  name: "UserInfo",
  props: {
    msg: String
  },
  data() {
    return {
      readonly: true,
      inputValue: ""
    };
  },
  created() {
    this.inputValue = this.$store.getters.getNickName;
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    revise() {
      this.readonly = false;
      this.$refs.nickname.focus();
    },
    ok() {
      this.readonly = true;
      //改写vuex里的昵称
      this.$store.dispatch("changeUserInfoFunc", this.inputValue);
      var userObj = $storage.getSession("user"),
        userList = $storage.getLocal("user");
      userObj.nickname = this.inputValue;

      userList.forEach(item => {
        if (item.name == userObj.name) {
          item.nickname = this.inputValue;
        }
      });
      // 改写local列表与session中的用户信息
      $storage.setSession("user", userObj);
      $storage.setLocal("user", userList);
    },
    logout() {
      // 注销后清除session与vuex的用户数据和登录状态
      $storage.removeSession("user");
      this.$store.dispatch("logoutFunc");
      this.$router.replace("/index");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.unserinfo_page {
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

    .btn_revise {
      .iconfont {
        font-size: 18px;
      }
    }
  }

  .content {
    background-color: #fff;
    height: 92vh;
    padding: 20px;
    margin: 0;

    .img_zone {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0px auto 20px auto;

      img {
        width: 100%;
        margin: 0;
      }
    }

    .nickname_zone {
      input {
        color: #95A5A6;
        outline: none;
        border-bottom: 1px solid #95A5A6;
        line-height: 30px;
        margin-bottom: 30px;
        font-size: 16px;
        text-align: center;
      }

      .revise {
        border-bottom: 1px solid #555;
        color: #555;
      }
    }

    .select_zone {
      margin-bottom: 30px;
    }

    .btn_zone {
      .btn_logout {
        color: #e74c3c;
        font-size: 16px;
        padding: 8px 25px;
        background-color: #ffffff;
        border: 1px solid #95A5A6;
        border-radius: 8px;
        outline: none;
        font-weight: bold;
      }
    }
  }
}
</style>

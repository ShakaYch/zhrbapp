<template>
  <li class="comment_item">
    <div class="user_info">
      <div class="img_zone">
        <img :src="item.avatar" alt />
      </div>
      <span class="user_name">{{item.author}}</span>
      <span class="btn_more" @click="$refs.tip.show()">
        <i class="iconfont icon-icon_more"></i>
      </span>
      <cube-tip ref="tip" class="copy_tips" direction="bottom">
        <span @click="copy" class="btn_copy" :data-clipboard-text="copyText">复制</span>
      </cube-tip>
    </div>
    <div class="comments">
      <p class="self" id="copy">{{item.content}}</p>
      <p
        :class="hide ?'reply_to text_overflow':'reply_to'"
        v-if="item.reply_to"
      >// {{item.reply_to.author}}：{{item.reply_to.content}}</p>
    </div>
    <div class="bottom_zone">
      <div class="time">{{item.time|dateTime(item.time)}}</div>
      <div :class="showBtn?'btn_show':'btn_show hide'" @click="showToggle">{{msg}}</div>
      <div class="btn_group">
        <div class="btn_item">
          {{item.likes}}
          <i class="iconfont icon-icon_likegood"></i>
        </div>
        <div class="btn_item">
          <i class="iconfont icon-icon_community_line"></i>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import Clipboard from "clipboard";
export default {
  name: "CommentItem",
  props: ["item"],
  data() {
    return {
      hide: false,
      showBtn: false,
      copyText: "",
      msg: "显示全部"
    };
  },
  created() {
    if (this.item.reply_to) {
      if (this.item.reply_to.state == 0) {
        if (this.item.reply_to.content.length > 50) {
          this.hide = true;
          this.showBtn = true;
        }
      } else {
        this.item.reply_to.content = this.item.reply_to.error_msg;
      }
    }
  },
  mounted() {},
  methods: {
    showToggle() {
      this.hide = !this.hide;
      this.msg = this.msg == "显示全部" ? "收起" : "显示全部";
    },
    //复制
    copy() {
      this.copyText = this.item.content;
      var clipboard = new Clipboard(".btn_copy");
      clipboard.on("success", e => {
        const toast = this.$createToast({
          txt: "复制成功",
          type: "correct"
        });
        toast.show()
        // 释放内存
        clipboard.destroy();
        e.clearSelection();
      });
      clipboard.on("error", e => {
          const toast = this.$createToast({
          txt: "复制失败",
          type: "error"
        });
        toast.show()
      });
    }
  },
  filters: {
    dateTime: function(data) {
      let time = new Date(data * 1000),
        y = time.getFullYear(),
        m = time.getMonth(),
        d = time.getDate(),
        hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours(),
        min =
          time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
      let now = new Date(),
        nowy = now.getFullYear(),
        nowm = now.getMonth(),
        nowd = now.getDate();
      let currentTime = "";
      if (y == nowy && m == nowm && d == nowd) {
        currentTime = "今天" + "  " + hour + ":" + min;
      } else {
        currentTime = y + "-" + m + "-" + d + "  " + hour + ":" + min;
      }
      return currentTime;
    }
  }
};
</script>
<style lang="stylus" scoped>
.comment_item {
  text-align: left;
  padding: 0px 15px;
  border-bottom: 1px solid #ecf0f1;

  .user_info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 10px;
    position: relative;

    .copy_tips {
      top: -35px;
      right: -10px;
    }

    .img_zone {
      overflow: hidden;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;

      img {
        margin: 0;
        width: 100%;
      }
    }

    .user_name {
      font-weight: bold;
      font-size: 14px;
      flex: 1;
    }

    .btn_more {
      padding: 5px;
      margin-right: 10px;
    }
  }

  .comments {
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 20px;

    .self {
      color: #555;
    }

    .reply_to {
      margin-top: 5px;
      color: #95A5A6;
    }

    .text_overflow {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .bottom_zone {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;

    .time {
      font-size: 12px;
      color: #95A5A6;
    }

    .hide {
      display: none;
    }

    .btn_show {
      font-size: 12px;
      flex: 1;
      text-align: left;
      margin-left: 10px;
      color: #95A5A6;
    }

    .btn_group {
      display: flex;
      font-size: 14px;

      .btn_item {
        margin-left: 10px;

        i {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
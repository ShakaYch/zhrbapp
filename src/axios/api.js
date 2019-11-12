import http from './httpRequest.js'
import $storage from "@/utils/Storage.js";

//首页接口
export const indexApi = {
    // 获取轮播图信息 + 今日新闻
    // date : 日期
    // stories : 当日新闻
    // title : 新闻标题
    // images : 图像地址（官方 API 使用数组形式。目前暂未有使用多张图片的情形出现，曾见无 images 属性的情况，请在使用中注意 ）
    // ga_prefix : 供 Google Analytics 使用
    // type : 作用未知
    // id : url 与 share_url 中最后的数字（应为内容的 id）
    // multipic : 消息是否包含多张图片（仅出现在包含多图的新闻中）
    // top_stories : 界面顶部 ViewPager 滚动显示的显示内容（子项格式同上）（请注意区分此处的 image 属性与 stories 中的 images 属性）
    getIndexData(data) {
        return http({
            url: '/news/latest',
            method: 'get',
            data
        })
    },
    // 获取列表历史信息
    // 若果需要查询 11 月 18 日的消息，before 后的数字应为 20131119
    // 知乎日报的生日为 2013 年 5 月 19 日，若 before 后数字小于 20130520 ，只会接收到空消息
    // 输入的今日之后的日期仍然获得今日内容，但是格式不同于最新消息的 JSON 格式
    getListData(params) {
        return http({
            url: '/news/before/' + params,
            method: 'get'
        })
    }
}

//详情页接口
export const detailApi = {
    // 获取详情页数据
    // body : HTML 格式的新闻
    // image-source : 图片的内容提供方。为了避免被起诉非法使用图片，在显示图片时最好附上其版权信息。
    // title : 新闻标题
    // image : 获得的图片同 最新消息 获得的图片分辨率不同。这里获得的是在文章浏览界面中使用的大图。
    // share_url : 供在线查看内容与分享至 SNS 用的 URL
    // js : 供手机端的 WebView(UIWebView) 使用
    // recommenders : 这篇文章的推荐者
    // ga_prefix : 供 Google Analytics 使用
    // section : 栏目的信息
    // thumbnail : 栏目的缩略图
    // id : 该栏目的 id
    // name : 该栏目的名称
    // type : 新闻的类型
    // id : 新闻的 id
    // css : 供手机端的 WebView(UIWebView) 使用
    // 可知，知乎日报的文章浏览界面利用 WebView(UIWebView) 实现
    getDetail(params) {
        return http({
            url: '/news/' + params,
            method: 'get'
        })
    },
    // 新闻额外信息
    // 输入新闻的ID，获取对应新闻的额外信息，如评论数量，所获的『赞』的数量。
    // long_comments : 长评论总数
    // popularity : 点赞总数
    // short_comments : 短评论总数
    // comments : 评论总数
    getDetailAbout(params) {
        return http({
            url: '/story-extra/' + params,
            method: 'get'
        })
    },
    // 新闻对应长评论查看
    // comments : 长评论列表，形式为数组（请注意，其长度可能为 0）
    // author : 评论作者
    // content : 评论的内容
    // avatar : 用户头像图片的地址
    // id : 评论者的唯一标识符
    // likes : 评论所获『赞』的数量
    // time : 评论时间
    // reply_to : 所回复的消息
    // content : 原消息的内容
    // status : 消息状态，0为正常，非0为已被删除
    // id : 被回复者的唯一标识符
    // author : 被回复者
    // err_msg: 错误消息，仅当status非0时出现
    getComment(params) {
        return http({
            url: '/story/' + params + '/long-comments',
            method: 'get'
        })
    },
    getShortComment(params) {
        return http({
            url: '/story/' + params + '/short-comments',
            method: 'get'
        })
    },

}

export const userApi = {
    //操作收藏
    //若第一次收藏则增加一个localstorage
    changeCollect(id, type, userName) {
        let userList = $storage.getLocal("user");
        userList.forEach(item => {
            if (item.name == userName) {
                if (type == 0) {
                    //收藏
                    item.collections !== undefined ? item.collections.push(id) : item.collections = [id];
                } else {
                    //取消收藏
                    item.collections.splice(item.collections.findIndex(item => item === id), 1);
                }
            }
        });
        $storage.setLocal("user", userList)
    },
    //判断是否收藏
    checkIfCollected(id, userName) {
        let userList = $storage.getLocal("user");
        let flag = false;
        let userObj = userList.filter(item => {
            return item.name == userName
        });
        //如果没有收藏列表显示未收藏
        if (userObj[0].collections == undefined) {
            flag = false;
        } else {
            flag = userObj[0].collections.indexOf(id) >= 0 ? true : false;
        }
        return flag;
    },
    //获取收藏列表
    getCollectionList(userName) {
        let list = [];
        let userList = $storage.getLocal("user");
        let userObj = userList.filter(item => {
            return item.name == userName
        });
        if (userObj[0].collections !== undefined) {
            list = userObj[0].collections
        }
        return list;
    }
}
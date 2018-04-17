<template>
	<div class="home">
		<div class="m_layout">
            <!-- 头部区 -->
           <div class="home_h">
		     <header class="m_header">
                <div class="m_header_box" id="my_search">
                    <a href="#" class="icon_logo"></a>
                    <form action="#">
                        <span class="icon_search"></span>
                        <input type="search" class="search" placeholder="点击搜索" @click="goSearch($event)">
                    </form>
                    <router-link to="/login" class="logo_btn">登录</router-link>
                </div>
              </header>
	       </div>

            <!-- 轮播图-->
            <div class="home_ban">
		     <div class="m_banner clearfix" id="my_banner">
                <ul class="banner_box">
                    <!-- 图片 -->
                    <li><img src="../assets/images/l8.jpg" alt="" /></li>
                    <li><img src="../assets/images/l1.jpg" alt="" /></li>
                    <li><img src="../assets/images/l2.jpg" alt="" /></li>
                    <li><img src="../assets/images/l3.jpg" alt="" /></li>
                    <li><img src="../assets/images/l4.jpg" alt="" /></li>
                    <li><img src="../assets/images/l5.jpg" alt="" /></li>
                    <li><img src="../assets/images/l6.jpg" alt="" /></li>
                    <li><img src="../assets/images/l7.jpg" alt="" /></li>
                    <li><img src="../assets/images/l8.jpg" alt="" /></li>
                    <li><img src="../assets/images/l1.jpg" alt="" /></li>
                </ul>
                <!-- 小圆点 -->
                <ul class="point_box">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
              </div>
	        </div>

            <!--导航-->
            <div class="home_n">
		     <nav class="m_nav">
                <ul>
                    <li class="nav_item">
                        <a href="#" class="nav_item_link">
                            <img src="../assets/images/nav0.png" alt="">
                            <span>超市</span>
                        </a>
                    </li>
                    <li class="nav_item">
                        <a href="#" class="nav_item_link">
                            <img src="../assets/images/nav1.png" alt="">
                            <span>全球购</span>
                        </a>
                    </li>
                    <li class="nav_item">
                        <a href="#" class="nav_item_link">
                            <img src="../assets/images/nav2.png" alt="">
                            <span>服装城</span>
                        </a>
                    </li>
                    <li class="nav_item">
                        <a href="#" class="nav_item_link">
                            <img src="../assets/images/nav3.png" alt="">
                            <span>生鲜</span>
                        </a>
                    </li>
                    <li class="nav_item">
                        <a href="#" class="nav_item_link">
                            <img src="../assets/images/nav4.png" alt="">
                            <span>到家</span>
                        </a>
                    </li>
                    <li class="nav_item">
                        <a href="#" class="nav_item_link">
                            <img src="../assets/images/nav5.png" alt="">
                            <span>充值中心</span>
                        </a>
                    </li>
                    <li class="nav_item">
                        <a href="#" class="nav_item_link">
                            <img src="../assets/images/nav6.png" alt="">
                            <span>惠赚钱</span>
                        </a>
                    </li>
                    <li class="nav_item">
                        <a href="#" class="nav_item_link">
                            <img src="../assets/images/nav7.png" alt="">
                            <span>领券</span>
                        </a>
                    </li>
                    <li class="nav_item">
                        <a href="#" class="nav_item_link">
                            <img src="../assets/images/nav8.png" alt="">
                            <span>物流查询</span>
                        </a>
                    </li>
                    <li class="nav_item">
                        <a href="#" class="nav_item_link">
                            <img src="../assets/images/nav9.png" alt="">
                            <span>我的关注</span>
                        </a>
                    </li>
                </ul>
              </nav>
	        </div>

            <!--商品区-->
            <div class="home_m">
		      <main class="m_product">
                <section class="product_box">
                    <div class="product_top">
                        <a href="#" class="product_left">
                            <img src="../assets/images/jd_skill.png" alt="" class="miaosha_icon">
                            <strong class="dianshu">六点场</strong>
                            <span class="time">00:21:43</span>
                        </a>
                    </div>
                    <div class="product_content">
                        <ul>
                        
                            <li class="product_skill_item" v-for="(item,idx) in homeDatas" :key="idx">
                                <router-link :to="'/detail/'+item.product_id" class="product_skill_item_link">
                                    <img v-lazy="item.product_img_url" alt="" class="product_skill_item_cion lazy-img-fadein">
                                    <p class="nowprice">
                                        <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                                        <span class="now_price">{{item.product_price}}</span>
                                    </p>
                                    <p class="oldprice">
                                        <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                                        <del class="old_price">{{item.product_uprice}}</del>
                                    </p>
                                </router-link>
                            </li>
                        
                        </ul>
                    </div>
                </section>
                <div class="left_share_quality_content clearfix">
                    <div class="share_quality">
                        <div class="share_quality_top">
                            <div class="share_title">
                                <p class="share_text">为你推荐</p>
                            </div>
                        </div>
                        <div class="share_quality_left not_eng_box">
                            <ul>
                                <li class="not_eng_item" v-for="(item,idx) in mainDatas" :key="idx">
                                    <router-link  class="not_eng_link" :to="'/detail/'+item.product_id">
                                        <img v-lazy="item.product_img_url" alt="" class="not_eng_pic lazy-img-fadein">
                                        <div class="not_eng_info">
                                            <p class="not_eng_title">{{item.product_name}}</p>
                                            <p class="not_eng_text">
                                                <i style="text-decoration: none;font-style: normal;font-size: 12px">¥</i>
                                                <span class="more_info_price_txt">{{item.product_price}}</span>
                                            </p>
                                        </div>
                                    </router-link>
                                </li>
                        
                            </ul>
                        </div>
                    </div>
                </div>
              </main>
	        </div>
        </div>
	  </div>
</template>
 <script>
    export default {
       data () {
             return {
                homeDatas : [], //六点场
                mainDatas:[] // 主要的数据
            }
       },
       mounted () {
         this.bindEvent();
         
        this.$nextTick(function () {
           this.scrollPic();
        })

        this.getData();

       },
       methods: {
        //    获取商品数据
         getData(){
            let _this = this;
            _this.$http.get('/home').then((res)=>{
                _this.homeDatas.push(res.data[0]);
                _this.homeDatas.push(res.data[1]);
                _this.homeDatas.push(res.data[2]);
                _this.homeDatas.push(res.data[3]);
                _this.mainDatas = res.data;
            },(err)=>{
                console.log(err);
            })
         },
        //  跳转到搜索页面
        goSearch(event){
           this.$router.push('/search');
           window.event? window.event.returnValue = false : event.preventDefault();
        },
         // 根据滑动的高度改变搜索栏的颜色
         bindEvent () {
           var sea = document.getElementById("my_search").getElementsByClassName('search')[0];
           /*banner对象*/
           var banner = document.getElementById("my_banner"); 
           /*高度*/
           var height = banner.offsetTop;//获取元素距离顶部距离
           window.onscroll = function() {
               var top = document.documentElement.scrollTop; //获取超出隐藏的高度
               /*当滚动高度大于banner的高度时候颜色不变*/
               if (top > height) {
                   sea.style.backgroundColor = "rgba(119,136,153,0.5)";
               } else {
                   sea.style.backgroundColor = "#fff";
               }
           };
         },

            // 轮播图的实现
         scrollPic() {
           var imgBox = document.getElementsByClassName("banner_box")[0];
           var width =window.screen.width; //获取屏幕大小
           var pointBox = document.getElementsByClassName("point_box")[0];
           var ols = pointBox.children;
           var indexx = 1;
           var timer = null;
           var moveX = 0;
           var endX = 0;
           var startX = 0;
           var square = 0;

           function addTransition() {
               imgBox.style.transition = "all .3s ease 0s";
               imgBox.style.webkitTransition = "all .3s ease 0s";
           }

           function removeTransition() {
               imgBox.style.transition = "none";
               imgBox.style.webkitTransition = "none";
           }

           function setTransfrom(t) {
               imgBox.style.transform = 'translateX(' + t + 'px)';
               imgBox.style.webkitTransform = 'translateX(' + t + 'px)';
           }
           //3. 开始动画部分
           pointBox.children[0].className = "now";
           for (var i = 0; i < ols.length; i++) {
               ols[i].index = i; // 获得当前第几个小li 的索引号
               ols[i].onmouseover = function() {
                   for (var j = 0; j < ols.length; j++) {
                       ols[j].className = ""; // 所有的都要清空
                   }
                   this.className = "now";
                   setTransfrom(-indexx * width);
                   // 调用动画函数  第一个参数  谁动画     第二个  走多少
                   square = indexx; // 当前的索引号为主
               }
           }
           timer = setInterval(function() {
               indexx++;
               addTransition();
               setTransfrom(-indexx * width);
               // 小方块
               square++;
               if (square > ols.length - 1) {
                   square = 0;
               }
               for (var i = 0; i < ols.length; i++) // 先清除所有的
               {
                   ols[i].className = "";
               }
            //    console.log("最初", square);
               ols[square].className = "now"; // 留下当前的
           }, 3000);

           imgBox.addEventListener('transitionEnd', function() {
               if (indexx >= 9) {
                   indexx = 1;
               } else if (indexx <= 0) {
                   indexx = 8;
               }
               removeTransition();
               setTransfrom(-indexx * width);
           }, false);
           imgBox.addEventListener('webkitTransitionEnd', function() { 
               if (indexx >= 9) {
                   indexx = 1;
               } else if (indexx <= 0) {
                   indexx = 8;
               }

            removeTransition();
            setTransfrom(-indexx * width);
           }, false);
           //   触摸事件开始
          imgBox.addEventListener("touchstart", function(e) {
            console.log("开始");
            var event = e || window.event;
            //记录开始滑动的位置
            startX = event.touches[0].clientX;
          }, false);
          // 触摸滑动事件
          imgBox.addEventListener("touchmove", function(e) { 
            console.log("move");
            var event = e || window.event;
            event.preventDefault();

            //清除定时器
            clearInterval(timer);
            //记录结束位置
            endX = event.touches[0].clientX;
            //记录移动的位置
            moveX = startX - endX;
            removeTransition();
            setTransfrom(-indexx * width - moveX);
          }, false);
          //   触摸结束事件
    
          imgBox.addEventListener("touchend", function() {
           console.log("end");
           //如果移动的位置大于三分之一，并且是移动过的
           if (Math.abs(moveX) > (1 / 3 * width) && endX != 0) {
               //向左
               if (moveX > 0) {
                   indexx++;
               } else {
                   indexx--;
               }
               //改变位置
               setTransfrom(-indexx * width);
           }
           //回到原来的位置
           addTransition();
           setTransfrom(-indexx * width);
           //初始化
           startX = 0;
           endX = 0;

           clearInterval(timer);
           timer = setInterval(function() {
               indexx++;
               square++;
               if (square > ols.length - 1) {
                   square = 0;
               }
               for (var i = 0; i < ols.length; i++) // 先清除所有的
               {
                   ols[i].className = "";
               }
            //    console.log("最初", square);
               ols[square].className = "now"; // 留下当前的
               addTransition();
               setTransfrom(-indexx * width);

           }, 3000);
          }, false);
         }
       }
    }
</script>
<style>
/* 首页样式 */
body {
    background-color: #F3F3F3;
}

.m_layout {
    min-width: 300px;
    max-width: 640px;
    margin: 0 auto;
    position: relative;
    height: 1000px;
}

.m_header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 40px;
    z-index: 2;
}

.m_header .m_header_box {
    position: relative;
    min-width: 300px;
    max-width: 640px;
    height: 40px;
    margin: 0 auto;
    background: rgba(201, 21, 35, 0);
}

.m_header_box .icon_logo {
    width: 60px;
    height: 36px;
    position: absolute;
    top: 4px;
    left: 10px;
    background-position: 0 -103px;
    display: block;
}

.m_header_box form {
    width: 100%;
    height: 40px;
    padding-left: 75px;
    padding-right: 60px;
    position: relative;
}

.m_header_box form .search {
    width: 100%;
    height: 30px;
    border-radius: 15px;
    margin-top: 5px;
    padding-left: 30px;
}

.m_header_box form .icon_search {
    display: block;
    width: 37px;
    height: 40px;
    position: absolute;
    left: 85px;
    top: 10px;
    background-position: -60px -109px;
}

.m_header_box .logo_btn {
    display: block;
    width: 30px;
    height: 40px;
    position: absolute;
    right: 8px;
    top: 0;
    color: #fff;
    line-height: 40px;
    font-weight: 400;
}


/*轮播图*/

.m_banner {
    width: 100%;
    overflow: hidden;
    position: relative;
}

.m_banner ul:first-child {
    width: 1000%;
}

.m_banner ul:first-child li {
    width: 10%;
    float: left;
}

.m_banner ul:first-child li img {
    width: 100%;
    display: block;
}


/*点*/

.m_banner ul:last-child {
    width: 118px;
    height: 6px;
    position: absolute;
    left: 50%;
    margin-left: -59px;
    bottom: 10px;
}

.m_banner ul:last-child li {
    width: 6px;
    height: 6px;
    border: 1px solid #fff;
    border-radius: 3px;
    margin-left: 10px;
    float: left;
}

.m_banner ul:last-child li:first-child {
    margin-left: 0;
}

.m_banner ul:last-child li.now {
    background: #fff;
}


/*导航*/

.m_nav {
    max-width: 100%;
    height: 150px;
}

.m_nav ul {
    width: 100%;
    padding-top: 16px;
}

.m_nav .nav_item {
    width: 20%;
    height: 69px;
    float: left;
    text-align: center;
}

.nav_item .nav_item_link {
    width: 100%;
    height: 100%;
    display: block;
    text-align: center;
}

.nav_item .nav_item_link img {
    display: block;
    width: 30px;
    height: 30px;
    margin: 0 auto;
}

.nav_item .nav_item_link span {
    font-size: 12px;
}


/*商品区*/

.m_product {
    margin: 0 5px;
}


/*common use*/

.m_product .product_box {
    box-shadow: 0 0 1px 1px #e0e0e0;
}

.m_product .product_top {
    height: 32px;
    border-bottom: 1px solid #ccc;
}
.product_left{
    width: 60%;
    height: 32px;
    display: flex;
}

.product_left .miaosha_icon{
    height: 30px;
    width: 60px;
}

.product_left .dianshu{
    display: inline-block;
    height: 32px;
    line-height: 27px;
    margin-left: 8px;
}

.product_left .time{
    line-height: 27px;
    margin-left: 4px;
    color: #aaa;
}

.product_content{
    margin-top: 8px;

}
.product_content .product_skill_item{
    width: 25%;
    height: 130px;
    float: left;
    text-align: center;
    background-color: #fff;
}

.product_skill_item .product_skill_item_link{
    width: 25%;
    height: 130px;
    display: block;
}

.product_skill_item_link .product_skill_item_cion{
    width: 80px;
    height: 80px;
    display: block;
}

.product_skill_item_link .nowprice{
    width: 80px;
    text-align: center;
    color: #F11938;
    font-weight: 800;
    font-family: "微软雅黑";
    font-size: 16px;
}

.product_skill_item_link .oldprice{
    width: 80px;
    text-align: center;
    color: #aaa;
}
/*还没逛够*/
.not_eng_box{
    height: auto;

}
.left_share_quality_content{
    width: 100%;
}

.share_quality_left{
    width: 100%;
}
.not_eng_item{

    text-align: center;
    float: left;
    width: 50%;
    background-color: #fff;
    margin-bottom: 10px;
}

.not_eng_link{
    display: block;
    width: 100%;
    height: 100%;
    transition: all 0s;
}

.not_eng_pic{
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 5px  0 5px 5px;
}

.not_eng_info{
    text-align: left;
    margin-left: 10px;

}

.not_eng_title{
    overflow: hidden;
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical; 
    -webkit-line-clamp:2; 
    font-size: 14px;    
    height: 36px;
    color: #6F7474;
    font-weight: 500;
    font-family: "Microsoft YaHei";
}

.not_eng_text{
    width: 80px;
    color: #F11938;
    font-weight: 800;
    font-family: "微软雅黑";
    font-size: 16px;
}

</style>
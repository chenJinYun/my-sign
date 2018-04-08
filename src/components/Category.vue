<template>
	<div id="category">
    	<div id="caregoty_head">
		    <header class="top_bar">
	        <a onclick="window.history.go(-1)" class="icon_back"></a>
	        <form action="" class="goods_search">
	            <input type="search" class="goods_search_content" placeholder="搜索">
	        </form>
	        <a href="#" class="icon_menu"></a>
	      </header>
	    </div>

      	<main class="category_content">
				 <div id="cate_left">
					 <div class="category_left">
	            <ul class="childbox">
	                <li class="" v-for="(item,idx) in leftDatas" :key="idx">
	                	<router-link :to="'/catgory/'+item.category_id">
	                	{{item.category_name}}
	                	</router-link>
	                </li>
	               
	            </ul>
	        </div>
				</div>

					<div id="cate_right">
		        <div class="category_right">
	            <div class="category_banner">
	                <a href="#">
	                    <img src="../assets/images/banner_1.png" alt="">
	                </a>
	            </div>
	            <div class="category_detail">
	                <h3 class="category_n">Hot Category Goods</h3>
	                <ul>
	                    <li class="category_detail_item" v-for="(item,idx) in cateGoodsData" :key="idx">
	                        <router-link :to="'/detail/'+item.product_id"class="category_detail_item_link">
	                            <img v-lazy="item.product_img_url" alt="" class="category_detail_item_pic">
	                            <p class="category_detail_item_name">{{item.product_name}}</p>
	                        </router-link>
	                    </li>
	                
	                </ul>
	            </div>
	        </div>
      	</div>
	  </main>
	</div>
</template>
<script>
	export default {
    	data(){
	  	return{
				leftDatas:[],
				cateGoodsData:[]
	  	}
  	},
		mounted(){
      this.myMoveScroll();
      this.getLeftDatas();
	    this.fetchData(this.$route.params.id);
    },
    watch:{
			$route(to){
				var reg=/catgory\/\d+/;
				if(reg.test(to.path)){
					var categotyId=this.$route.params.id || 0;
					this.fetchData(categotyId);
				}
			}
		},
    methods: {
      myMoveScroll() {
            var childbox = document.getElementsByClassName("childbox")[0];
            var lis = childbox.children;
            var parentBox = document.getElementsByClassName("category_left")[0];
            var height = parentBox.offsetHeight;
            var topheight = document.getElementsByClassName("top_bar")[0].offsetHeight;
            //想要的
            var parentHeight = height - topheight;
            var childHeight = childbox.offsetHeight;
            var startY = 0;
            var endY = 0;
            var moveY = 0;
            var currentY = 0;
            //上下滑动距离的限制
            var upDownOffset = 150;
            var startTime = 0;
            var endTime = 0;
         
            function addTrans() {
              childbox.style.transition = "all.3s ease 0s";
              childbox.style.webkitTransition = "all.3s ease 0s";
           }
         
            function removeTrans() {
              childbox.style.transition = "none";
              childbox.style.webkitTransition = "none";
           }
         
            function setTransfrom(t) {
              childbox.style.transform = 'translateY(' + t + 'px)';
              childbox.style.webiktTransform = 'translateY(' + t + 'px)';
           }
         
           childbox.addEventListener("touchstart", function(e) {
               startTime = new Date().getTime();
               console.log("start");
               var event = e || window.event;
               startY = event.touches[0].clientY;
           }, false);
              
           childbox.addEventListener("touchmove", function(e) {
               console.log("move");
               var event = e || window.event;
               event.preventDefault();
               endY = event.touches[0].clientY;
               moveY = startY - endY;
               //上下滑动的范围
               if ((currentY - moveY) < upDownOffset && (currentY - moveY) > (parentHeight - childHeight - upDownOffset)) {
                   removeTrans();
                   setTransfrom(currentY - moveY);
                 }
            }, false);
         
            childbox.addEventListener("touchend", function(e) { 
                endTime = new Date().getTime();
                console.log("end");
                var event = e || window.event;
                //上面满足吸附的条件
                if ((currentY - moveY) >= 0) {
                    addTrans();
                    removeTrans();
                    setTransfrom(0);
                    currentY = 0;
                    //下面满足吸附的条件
                } else if ((currentY - moveY) <= (parentHeight - childHeight)) {
                    addTrans();
                    removeTrans();
                    setTransfrom(parentHeight - childHeight);
                    currentY = parentHeight - childHeight;
                } else {
                    currentY = currentY - moveY;
                }
                //就认为是点击
                if (endTime - startTime < 150 && moveY == 0) {

                    for (var i = 0; i < lis.length; i++) {
                        lis[i].className = "";
                        lis[i].index = i;
                    }
                    var li = e.target.parentNode;
                    li.className = "now";
                    /*
                    移动的距离
                     */
                    var translateY = li.index * 50;
                    if (translateY < childHeight - parentHeight) {
                        addTrans();
                        setTransfrom(-translateY);
                        currentY = -translateY;
                    } else {
                        addTrans();
                        setTransfrom(parentHeight - childHeight);
                        currentY = parentHeight - childHeight;
                    }

             }
            }, false);
      },
      getLeftDatas(){
	    		let _this = this;
	    		_this.$http.get('/category').then((res)=>{
	    			_this.leftDatas = res.data;
	    		},(err)=>{
	    			console.log(err);
	    		})
	    },

	  	fetchData(id){
				var _this=this;
				_this.$http.get('/categorygoods',{
					params: {
						mId: id
					}
				}).then((res)=>{
					_this.cateGoodsData = res.data;
				},(err)=>{
					console.log(err);
				})
		 	}
    }
  }
</script>

<style>
    body {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #fff;
    }

    .caregoty_head .top_bar {
      position: fixed;
    }

    .category_content {
      width: 100%;
      height: 100%;
      position: relative;
      padding-top: 45px;
    }

    .category_content .category_left {
      width: 90px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      padding-top: 45px;
      background-color: #fff;
    }

    /* .category_content .category_left ul {
    } */

    .category_content .category_left ul li {
      height: 50px;
      width: 90px;
      background: #f3f4f6;
      font-size: 12px;
      font-family: sans-serif;
    }

    .category_content .category_left ul li a {
      height: 50px;
      width: 90px;
      display: block;
      text-align: center;
      line-height: 50px;
      border-right: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
    }

    .category_content .category_left ul li.now {
      background: #fff;
    }

    .category_content .category_left ul li.now a {
      border-right: none;
      color: #f15353;
    }

    .category_content .category_right {
      width: 100%;
      height: 100%;
      padding-left: 90px;
      background-color: #fff;
    }

    .category_right .category_banner,
    .category_detail {
      padding: 10px 12px;
    }

    .category_right .category_banner a img {
      display: block;
      width: 100%;
    }

    .category_detail .category_detail_item {
      float: left;
      width: 33.333%;
      text-align: center;
    }

    .category_detail .category_n {
      color: #888;
      margin-bottom: 10px;
    }

    .category_detail_item_link .category_detail_item_pic {
      width: 62px;
      height: 62px;
      display: inline-block;
    }

    .category_detail_item_link .category_detail_item_name {
      line-height: 30px;
      height: 30px;
      overflow: hidden;
    }
</style>
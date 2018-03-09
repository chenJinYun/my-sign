  <template>
	<div id="my_cart">
		
        <div id="carttp">
			<header class="top_bar">
		    <a @click="$router.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">购物车</h3>
		    <a href="#" class="icon_menu"></a>
		</header>
		</div>


        	<main class="cart_box">
		    <div class="cart_tip clearfix" v-if="!useInfo">
		        <span>登录后可同步电脑与手机购物车中的商品</span>
		        <a href="/login" class="login">登录</a>
		    </div>
		    <div class="cart_content clearfix" v-for="(item,idx) in cartDatas" :key="idx">
		        <div class="cart_shop clearfix">
		            <div class="cart_check_box">
		                <input type="checkbox" class="check_box cc" name="chk" @click="check(idx)"/>
		            </div>
		            <div class="shop_info clearfix">
		                <img src="../assets/images/buy-logo.png" alt="" class="shop_icon">
		                <span class="shop_name">{{item.shop_name}}</span>
		            </div>
		            <div class="cart_free clearfix">
		                <span class="free_tip">优惠券></span>
		            </div>
		        </div>
		        <div class="cart_item">
		            <div class="cart_item_box">
		                <!-- <input type="checkbox" class="check_box cc" name="chk" /> -->
		            </div>
		            <div class="cart_detial_box clearfix">
		                <a href="#" class="cart_product_link">
		                    <img v-lazy="item.product_img_url" alt="">
		                </a>
		                <div class="item_names">
		                    <a href="#">
		                        <span>{{item.product_name}}</span>
		                    </a>
		                </div>
		                <div class="cart_weight">
		                    <i class="my_weigth">重量:0.45kg</i>
		                    <span class="my_color">颜色:AT800/16</span>
		                </div>
		                <div class="cart_product_sell">
		                    <span class="product_money">￥<strong class="real_money">{{item.product_uprice}}</strong></span>
		                    <div class="cart_add clearfix">
		                        <span class="my_add" @click="addGoods(idx)">+</span>
		                        <input type="tel" class="my_count" :value="item.goods_num" readonly>
		                        <span class="my_jian" @click="decreaseGoods(idx)">-</span>
		                    </div>
		                </div>
		                <div class="cart_del clearfix">
		                    <div class="del_top">
		                    </div>
		                    <div class="del_bottom" @click="deleteGoods(item)">
		                    </div>
		                </div>
		            </div>
		        </div>
		      
		    </div>

		</main>

        <div class="cart_fo">
		 <footer class="cart_footer">
		    <div class="all_check_box">
                <input type="checkbox" id="chkAll" class="check_box" @click="checkAll" />
		        <span>全选</span>
		    </div>
		    <div class="count_money_box">
		        <div class="heji">
		            <strong>合计:</strong>
		            <strong>￥</strong>
		            <strong>{{total}}</strong>
		        </div>
		        <div class="total_money clearfix">
		            <span>总额:</span>
		            <i>￥</i>
		            <span>{{total}}</span>
		            <span>立减:</span>
		            <i>￥</i>
		            <span>0.00</span>
		        </div>>
		            <span class="go_pay" @click="goPay()">
		                <span>去结算(1)</span>
		            </span>
		    </div>
		 </footer>
	    </div>


		<div class="pop" style="display: none">
		    <div class="pop_box">
		        <div class="del_info">
		            确定要删除该商品吗？
		        </div>
		        <div class="del_cancel">
		            取消
		        </div>
		        <div class="del_ok" @click="sureDelete">
		            确定
		        </div>
		    </div>
		</div>
	</div>
  </template>

<script>
 export default {
     data () {
         return  {
             cartDatas:[],
             goods: {},
             total: 0.00,
             userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
         }
     },
 	mounted(){
        this.animatDelBox();
        this.getCartDatas()
        this.$store.dispatch('hideNav')
    },
    computed: {
        'useInfo'() {
           return !!window.sessionStorage.userInfo
        }
    },
    methods: {      
     check(index) {
         var cartBoxs = document.getElementsByClassName('cc');
         let flag = false

         if (cartBoxs[index].checked) {
             cartBoxs[index].setAttribute('checked','checked')
         } else {
             cartBoxs[index].removeAttribute('checked','')
         }
        //  判断是否全选
        for (var i = 0; i < cartBoxs.length; i++) {
             if (!cartBoxs[i].checked) {
                 flag = true
                 break
             }
         }
        //  设置全选属性
         if (flag) {
             document.getElementById("chkAll").removeAttribute('checked','')
             } else {
              document.getElementById("chkAll").setAttribute('checked','checked')
         }
        //  计算总额
        this.total = 0
        for (var i = 0; i < cartBoxs.length; i++) {
             if (cartBoxs[i].checked) {
                 this.total +=  this.cartDatas[i].product_uprice * this.cartDatas[i].goods_num
             }
         }
       },
      animatDelBox() {
         var cart_del = document.getElementsByClassName("cart_del");
         var pop = document.getElementsByClassName("pop")[0];
         var pop_box = document.getElementsByClassName("pop_box")[0];
         var delUp = null;
         for (var i = 0; i < cart_del.length; i++) {
             cart_del[i].onclick = function() {
                 pop.style.display = "block";
                 pop_box.className = "pop_box delBoxOut";

                 this.children[0].style.transition = "all 1s ease 0s";
                 this.children[0].style.webkitTransition = "all 1s ease 0s";
                 this.children[0].style.transform = "translateY(-5px) translateX(-2px) rotate(-45deg)";
                 this.children[0].style.webkitTransform = "translateY(-5px) translateX(-2px) rotate(-45deg)";
                 delUp = this.children[0];
             };
         }
         document.getElementsByClassName("del_cancel")[0].onclick = function() {
             pop.style.display = "none";
             pop_box.className = "pop_box";
             if (delUp) {
                 delUp.style.transform = "translateY(0px) translateX(0px) rotate(0deg)";
                 delUp.style.webkitTransform = "translateY(0px) translateX(0px) rotate(0deg)";
             }

         };
         document.getElementsByClassName("del_ok")[0].onclick = function() {
             pop.style.display = "none";
             pop_box.className = "pop_box";
             if (delUp) {
                 delUp.style.transform = "translateY(0px) translateX(0px) rotate(0deg)";
                 delUp.style.webkitTransform = "translateY(0px) translateX(0px) rotate(0deg)";
             }
         };
      },
        // 获取购物车的数据
      getCartDatas(){ 
  	    	let _this = this;
  	    	this.userInfo && _this.$http.get('/cart', {params: {id: _this.userInfo.user_id}}).then((res)=>{
  	    		_this.cartDatas = res.data;
  	    	},(err)=>{
  	    		console.log(err);
  	    	})
      },
      deleteGoods (item) {
         document.getElementsByClassName('pop')[0].style.display = 'inline-block'
         this.$set(this.goods, 'data', item)
     },
     //   删除物品
     sureDelete() {
         let cart_id = this.goods.data.cart_id
         this.$http.post('/cart', {cart_id: cart_id, user_id: this.userInfo.user_id}).then(res => {
             this.cartDatas = res.data;
         })
     },
      // 对购物车的增加 
      addGoods (index) {
        this.cartDatas[index].goods_num = this.cartDatas[index].goods_num + 1
      },
     // 对购物车减少操作
     decreaseGoods(index) {
        this.cartDatas[index].goods_num = this.cartDatas[index].goods_num > 1 ? this.cartDatas[index].goods_num - 1 : this.cartDatas[index].goods_num
      },
     // 全选
     checkAll(){
      // 全选计算总额
      this.total = 0
      document.getElementById("chkAll").checked && this.cartDatas.map(item => {
          this.total += item.product_uprice * item.goods_num
      })
      document.getElementById("chkAll").checked ? document.getElementById("chkAll").setAttribute('checked','checked') : document.getElementById("chkAll").removeAttribute('checked','') 
      let t=document.getElementsByClassName('cc');
      for(var i=0;i<t.length;i++){
        document.getElementById("chkAll").checked ? t[i].setAttribute('checked','checked') : t[i].removeAttribute('checked', '')
       }
       this.count = false
      },
      // 结算之前没有登录需要跳转到登录页面
      goPay () {
       if (this.userInfo) {
           alert(`本次购物的总价钱是${this.total}`)
       } else {
           this.$router.push('/login')        
       }
      }
    }
 }
</script>
<style>
body {
    background-color: #F0F2F5;
}

#carttp .top_bar {
    position: static;
}

.cart_box {
    width: 100%;
}

.cart_box .cart_tip {
    width: 100%;
    height: 42px;
    border-bottom: 1px solid #bfbfbf;
    line-height: 42px;
    text-align: center;
    color: #aaa;
}

.login {
    color: #fff;
    display: inline-block;
    background: #f15353;
    border-radius: inherit;
    padding: 4px 12px;
    line-height: 1.2em;
    color: #fff;
}

.cart_content {
    background-color: #fff;
    margin: 10px 8px 0px 8px;
    overflow: hidden;
}

.cart_content .cart_shop {
    height: 44px;
    width: 100%;
}


/*the common checkbox*/

.check_box {
    display: block;
    width: 20px;
    height: 20px;
    background: url("../assets/images/shop-icon.png") no-repeat;
    background-size: 50px 100px;
    background-position: 0 0;
    position: absolute;
    left: 6px;
    top: 12px;
}

.check_box[checked] {
    background-position: -25px 0;
}

.cart_check_box {
    width: 40px;
    height: 40px;
    position: absolute;
}

.shop_info {
    width: 100px;
    float: left;
    height: 44px;
    line-height: 44px;
    margin-left: 32px;
}

.shop_info .shop_icon {
    width: 16px;
    height: 13px;
    display: inline-block;
}

.cart_free {
    height: 44px;
    float: right;
    line-height: 44px;
    text-align: center;
    color: #F23C30;
    padding-right: 4px;
}

.cart_item {
    background-color: #fff;
    height: 130px;
    position: relative;
    border-bottom: 2px solid #ccc;
    width: 100%;
}

.cart_item .cart_item_box {
    position: relative;
    width: 40px;
    float: left;
    background-color: #fff;
}

.cart_item_box .check_box {
    position: absolute;
    top: 31px;
    left: 6px;
}

.cart_item .cart_detial_box {
    float: left;
    background-color: #fff;
    margin-left: 30px;
    width: 100%;
}

.cart_detial_box .cart_product_link {
    width: 100px;
    height: 100px;
    display: block;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 10px;
    float: left;
    background-color: #fff;
    margin-right: 10px;
}

.cart_detial_box .cart_product_link img {
    width: 100%;
    height: 100%;
    display: block;
}

.cart_detial_box .item_names {
    height: 34px;
    overflow: hidden;
}

.cart_detial_box .cart_weight {
    margin-top: 2px;
    color: #BCCCCA;
    font-size: 12px;
    margin-bottom: 10px;
    line-height: 16px;
}

.cart_detial_box .cart_weight .my_weigth {
    font-style: normal;
}

.cart_detial_box .cart_product_sell {
    width: 100%;
}

.cart_detial_box .cart_product_sell .product_money {
    font-size: 12px;
    color: #F23030;
}

.real_money {
    font-size: 16px;
}

.cart_product_sell .cart_add {
    width: 100px;
    height: 26px;
    float: right;
    margin-right: 20px;
}

.cart_product_sell .cart_add .my_add,
.cart_product_sell .cart_add .my_jian {
    /* display: inline-block; */
    width: 25px;
    height: 24px;
    border: 1px solid #CBCBCB;
    text-align: center;
    float: left;
}

.cart_product_sell .cart_add .my_add {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.cart_product_sell .cart_add .my_jian {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

.cart_product_sell .cart_add .my_count {
    height: 24px;
    width: 30px;
    border-top: 1px solid #CBCBCB;
    border-bottom: 1px solid #CBCBCB;
    text-align: center;
    float: left;
}

.cart_detial_box .cart_del {
    position: absolute;
    right: 11px;
    top: 98px;
}

.cart_del .del_top {
    width: 20px;
    height: 5px;
    background: url("../assets/images/delete_up.png") no-repeat;
    background-size: 20px 5px;
    margin-left: -1px;
}

.cart_del .del_bottom {
    width: 18px;
    height: 18px;
    background: url("../assets/images/delete_down.png") no-repeat;
    background-size: 18px 18px;
    margin-top: -3px;
}

.cart_footer {
    width: 100%;
    height: 50px;
    border-top: 1px solid #cccccc;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
}

.cart_footer .all_check_box {
    width: 80px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
}

.cart_footer .all_check_box .check_box {
    top: 15px;
    left: 14px;
}

.cart_footer .all_check_box span {
    text-align: center;
    line-height: 50px;
    margin-left: 36px;
    color: #232326;
    font-weight: 600;
}

.cart_footer .count_money_box {
    float: left;
    height: 50px;
    margin-left: 80px;
}

.count_money_box .heji {
    margin-top: 6px;
}

.count_money_box .total_money {
    color: #aaa;
    font-size: 12px;
}

.count_money_box .total_money i {
    font-style: normal;
    text-decoration: none;
}

.count_money_box .go_pay {
    position: absolute;
    right: 0;
    top: 0;
    max-width: 98px;
    line-height: 50px;
    text-align: center;
    background: #f23030;
    color: #fff;
    font-size: 16px;
    height: 49px;
    margin-top: 1px;
    padding: 0 16px;
}

.pop {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
    padding: 0 5%;
}

.pop .pop_box {
    width: 85%;
    height: 140px;
    background-color: #fff;
    border-radius: 8px;
    margin: 50% auto;
    padding: 0 5%;
}

.pop_box .del_info {
    text-align: center;
    line-height: 70px;
    font-size: 16px;
    color: #888888;
}

.pop_box .del_cancel {
    float: left;
    width: 35%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
    margin-right: 15%;
}

.pop_box .del_ok {
    float: left;
    width: 35%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
    background: #D8505C;
    color: #fff;
    margin-left: 15%;
}

@keyframes delBoxOut {
    0% {
        opacity: 0;
        transform: translateY(-2000px);
        -webkit-transform: translateY(-2000px);
    }
    60% {
        opacity: 1;
        transform: translateY(30px);
        -webkit-transform: translateY(30px);
    }
    75% {
        transform: translateY(-10px);
        -webkit-transform: translateY(-10px);
    }
    90% {
        transform: translateY(5px);
        -webkit-transform: translateY(5px);
    }
    100% {
        opacity: 1;
        transform: none;
        -webkit-transform: none;
    }
}

.delBoxOut {
    animation: delBoxOut 1s ease;
}

</style>

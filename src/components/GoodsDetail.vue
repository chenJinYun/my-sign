  <template>
	<div class="goods_detail">
		<header class="top_bar">
            <a onclick="window.history.go(-1)" class="icon_back"></a>
            <h3 class="cartname">商品详情</h3>
            <a href="#" class="icon_menu"></a>
        </header>
        <main class="detail_box">
            <section class="banner_box">
                <ul class="banner_child_box">
                    <span class="left" @click="redIndex()"><</span>
                    <li class="banner_item" v-for="(item,idx) in goodsImages" :key="idx">
                        <img v-lazy="item.image_url" alt="" class="banner_pic">
                    </li>
                    <span class="right" @click="addIndex()">></span>
                </ul>
                <div class="banner_count">
                        <em id="slide-nub" class="fz18">{{index}}</em>
                        <em class="nub-bg">/</em>
                        <em id="slide-sum" class="fz12">{{goodsImages.length}}</em>
                </div>

            </section>
            <section class="product_info clearfix">
                <div class="product_left">
                    <p class="p_name">{{goodsData[0].product_name}}</p>
                    <div class="product_pric">
                        <span>￥</span>  
                        <span class="rel_price">{{goodsData[0].product_price}}</span>
                        <span>.00</span>
                    </div>
                    <div class="product_right">
                        降价通知
                    </div>
                </div>

            </section>
            <section class="product_intro">
                <p class="pro_det">
                    {{goodsData[0].product_detail}}
                </p>
           </section>
          
        </main>
        <footer class="cart_d_footer">
            <div class="m">
                <ul class="m_box">
                    <li class="m_item">
                        <a href="javascript();" class="m_item_link">
                            <em class="m_item_pic"></em>
                            <span class="m_item_name">卖家</span>
                        </a>
                        <a href="javascript();" class="m_item_link">
                            <em class="m_item_pic two"></em>
                            <span class="m_item_name">关注</span>
                        </a>
                        <a href="/cart" class="m_item_link">
                            <em class="m_item_pic three"></em>
                            <span class="m_item_name">购物车</span>
                        </a>
                    </li>
                </ul>
                <div class="btn_box clearfix" >
                    <a href="#" class="buy_now" @click="addToCart">加入购物车</a>
                    <a href="#" class="buybuy" @click="buy">立即购买</a>
                </div>
            </div>
        </footer>
	</div>
  </template>

<script>
   export default {
       
        data(){
            return {
                cateGoodsAllData:[],
                goodsImages:[],
                goodsData:[],
                useInfo: JSON.parse(sessionStorage.getItem('userInfo')),
                // 保存当前图片索引
                index:1
            }
        },
         created(){
            this.fetchData(this.$route.params.id);
            this.$store.dispatch('hideNav')
        },
        watch:{
            $route(to){
                var reg=/detail\/\d+/;
                if(reg.test(to.path)){
                    var categotyId=this.$route.params.id || 0;
                    this.fetchData(categotyId);
                }
            }
        },
        methods:{
            // 获取商品数据
            fetchData(id){
                var _this=this;
                _this.$http.get('/detail',{
                    params: {mId: id}
                }).then((res)=>{
                    _this.goodsImages = res.data[0];
                    _this.goodsData = res.data[1];
                },(err)=>{
                    console.log(err);
                })
            },
            // 加入购物车
            addToCart () {
                if (!this.useInfo) {
                    alert('请先登录！')
                }
                this.useInfo && this.$http.post('/addCart', {
                    cart_id: null,
                    user_id:this.useInfo.user_id,
                    product_id: this.goodsData[0].product_id,
                    goods_num: 1,
                    created: new Date().getTime()
                })
                .then(res => {
                    console.log(res)
                    if (res.data) {
                        alert('添加成功！')
                    }
                })
            },
            // 购买
            buy () {
                alert(`总价格为：${this.goodsData[0].product_price}`)
            },
            // 图片滑动
            redIndex () {
                let lis = document.getElementsByClassName('banner_item')
                console.log(lis)
                if (this.index === 1) {
                    this.index = this.goodsImages.length
                    for(let i = 0 ; i<this.goodsImages.length; i++) {
                        lis[i].style.zIndex = 0
                    }
                    lis[this.index - 1].style.zIndex = 10
                } else {
                    this.index = this.index - 1
                    for(let i = 0 ; i<this.goodsImages.length; i++) {
                        lis[i].style.zIndex = 0
                    }
                    lis[this.index - 1].style.zIndex = 10
                }
            },
            addIndex () {
                let lis = document.getElementsByClassName('banner_item')                
                if (this.index === this.goodsImages.length){
                    this.index = 1
                     for(let i = 0 ; i<this.goodsImages.length; i++) {
                        lis[i].style.zIndex = 0
                    }
                    lis[this.index - 1].style.zIndex = 10
                } else {
                     this.index = this.index + 1
                    for(let i = 0 ; i<this.goodsImages.length; i++) {
                        lis[i].style.zIndex = 0
                    }
                    lis[this.index - 1].style.zIndex = 10
                }
            }
        }
    }
</script>
<style>
body {
    background-color: #F0F2F5;
}

.detail_box {
    width: 100%;
    height: 100%;
}

.detail_box .banner_box {
    width: 100%;
    height: 50%;
    position: relative;
    overflow: hidden;
}

.banner_box .banner_child_box {
    width: 100%;
    height: 375px;
    position: relative;
    left: 0;
    top: 47px;
    margin-bottom: 50px;
}

.banner_box .banner_item {
    position: absolute;
    left:0;
    right:0;
    display: block;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    background-size: 100% 100%;
    background-color: #fff;
    transition: all 0ms ease;
    height: 375px;
    width: 417px;
    transform: translate3d(0px, 0px, 0px);
}
.banner_box .banner_item:nth-of-type(1) {
    z-index: 10;

}

.banner_box .banner_item .banner_pic {
    max-width: 100%;
    /* max-height: 100%; */
    display: inline-block;
    overflow: hidden
}

.banner_box .banner_count {
    font-size: 16px;
    z-index: 11;
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    background: rgba(0, 0, 0, 0.15);
    right: 14px;
    bottom: 14px;
    text-align: center;
    line-height: 40px;
    overflow: hidden;
}

.banner_count em {
    font-style: normal;
    color: #fff;
}

.banner_count .fz18 {
    font-size: 14px;
    display: inline-block;
    color: #fff;
    margin-right: -3px;
}

.banner_count .fz12 {
    font-size: 12px;
    display: inline-block;
    color: #fff;
    margin-left: -3px;
}

.banner_count .nub-bg {
    display: inline-block;
    color: #fff;
    font-size: 12px;
}

.product_info {
    width: 100%;
    height: 100px;
    background-color: #fff;
}

.product_info .product_left {
    width: 100%;
    float: left;
    height: 100%;
    padding-left: 10px;
    position: relative;
}

.product_left .p_name {
    width: 100%;
    color: #48484B;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
}

.product_left .product_pric {
    margin-top: 10px;
    position: absolute;
    left: 6px;
    bottom: 8px;
}

.product_pric span {
    color: #F23434;
}

.product_pric span:nth-child(1) {
    font-size: 16px;
}

.product_pric span:nth-child(2) {
    font-size: 20px;
    font-weight: 600;
    margin: 0 -3px;
}

.product_info .product_right {
    float: right;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
    text-align: center;
    line-height: 14px;
    padding: 10px 14px;
    position: absolute;
    right: 10px;
    bottom: 6px;
}

.product_intro {
    width: 100%;
    margin-top: 10px;
    height: auto;
    background-color: #fff;
    padding: 10px 0 10px 6px;
}

.product_intro .pro_det {
    font-size: 16px;
    font-weight: 500;
    color: #48484B;
    line-height: 20px;
}

.cart_d_footer {
    width: 100%;
    height: 60px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid #BFBFBF;
    border-bottom: 1px solid #BFBFBF;
}

.cart_d_footer .m {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.m .m_box {
    width: 50%;
}

.m .m_item {
    display: inline-flex;
    height: 100%;
    padding: 6px 0;
    text-align: center;
    width: 100%;
}

.m_item .m_item_link {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
}

.m_item_link .m_item_pic {
    display: block;
    width: 21px;
    height: 23px;
    background: url("../assets/images/cart_sprits_all.png") no-repeat top center;
    background-size: 100px 100px;
    margin: 6px auto 0;
}

.m_item_link .m_item_pic {
    background-position: -26px 0;
}

.m_item_link .two {
    background-position: -52px 0;
}

.m_item_link .three {
    background-position: 0 -20px;
}

.m .btn_box {
    width: 50%;
    height: 100%;
    float: right;
}

.btn_box a {
    display: inline-block;
    width: 50%;
    height: 60px;
    text-align: center;
    color: #fff;
    line-height: 60px;
}

.btn_box .buy_now {
    float: left;
    background-color: #FFB03F;
}

.btn_box .buybuy {
    float: right;
    background-color: #F23030;
}
.left{
    z-index:100;
    display: inline-block;
    width:50px;
    height:20px;
    position: absolute;
    left:-5px;
    top: 132px;
    font-size: 40px;
    color:#3e201e
}
.right{
    z-index:100;
    display: inline-block;
    width:50px;
    height:20px;
    position: absolute;
    left: 90%;
    top: 132px;
    font-size: 40px;
    color:#3e201e
}
.rocket {
    display: inline-block;
    width: 50px;
    height:20px
}

</style>
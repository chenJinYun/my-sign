<template>
	
		<main class="category_content">
	       <CategoryLeftView></CategoryLeftView>
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
	methods:{
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
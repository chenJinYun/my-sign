<template>
	<div class="my_l">
		<header class="top_bar">
		    <a @click="$router.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">登录</h3>
		</header>
		<main class="user_login_box">
		    <div class="login_dialog">
		        <div class="_username">
		            <input type="text" name="username" placeholder="请输入用户名" class="user_input" v-model="username"/>
		        </div>
		        <div class="_username u_passwd">
		            <input type="password" name="password" placeholder="请输入密码" class="user_input" v-model="password"/>
		        </div>

		        <div class="login_box">
		            <a @click="goLogin()" class="btn_login">登录</a>
		        </div>
		        <div class="go_reg_box">
		            <router-link tag="span" to="/register">快速注册</router-link>
		        </div>
		    </div>
		</main>
	    <show :message='this.message' v-if="this.isShow"></show>

	</div>
</template>
<script>
import show from './show.vue'

	export default {
	   components : {
		  show
		},
		data(){
			return{
				username:'',
				password:'',
				userInfo:{},
				isShow: false,
				message: ''
			}
		},
		mounted () {
		   this.$store.dispatch('hideNav')
		},
		methods:{
			goLogin(){
				let _this = this;
				if(_this.username ==''){
					this.message = '请输入用户名!'
					this.isShow = true
					let setTime = setTimeout(function () {_this.isShow = false},3000)
				}else if(_this.password == ''){
						this.message = '请输入密码!'
						this.isShow = true
					    let setTime = setTimeout(function () {_this.isShow = false},3000)
				}else{
					_this.$http.post('/login',{
						loginName:_this.username,
						loginPawd:_this.password,
					}).then((res)=>{
						console.log(_this.password);
					if(res.status == 200){
						_this.userInfo = res.data;
						if(_this.userInfo.status == 1){
							this.message = '登录成功!'
						     this.isShow = true
				        	let setTime = setTimeout(function () {_this.isShow = false},3000)
							window.sessionStorage.userInfo = JSON.stringify(_this.userInfo); //转换成json字符串
							_this.$store.dispatch('setUserInfo', _this.userInfo);
                        let redirect = decodeURIComponent(_this.$route.query.redirect || '/'); // 对url进行编码的解码函数
                        _this.$router.push({
                            path: redirect
                        });
						}else{
							this.message = _this.userInfo.msg
						     this.isShow = true
				        	let setTime = setTimeout(function () {_this.isShow = false},3000)
						}
					}else{
						this.message = '请求出现错误'
						     this.isShow = true
				        	let setTime = setTimeout(function () {_this.isShow = false},3000)
					}
					},(err)=>{
						console.log(err);
					});
				}
				
			}
		}
	}
</script>
<style>
body{
    background-color: #F3F5F7;
}

.user_login_box{
    max-width: 640px;
    min-width: 300px;
    margin: 0 auto;
    height: 200px;
    padding-top: 40px;
}

.user_login_box .login_dialog{
    width: 100%;
    height: 100%;
    padding: 10px;

}

.login_dialog ._username{
    height: 50px;
    width: 100%;
    background-color: #fff;
    margin-top: 20px;
    border: 1px solid #bebebe;
    border-radius: 2px;
}

._username .user_input{
    width: 100%;
    height: 100%;
    font-size: 16px;
    padding-left: 6px;
}
.login_dialog .u_passwd{
    margin-top: 10px;
}

.login_dialog .login_box{
    height: 50px;
    width: 100%;
    background-color: #fff;
    border: 1px solid #F23030;
    border-radius: 4px;
    margin-top: 30px;
}

.login_box a{
    display: block;
    width: 100%;
    height: 100%;
    line-height: 50px;
    text-align: center;
    color: #F23030;
}

.go_reg_box{
    float: right;
}
.go_reg_box span{
    display: inline-block;
    color: #aaa;
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
}
</style>
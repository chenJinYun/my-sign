<template>
	<div class="m_r">
		<header class="top_bar">
		    <a onclick="window.history.go(-1)" class="icon_back"></a>
		    <h3 class="cartname">注册</h3>
		</header>
		<main class="user_login_box">
		    <div class="login_dialog">
		        <div class="_username">
		            <input type="text" name="regname" placeholder="用户名/邮箱/手机号" class="user_input" v-model="regname">
		        </div>
		        <div class="_username u_passwd">
		            <input type="password" name="regpasswd" placeholder="请输入密码" class="user_input" v-model="regpasswd">
		        </div>
		        <div class="_username u_passwd">
		            <input type="password" name="regpasswd_ag" placeholder="请再次输入密码" class="user_input" v-model="regpasswd_ag">
		        </div>
		        <div class="login_box">
		            <a @click="goSearch()" class="btn_login">注册</a>
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
				regname:'',
				regpasswd:'',
				regpasswd_ag:'',
				regInfo:{},
				isShow: false,
				message: ''
			}
		},
		mounted () {
		   this.$store.dispatch('hideNav')
		},
		methods:{
			goSearch(){
				let _this = this;
				if(_this.regname ==''){
					this.message = '请输入用户名!'
					this.isShow = true
					let setTime = setTimeout(function () {_this.isShow = false},3000)

				}else if(_this.regpasswd == '' || _this.regpasswd_ag == ''){
					this.message = '请输入密码!'
						this.isShow = true
					let setTime = setTimeout(function () {_this.isShow = false},3000)
				}else if(_this.regpasswd!==_this.regpasswd_ag){
					this.message = '两次输入的密码不一致!'
						this.isShow = true
					let setTime = setTimeout(function () {_this.isShow = false},3000)
				}else{
					_this.$http.post('/reg',{
						regName:_this.regname,
						regPasswd:_this.regpasswd
				}).then((res)=>{
					if(res.status == 200){
						_this.regInfo = res.data;
						if(_this.regInfo.status == 1){
							//reg success, go to this login page
								this.message = '注册成功！'
								this.isShow = true
					let setTime = setTimeout(function () {_this.isShow = false},3000)
							this.$router.go(-1)
						}else{
							this.message = '注册失败！'
								this.isShow = true
					let setTime = setTimeout(function () {_this.isShow = false},3000)
						}
					}else{
						this.message = '出现错误！'
							this.isShow = true
					let setTime = setTimeout(function () {_this.isShow = false},3000)
					}
					console.log(res);
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
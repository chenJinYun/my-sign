<template>
  	<div class="pop">
		    <div class="pop_box">
		        <div class="del_info">
		            {{message}}
		        </div>
		    </div>
		</div>
</template>
<script>
  export default {
    props: {
      message: String
    }
  }
</script>
<style scoped>
.pop {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
    padding: 0 5%;
    z-index:999999
}

.pop .pop_box {
    width: 85%;
    height: 50px;
    background-color: #fff;
    border-radius: 8px;
    margin: 50% auto;
    padding: 0 5%;
}

.pop_box .del_info {
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    font-weight: bold;
    color:#F23030;
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
</style>


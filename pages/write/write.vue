<template>
	<view class="container">
		<!--顶部背景-->
		<view class="top">
			<view class="portrait">
				<image src="../../static/moonbridge/lemon.png"></image>
			</view>
			<text class="headline">一颗青柠 藏有青涩的记忆</text>
		</view>
		<!--写留言-->
		<view class="search">
			<view class="s-content">
				<view class="name">
					<text>我的暗号</text>
				</view>
				<view class="signal">
					<input type="text" placeholder="姓名或暗号或学号哦" placeholder-class="input" v-model="anhao"/>
				</view>
			</view>
			<view class="s-line"></view>
			<!-- <u-line></u-line> -->
			<view class="u-content">
				<textarea auto-height placeholder="留下你的文字吧~"  maxlength=-1  v-model="content" ></textarea>
			</view>
		</view>
		<view class="s-btn" v-if="anhao.length>0&&content.length>0">
			<!--输入框未输入时，按钮无法点击，颜色为浅色，输入时，则为亮色，同时点击后，是否提示查找成功或者查找失败或者查找中-->
			<button @click="add()">发布留言</button>
		</view>
		<view class="s-btn-stop" v-else>
			<!--输入框未输入时，按钮无法点击，颜色为浅色，输入时，则为亮色，同时点击后，是否提示查找成功或者查找失败或者查找中-->
			<button @click="warn()">发布留言</button>
		</view>
		<!--创建留言-->
		<view class="write-btn-out" style="cursor: pointer">
			<view class="write-btn-in" @click="write()">
				<text>返回</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				anhao:"",
				content:"",
			}
		},
		methods: {
			/**
			 * @description 发布留言
			 */
			add(){
				//pushlish
				let formData = {
					anhao: this.anhao,
					content: this.content,
				}
				let url="https://5af01eb8-c5e1-45e8-ba88-a9841484ef12.bspapp.com"
				this.$request(url,"POST",formData).then(res=>{
					if (res.code == 1) {
						uni.showToast({
							title: '发布成功',
							duration: 1500
						})
						uni.navigateBack({
							url:'./index'
						})
					}
					else {
					    uni.showModal({
							title: '温馨提示',
							content: res.msg
					    });
					}
				})
			},
			warn(){
				//面包屑提示
				if(this.anhao.length==0){
					//提示没有暗号
					uni.showToast({
						title:"请输入暗号哦~",
						position:"center",
						icon:"none"
					})
				}
				else if(this.content.length==0){
					//提示没有内容
					uni.showToast({
						title:"请输入内容哦~",
						position:"center",
						icon:"none"
					})
				}
			},
			write(){
				uni.navigateTo({
					url:'../show/show'
				})
			},
		},
		onLoad(options){
			
		},
		onShow(){
		}
		
	}
</script>

<style lang="scss" scoped>
	$setcolor_1:#F8F3E4;
	$setcolor_2:#F5F5F5;
	$setcolor_3:#B4D0A4;
	$setcolor_4:#8EC19F;
	$setcolor_5:#54A499;
	$setcolor_6:#BBBBBB;
	$setcolor_7:#FFFFFF;
	$setcolor_8:#FDFCFC;
	
	$setwidth_1:100%;
	$setheight_1:384rpx;
	$setheight_2:256rpx;
	$sethw_1:160rpx;
	$sethw_2:168rpx;
	$sethw_3:140rpx;
	$sethw_4:48rpx;
	$sethw_5:90rpx;
	
	$setfontsize_1:28rpx;
	
	$setposbottom:60rpx;
	$setposright:60rpx;
	
	$setmargin:40upx 24upx 120upx 24upx;
	$setmargin_2:56upx 24upx 0upx 24upx;
	$setmartop_1:28rpx;
	$setmartop_2:48rpx;
	$setmartop_3:32rpx;
	$setmartop_4:8rpx;
	$setmartop_5:96rpx;
	$setmarleft_1:20rpx;
	$setmarleft_2:26rpx;
	
	$setpadding:32upx 16upx 32upx 16upx;
	$setpadding_2:16upx 16upx 32upx 16upx;
	$setpadding_3:20rpx 20rpx 20rpx 20rpx;
	$setpadding_1:14rpx;
	
	$setborder_1:solid 2upx #F8F8F9;
	$setborder_2:solid 2upx #BBBBBB;
	$setbordertop_1:solid 2upx #B4D0A4;
	$setborderbottom_1:solid 2upx #B4D0A4;
	$write_btn_out_box_shadow:0 4upx 12upx 0 rgba(84,164,153,.4);//rgba(0,0,0,.4)
	$portrait_box_shadow:0 4upx 12upx 0 #8EC19F;
	$write_btn_in_border:solid 2upx #FDFCFC;
	
	$setboradius_1:16rpx;
	
	.container{
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		background-color:$setcolor_1;
	}
	.top{
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: $setcolor_3;
		width: $setwidth_1;
		height: $setheight_1;
	}
	.portrait{
		width: $sethw_1;
		height:$sethw_1;
		background-color: $setcolor_7;
		margin-top: $setmartop_5;
		border: $setborder_2;
		box-shadow: $portrait_box_shadow;
		border-radius: 50%;
	}
	.portrait image{
		width: $sethw_1;
		height:$sethw_1;
	}
	.headline{
		color:$setcolor_7;
		font-size: $setfontsize_1;
		margin-top: $setmartop_1;
	}
	.search{
		display: flex;
		flex-direction: column;
		background-color: $setcolor_7;
		border: $setborder_1;
		// height:$setheight_2;
		border-radius: $setboradius_1;
		margin: $setmargin_2;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.s-content{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: $setmartop_4 0;
		box-sizing: border-box;
		overflow: hidden;
		.name{
			color:$setcolor_5;
			font-size:$setfontsize_1;
		}
		.signal{
			flex: 1;
			margin-left: $setmarleft_2;
			font-size:$setfontsize_1;
			color:$setcolor_5;
			.input{
				font-size:$setfontsize_1;
				line-height: 48rpx;
			}
		}
	}
	.s-line{
		border-top: $setbordertop_1;
		margin-top: $setmartop_3/2;
	}
	// u-line{
	// 	border:#B4D0A4;
	// }
	.s-btn{
		display: flex;
		justify-content: center;
		margin-top: $setmartop_2;
	}
	.u-content{
		padding-top: 20rpx;
		textarea{
			min-height: 200rpx;
			width: 100% !important;
		}
	}
	.s-btn,.s-btn-stop{
		display: flex;
		justify-content: center;
		margin-top: $setmartop_2;
	}
	.s-btn button,.s-btn-stop button{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 85%;
		color:$setcolor_7;
		background-color:$setcolor_4;
		font-size:$setfontsize_1;
	}
	.s-btn-stop button{
		background-color:$setcolor_3;
	}
	.write-btn-out{
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: $setposbottom;
		right: $setposright;
		width: $sethw_2;
		height: $sethw_2;
		background-color:$setcolor_4;
		box-shadow: $write_btn_out_box_shadow;
		border-radius: 50%;
	}
	.write-btn-in{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: $sethw_3;
		height: $sethw_3;
		color:$setcolor_7;
		font-size: $setfontsize_1;
		background-color: $setcolor_4;
		box-shadow: $write_btn_out_box_shadow;
		border: $write_btn_in_border;
		border-radius: 50%;
	}
</style>
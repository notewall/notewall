<template>
	<view class="container">
		<!--顶部背景-->
		<view class="top">
			<view class="portrait">
				<image src="../../static/moonbridge/lemon.png"></image>
			</view>
			<text class="headline">一颗青柠 藏有青涩的记忆</text>
		</view>
		<!--查看留言框-->
		<view class="search">
			<view class="s-content">
				<view class="name">
					<text>我的暗号</text>
				</view>
				<view class="signal">
					<input type="text" placeholder="姓名或暗号或学号哦" v-model="anhao" />
				</view>
			</view>
			<view class="s-line"></view>
			<view class="s-btn" v-if="anhao.length>0">
				<!--输入框未输入时，按钮无法点击，颜色为浅色，输入时，则为亮色，同时点击后，是否提示查找成功或者查找失败或者查找中-->
				<button @click="search(anhao)">查看留言</button>
			</view>
			<view class="s-btn-stop" v-else>
				<!--输入框未输入时，按钮无法点击，颜色为浅色，输入时，则为亮色，同时点击后，是否提示查找成功或者查找失败或者查找中-->
				<button @click="warn()">查看留言</button>
			</view>
		</view>
		<!--留言显示-->
		<view class="message" v-if="choose==true">
			<!--查找量多是否要显示加载情况，过多时可以上滑淡入，骨架屏这两个暂不做考虑-->
			<view class="name">给你的留言</view>
			<view class="s-line"></view>
			<!--有结果-->
			<view class="note" v-for="(item,index) in note" >
				<view class="info">
					<view class="avatar">
						<image src="../../static/moonbridge/me_1.png"></image>
					</view>
					<view class="ustime">
						<text class="user">匿名用户</text>
						<text class="time">{{item.creat_time}}</text>
					</view>
				</view>
				<view class="y-content">
					<text>{{item.content}}</text>
				</view>
			</view>
			<!--无结果-->
			<view class="w-content" v-if="note.length==0">
				<text>{{word}}</text>
			</view>
		</view>
		<!--创建留言-->
		<view class="write-btn-out" >
			<view class="write-btn-in" @click="write()">
				<text>创建</text>
				<text>留言</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				anhao:"",
				choose:false,
				note:[],
				word:"暂时还没有人给你留言哦~\n不过没关系你可以给TA留个言呀~",	
				page: 1, // 信息流当前页码
				pageSize: 20, // 每页返回条数
				loadingStatus: 'loadmore', // 加载状态
				loadText: {
					loadmore: '  轻轻上拉，加载更多  ',
					loading: '  拼命加载中  ',
					nomore: '  没有更多辽  '
				},					
			}
		},
		methods: {
			/**
			 * @description 加载留言列表 
			 */
			search(){
				this.choose=true;
				let _this = this;
				this.note=[];
				this.page=1;
				let form = {
					anhao: this.anhao,
					page: this.page
				};
				let url="https://5af01eb8-c5e1-45e8-ba88-a9841484ef12.bspapp.com";
				this.$request(url,"POST").then(res=>{
					if(res.code==1){
						uni.stopPullDownRefresh();
						if(res.hasOwnProperty('data')&&res.data.length==_this.pageSize){
							_this.loadingStatus = 'loadmore';
						}
						else{
							_this.loadingStatus = 'nomore';
						}
						if(res.hasOwnProperty('data')){
							res.data.forEach((item)=>{
								item.showMoreContent = false;
							})
							_this.note.push(...res.data);
						}
					}
					else{
						// uni.showModal({
						// 	title:res.msg,
						// 	content: res.msg
						// })
						this.word="系统开小差了~\n请稍后再试~"
					}
				})
			},
			loadlist(){
				this.choose=true;
				let _this = this;
				let form = {
					anhao: this.anhao,//this.key
					page: this.page
				};
				this.$request(url,methods="POST").then(res=>{
					if(res.code==1){
						uni.stopPullDownRefresh();
						if(res.hasOwnProperty('data')&&res.data.length==_this.pageSize){
							_this.loadingStatus = 'loadmore';
						}
						else{
							_this.loadingStatus = 'nomore';
						}
						if(res.hasOwnProperty('data')){
							res.data.forEach((item)=>{
								item.showMoreContent = false;
							})
							_this.note.push(...res.data);
						}
					}
					else{
						uni.showToast({
							title:res.msg,
							icon:none
						})
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
						icon:"none",
					})
				}
			},
			write(){
				uni.navigateTo({
					url:'../write/write'
				})
			},
			/**
			 * @description 下拉刷新
			 */
			_pullDownRefresh(){
			    this.page = 1;
			    this.loadingStatus = 'loading';
			    this.note = [];
			    this.loadlist();
			},
		},
		onPullDownRefresh() {
			this._pullDownRefresh();
		},
		onReachBottom(){
			if(this.loadingStatus=='nomore'){
				return
			}
			else{
				this.loadingStatus  = 'loading';
				this.page += 1;
				this.loadlist();
			}
		},
		onLoad(options){
		
		},
		onShow(){
			this.choose=false;
		},
		onReachBottom(){

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
		height:$setheight_2;
		border-radius: $setboradius_1;
		margin: $setmargin_2;
		padding: $setpadding_2;
	}
	.s-content{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: $setmartop_4;
	}
	.name{
		color:$setcolor_5;
		font-size:$setfontsize_1;
	}
	.signal{
		flex: 1;
		margin-left: $setmarleft_2;
		font-size:$setfontsize_1;
		color:$setcolor_5;
	}
	.s-line{
		border-top: $setbordertop_1;
		margin-top: $setmartop_3;
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
		width: $setwidth_1;
		color:$setcolor_7;
		font-size:$setfontsize_1;
		background-color: $setcolor_4;
	}
	.s-btn-stop button{
		background-color: $setcolor_3;
	}
	.message{
		display: flex;
		flex-direction: column;
		background-color: $setcolor_7;
		border: $setborder_1;
		border-radius: $setboradius_1;
		margin: $setmargin;
		padding: $setpadding;
	}
	.note{
		display: flex;
		flex-direction: column;
		padding: $setpadding_1;
		border-bottom: $setborderbottom_1;
		font-size: $setfontsize_1;
	}

	.info{
		display: flex;
		flex-direction: row;
		margin-top: $setmartop_1;
	}
	.avatar{
		display: flex;
		justify-content: center;
		align-items: center;
		width: $sethw_5;
		height: $sethw_5;
		background-color: $setcolor_3;
		border-radius: 50%;
	}
	.avatar image{
		width: $sethw_4;
		height: $sethw_4;
	}
	.ustime{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: $setwidth_1;
		margin-left: $setmarleft_1;
		color:$setcolor_5;
		.user{
			display: block;
		}
		.time{
			display: block;
		}
	}

	.y-content{
		margin-top: $setmartop_1;
		color:$setcolor_5;
	}
	.w-content{
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size:$setfontsize_1;
		color:$setcolor_5;
		margin-top: $setmartop_2;
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

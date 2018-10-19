(function(){
Vue.component('v-container',{
	template:
	'<el-container>\
		<el-header height="80px">\
			<div class="header">\
                <span>欢迎您：<i>{{user}}</i></span><span>修改密码</span><span @click="logOut" style="cursor: pointer;">安全退出</span>\
                <div class="title">智慧城市云平台</div>\
                <div class="logo">\
                	<img src="/public/assets/img/logo.png">\
                </div>\
                <div class="bread">\
                	<el-row>\
                		<el-col :span="12">\
                			<el-breadcrumb separator-class="el-icon-arrow-right">\
	                    		<el-breadcrumb-item v-for="(item,index) of breadcrumb" :key="index">{{item}}</el-breadcrumb-item>\
	                    	</el-breadcrumb>\
                		</el-col>\
                		<el-col :span="12">\
                			<span class="date-span">{{date[0]}}</span><span class="date-span">{{date[1] | day}}</span>\
                		</el-col>\
                	</el-row>\
                </div>\
            </div>\
		</el-header>\
		<el-container>\
			<el-aside width="200px" class="left-aside">\
				<el-menu\
					:default-active="href_now"\
					:unique-opened="true"\
					active-text-color="#2a3345"\
					@select="handleSelect">\
			      	<el-submenu :index="item1.index" v-for="(item1,index) of menu_list" :key="index">\
	                    <template slot="title">\
	                        <i class="el-icon-location" :class="{\'el-menu-active\':item1.index == href_index}"></i>\
	                        <span :class="{\'el-menu-active\':item1.index == href_index}">{{item1.name}}{{item1.index}}</span>\
	                    </template>\
	                    <el-menu-item :index="item2.index" v-for="(item2,index) of item1.children" :key="index" :class="{\'el-menu-item-active\':item2.index == href_now}">{{item2.name}}{{item2.index}}</el-menu-item>\
	                </el-submenu>\
			    </el-menu>\
			</el-aside>\
			<el-container class="right-container">\
				<el-main>\
					<slot></slot>\
				</el-main>\
				<el-footer style="height: 50px;">\
					<p style="text-align: center;height:50px;line-height:50px;vertical-align: middle;border-top:1px solid #eeeeee;font-size:14px;">智慧城市云平台 - 使用者后台</p>\
				</el-footer>\
			</el-container>\
		</el-container>\
	</el-container>',
	data:function(){
		return {
			menu_list:window.data.menu_list,
			user:'',
		}
	},
	props:{
		href_now:{
			type:String,
			default:'',
		},
		breadcrumb:{
			type:Array
		}
	},
	computed:{
		href_index:function(){
			var that = this;
			var arr = that.href_now.split('-');
			return arr[0];
		},
		date:function () {
			var that = this;
			var date = new Date();
			var date1 = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
			var date2 = date.getDay();
			return [date1,date2];
		}
	},
	filters:{
		day:function(value){
			// console.log(value);
			var data = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
			for (var i = 0; i < data.length; i++) {
				if (i == value) {
					return data[i];
				}
			}
		}
	},
	created:function(){
		var that = this;
	},
	mounted:function(){
		
	},
	methods:{
		handleSelect:function(index,indexPath){
			var that = this;
			console.log(index,indexPath);
			console.log(that.menu_list);
			for (var i = 0,len = that.menu_list.length; i < len; i++) {
				if (that.menu_list[i].index == indexPath[0]) {
					for (var j = 0,len = that.menu_list[i].children.length; j < len; j++) {
						if (that.menu_list[i].children[j].index == indexPath[1]) {
							if (indexPath[1] == that.href_now) {
								return;
							}
							window.location.href = that.menu_list[i].children[j].href;
						}
					}
				}
			}
		},
		logOut:function(){
			var that = this;
			$.post('/oa/Login/logOut',{},function(res){
				console.log(res);
				if (res.code == 1001) {
					sessionStorage.removeItem('act_list');
					sessionStorage.removeItem('role_ids');
					sessionStorage.removeItem('user_info');
					window.location.replace('/oa/page/login');
				}else{}
			},'json');
		}
	}
});
}());
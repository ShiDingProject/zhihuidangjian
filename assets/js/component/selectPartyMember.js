(function(){
    Vue.component('select-party-member',{
        template:
        '<el-dialog title="" :visible="dialog_switch" top="80px" width="80%" :before-close="dialogClose" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @open="open">\
            <p style="text-align: center;font-size: 20px;padding: 0 0 10px;">问卷标题</p>\
            <el-row>\
                <el-col :span="9">\
                    <p class="p-padding">党员列表</p>\
                </el-col>\
                <el-col :span="15">\
                    <p class="p-padding" style="text-align:right;">已选择：{{sel_data.length}}人</p>\
                </el-col>\
            </el-row>\
            <el-table :data="table_list" border height="500" @selection-change="handleTableSelect" style="width:100%;" ref="table" v-loading="loading">\
                <el-table-column type="selection" :selectable="selectable"></el-table-column>\
                <el-table-column prop="user_name" label="姓名"></el-table-column>\
                <el-table-column prop="organization_name" label="所属组织" :filters="filters" :filter-method="filterHandler"></el-table-column>\
                <el-table-column prop="partyMember.party_state" label="党员状态" :formatter="formatterState"></el-table-column>\
                <el-table-column prop="user_tel" label="手机号"></el-table-column>\
                <el-table-column prop="user_sex" label="性别" :formatter="formatterSex"></el-table-column>\
                <el-table-column prop="partyMember.party_duty" label="党内职务"></el-table-column>\
                <el-table-column prop="user_integral" label="积分"></el-table-column>\
            </el-table>\
            <div class="pagination">\
                <!-- <el-pagination background @current-change="getPartyList(page,organization_id)" :current-page.sync="page" :page-size="limit" layout="prev, pager, next, jumper" :total="total"></el-pagination> -->\
            </div>\
            <span slot="footer" class="dialog-footer">\
                <el-button @click="dialogClose">取 消</el-button>\
                <el-button type="primary" @click="outputPartyMember">确 定</el-button>\
            </span>\
        </el-dialog>',
        data:function(){
            return{
                organization_id:0,
                table_list:[],
                page:1,
                limit:100000000,
                total:0,
                filters:[],
                sel_data:[],
                
                loading:false,
            }
        },
        props:{
            // 打开或关闭模态框（使用时需要.sync修饰符）
            dialog_switch:{
                type:Boolean,
                required:true,
            },
            // 反选列表需要的所有id的字符串，以逗号间隔
            questionnaire_participants:{
                type:String,
            },
            // 问卷调查的id，提醒用
            id:{
                type:String,
            },
            //问卷调查的状态
            questionnaire_status:{
                type:Number
            }
        },
        created:function(){
            // 用法：
            // 自定义事件output-party-member必须有回调函数
            // 1.调查问卷
            // 四个props都需要传
            // 2.三会一课
            // 需要dialog_switch、questionnaire_participants
        },
        mounted:function(){
            var that = this;
        },
        methods:{
            getPartyList:function(page,organization_id){
                var that = this;
                api.post('/admin/partymembers/list',{
                    num:that.limit,
                    page:page,
                    organization_id:organization_id
                },function(res){
                    console.log('getPartyList',res);
                    that.table_list = res.data.data.data;
                    that.total = res.data.data.total;
                    if (that.questionnaire_participants != null && that.questionnaire_participants != undefined) {
                        var timer = setInterval(function(){
                            if (that.$refs.table) {
                                clearInterval(timer);
                                that.select();
                            }
                        },17);
                    }
                    that.loading = false;
                },function(err){
                    console.log(err);
                });
            },
            getListNoTree:function(){
                var that = this;
                api.post('/admin/OrganizationStructures/noTreeList',{},function(res){
                    console.log('getListNoTree',res);
                    var arr = [];
                    for (var i = 0; i < res.data.data.length; i++) {
                        arr.push({
                            text:res.data.data[i].organization_name,
                            value:res.data.data[i].organization_name
                        });
                    }
                    that.filters = arr;
                },function(err){
                    console.log(err);
                });
            },
            selectable:function(row,index){
                var that = this;
                // console.log(row,index);
                if (that.questionnaire_participants === undefined) {
                    return true;
                }
                if (that.questionnaire_participants !== null) {
                    var arr = that.questionnaire_participants.split(',');
                    var res = arr.indexOf(row.id.toString());
                    if (that.questionnaire_status === 0) {
                        if (res === -1) {
                            return true;
                        }else{
                            return false;
                        }    
                    }else if (that.questionnaire_status === undefined) {
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    if (that.questionnaire_status === 0) {
                        return true;
                    }else if (that.questionnaire_status === undefined) {
                        return true;
                    }else{
                        return false;
                    }
                }
            },
            formatterState:function(row,column){
                var that = this;
                if (row.partyMember.party_state == 1) {
                    return '正式党员';
                }else if (row.partyMember.party_state == 2) {
                    return '预备党员';
                }else if (row.partyMember.party_state == 3) {
                    return '积极分子';
                }
            },
            formatterSex:function(row,column){
                var that = this;
                if (row.user_sex == 1) {
                    return '男';
                }else if (row.user_sex == 2) {
                    return '女';
                }
            },
            filterHandler:function(value,row,column){
                var property = column['property'];
                return row[property] === value;
            },
            handleTableSelect:function(rows){
                var that = this;
                console.log('handleTableSelect',rows);
                that.sel_data = rows;
            },
            select:function(){
                var that = this;
                var arr = that.questionnaire_participants.split(',');
                console.log(arr);
                for (var i = 0; i < that.table_list.length; i++) {
                    for (var j = 0; j < arr.length; j++) {
                        if (that.table_list[i].id == arr[j]) {
                            that.$refs.table.toggleRowSelection(that.table_list[i]);
                        }
                    }
                }
            },
            open:function(){
                var that = this;
                that.loading = true;
                console.log('questionnaire_participants',that.questionnaire_participants);
                console.log('questionnaire_status',that.questionnaire_status);
                that.getPartyList(that.page,that.organization_id);
                that.getListNoTree();
            },
            dialogClose:function(done){
                var that = this;
                that.$emit('update:dialog_switch',false);
            },
            outputPartyMember:function(){
                var that = this;
                that.$emit('output-party-member',{
                    tip:'select-party-member组件输出值',
                    data:that.sel_data,
                    id:that.id,
                });
                that.dialogClose();
            },
        }
    });
}());
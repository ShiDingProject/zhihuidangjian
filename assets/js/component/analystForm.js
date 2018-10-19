(function(){
    Vue.component('analyst-form',{
        template:
        '<div>\
            <el-card v-if="analyst_data.type == \'add\'">\
                <el-button size="mini" type="success" @click="analyst_data.research_type = 1" :disabled="ajax_lock">增加单选题</el-button>\
                <el-button size="mini" type="success" @click="analyst_data.research_type = 2" :disabled="ajax_lock">增加多选题</el-button>\
                <el-button size="mini" type="success" @click="analyst_data.research_type = 3" :disabled="ajax_lock">增加问答题</el-button>\
            </el-card>\
            <el-card v-if="analyst_data.research_type == 1">\
                <div slot="header" class="clearfix">\
                    <span style="display:inline-block;line-height:26px;height:26px;">单选题</span>\
                    <el-button style="float: right;margin-left:10px;" size="mini" type="danger" v-if="analyst_data.type == \'edit\'" @click="delResearchs" :disabled="ajax_lock">删除</el-button>\
                    <el-button style="float: right;margin-left:10px;" size="mini" type="primary" v-if="analyst_data.type == \'edit\' && is_edit == true" @click="switchEdit" :disabled="ajax_lock">确认编辑</el-button>\
                    <el-button style="float: right;margin-left:10px;" size="mini" type="primary" v-if="analyst_data.type == \'edit\' && is_edit == false" @click="switchEdit" :disabled="ajax_lock">编辑</el-button>\
                    <el-button style="float: right;margin-left:10px;" size="mini" type="success" v-if="analyst_data.type == \'add\'" @click="saveAnalyst" :disabled="ajax_lock">增加</el-button>\
                    <el-button style="float: right;" size="mini" type="info" @click="addOption" v-if="option.length < 2 && !isDisable">增加选项</el-button>\
                </div>\
                <el-form ref="single" :model="analyst_data" label-width="70px">\
                    <el-form-item label="题目：" prop="research_title" :rules="{required:true,message:\'请填写单选题题目\',trigger:\'blur\'}">\
                        <el-row>\
                            <el-col :span="22">\
                                <el-input v-model="analyst_data.research_title" placeholder="请填写单选题题目" :disabled="isDisable"></el-input>\
                            </el-col>\
                            <el-col :span="2"></el-col>\
                        </el-row>\
                    </el-form-item>\
                    <el-form-item label="A：" prop="research_option_a" :rules="{required:true,message:\'请填写选项A\',trigger:\'blur\'}">\
                        <el-row>\
                            <el-col :span="22">\
                                <el-input v-model="analyst_data.research_option_a" placeholder="请填写选项A" :disabled="isDisable"></el-input>\
                            </el-col>\
                            <el-col :span="2"></el-col>\
                        </el-row>\
                    </el-form-item>\
                    <el-form-item label="B：" prop="research_option_b" :rules="{required:true,message:\'请填写选项B\',trigger:\'blur\'}">\
                        <el-row>\
                            <el-col :span="22">\
                                <el-input v-model="analyst_data.research_option_b" placeholder="请填写选项B" :disabled="isDisable"></el-input>\
                            </el-col>\
                            <el-col :span="2"></el-col>\
                        </el-row>\
                    </el-form-item>\
                    <el-form-item\
                        :key="item.label"\
                        :label="item.label + \'：\'"\
                        :prop="\'research_option_\' + item.value"\
                        :rules="{required:true,message:\'请填写选项\' + item.label,trigger:\'blur\'}"\
                        v-for="(item,index) of option"\
                    >\
                        <el-row>\
                            <el-col :span="22">\
                                <el-input v-model="analyst_data[\'research_option_\'+ item.value]" :placeholder="\'请填写选项\' + item.label" :disabled="isDisable"></el-input>\
                            </el-col>\
                            <el-col :span="2" style="text-align: center;">\
                                <el-button icon="el-icon-minus" circle type="danger" size="mini" style="padding: 5px;" v-if="index == option.length - 1" @click="minusOption(index)" :disabled="isDisable"></el-button>\
                            </el-col>\
                        </el-row>\
                    </el-form-item>\
                </el-form>\
            </el-card>\
            <el-card v-if="analyst_data.research_type == 2">\
                <div slot="header" class="clearfix">\
                    <span style="display:inline-block;line-height:26px;height:26px;">多选题</span>\
                    <el-button style="float: right;margin-left:10px;" size="mini" type="danger" v-if="analyst_data.type == \'edit\'" @click="delResearchs" :disabled="ajax_lock">删除</el-button>\
                    <el-button style="float: right;margin-left:10px;" size="mini" type="primary" v-if="analyst_data.type == \'edit\' && is_edit == true" @click="switchEdit" :disabled="ajax_lock">确认编辑</el-button>\
                    <el-button style="float: right;margin-left:10px;" size="mini" type="primary" v-if="analyst_data.type == \'edit\' && is_edit == false" @click="switchEdit" :disabled="ajax_lock">编辑</el-button>\
                    <el-button style="float: right;margin-left:10px;" size="mini" type="success" v-if="analyst_data.type == \'add\'" @click="saveAnalyst" :disabled="ajax_lock">增加</el-button>\
                    <el-button style="float: right;" size="mini" type="info" @click="addOption" v-if="option.length < 2 && !isDisable">增加选项</el-button>\
                </div>\
                <el-form ref="multiple" :model="analyst_data" label-width="70px">\
                    <el-form-item label="题目：" prop="research_title" :rules="{required:true,message:\'请填写单选题题目\',trigger:\'blur\'}">\
                        <el-row>\
                            <el-col :span="22">\
                                <el-input v-model="analyst_data.research_title" placeholder="请填写单选题题目" :disabled="isDisable"></el-input>\
                            </el-col>\
                            <el-col :span="2"></el-col>\
                        </el-row>\
                    </el-form-item>\
                    <el-form-item label="A：" prop="research_option_a" :rules="{required:true,message:\'请填写选项A\',trigger:\'blur\'}">\
                        <el-row>\
                            <el-col :span="22">\
                                <el-input v-model="analyst_data.research_option_a" placeholder="请填写选项A" :disabled="isDisable"></el-input>\
                            </el-col>\
                            <el-col :span="2"></el-col>\
                        </el-row>\
                    </el-form-item>\
                    <el-form-item label="B：" prop="research_option_b" :rules="{required:true,message:\'请填写选项B\',trigger:\'blur\'}">\
                        <el-row>\
                            <el-col :span="22">\
                                <el-input v-model="analyst_data.research_option_b" placeholder="请填写选项B" :disabled="isDisable"></el-input>\
                            </el-col>\
                            <el-col :span="2"></el-col>\
                        </el-row>\
                    </el-form-item>\
                    <el-form-item\
                        :key="item.label"\
                        :label="item.label + \'：\'"\
                        :prop="\'research_option_\' + item.value"\
                        :rules="{required:true,message:\'请填写选项\' + item.label,trigger:\'blur\'}"\
                        v-for="(item,index) of option"\
                    >\
                        <el-row>\
                            <el-col :span="22">\
                                <el-input v-model="analyst_data[\'research_option_\'+ item.value]" :placeholder="\'请填写选项\' + item.label" :disabled="isDisable"></el-input>\
                            </el-col>\
                            <el-col :span="2" style="text-align: center;">\
                                <el-button icon="el-icon-minus" circle type="danger" size="mini" style="padding: 5px;" v-if="index == option.length - 1" @click="minusOption(index)" :disabled="isDisable"></el-button>\
                            </el-col>\
                        </el-row>\
                    </el-form-item>\
                </el-form>\
            </el-card>\
            <el-card v-if="analyst_data.research_type == 3">\
                <div slot="header" class="clearfix">\
                    <span style="display:inline-block;line-height:26px;height:26px;">问答</span>\
                    <el-button style="float: right;margin-left:10px;" size="mini" type="danger" v-if="analyst_data.type == \'edit\'" @click="delResearchs" :disabled="ajax_lock">删除</el-button>\
                    <el-button style="float: right;" size="mini" type="primary" v-if="analyst_data.type == \'edit\' && is_edit == true" @click="switchEdit" :disabled="ajax_lock">确认编辑</el-button>\
                    <el-button style="float: right;" size="mini" type="primary" v-if="analyst_data.type == \'edit\' && is_edit == false" @click="switchEdit" :disabled="ajax_lock">编辑</el-button>\
                    <el-button style="float: right;" size="mini" type="success" v-if="analyst_data.type == \'add\'" @click="saveAnalyst" :disabled="ajax_lock">增加</el-button>\
                </div>\
                <el-form ref="QA" :model="analyst_data" label-width="70px">\
                    <el-form-item label="问题：" prop="research_title" :rules="{required:true,message:\'请填写问题题目\',trigger:\'blur\'}">\
                        <el-input v-model="analyst_data.research_title" placeholder="请填写问题题目" :disabled="isDisable"></el-input>\
                    </el-form-item>\
                </el-form>\
            </el-card>\
        </div>',
        props:{
            analyst_data:{
                type:Object,
                required:true,
            },
            dialog_form_type:{
                type:String,
            }
        },
        data:function(){
            return {
                is_edit:false,
                ajax_lock:false,
                option:[]
            }
        },
        computed:{
            isDisable:function(){
                var that = this;
                if (that.analyst_data.type == 'add') {
                    return false;
                }else if (that.analyst_data.type == 'edit') {
                    if (that.is_edit) {
                        return false;
                    }else{
                        return true;
                    }
                }
            }
        },
        created:function(){
            var that = this;
            console.log('初始化调研组件',that.analyst_data);
            if (that.analyst_data.research_option_c !== '') {
                that.addOption();
            }
            if (that.analyst_data.research_option_d !== '') {
                that.addOption();
            }
            if (that.dialog_form_type == 'view') {
                that.ajax_lock = true;
            }
        },
        methods:{
            addOption:function(){
                var that = this;
                if (that.option.length == 0) {
                    that.option.push({
                        label:'C',
                        value:'c'
                    });
                }else if (that.option.length == 1) {
                    that.option.push({
                        label:'D',
                        value:'d'
                    });
                }
            },
            minusOption:function(index){
                var that = this;
                that.option.splice(index,1);
                if (index == 0) {
                    that.analyst_data.research_option_c = '';
                }else if (index == 1) {
                    that.analyst_data.research_option_d = '';
                }
            },
            switchEdit:function(){
                var that = this;
                if (that.is_edit) {
                    that.saveAnalyst();
                }else{
                    that.is_edit = true;
                }
            },
            saveAnalyst:function(){
                var that = this;
                var data = {
                    type1:'single',
                    type2:'multiple',
                    type3:'QA',
                }
                that.$refs[data['type' + that.analyst_data.research_type]].validate(function(valid){
                    if (valid) {
                        that.addEditResearchs();
                    }
                }); 
            },
            addEditResearchs:function(){
                var that = this;
                that.ajax_lock = true;
                if (that.analyst_data.type == 'add') {
                    var data = {
                        questionnaire_id:that.analyst_data.questionnaire_id,
                        research_type:that.analyst_data.research_type,
                        research_title:that.analyst_data.research_title,
                        research_option_a:that.analyst_data.research_option_a,
                        research_option_b:that.analyst_data.research_option_b,
                        research_option_c:that.analyst_data.research_option_c,
                        research_option_d:that.analyst_data.research_option_d,
                    }
                }else if (that.analyst_data.type == 'edit') {
                    var data = {
                        id:that.analyst_data.id,
                        questionnaire_id:that.analyst_data.questionnaire_id,
                        research_type:that.analyst_data.research_type,
                        research_title:that.analyst_data.research_title,
                        research_option_a:that.analyst_data.research_option_a,
                        research_option_b:that.analyst_data.research_option_b,
                        research_option_c:that.analyst_data.research_option_c,
                        research_option_d:that.analyst_data.research_option_d,
                    }
                }
                console.log(data);
                api.post('/admin/questionnaires/addEditResearchs',data,function(res){
                    console.log('addEditResearchs',res);
                    if (res.data.code == 1001) {
                        that.$emit('fresh_analyst_list',{
                            questionnaire_id:that.analyst_data.questionnaire_id
                        });
                        that.ajax_lock = false;
                    }else{
                        that.ajax_lock = false;
                    }
                },function(err){
                    console.log(err);
                });
            },
            delResearchs:function(){
                var that = this;
                that.$confirm('此操作将永久删除该调研, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showClose:false,
                    type: 'warning',
                    callback:function(action){
                        if (action == 'confirm') {
                            that.ajax_lock = true;
                            api.post('/admin/questionnaires/delResearchs',{
                                id:that.analyst_data.id,
                                questionnaire_id:that.analyst_data.questionnaire_id,
                            },function(res){
                                console.log(res);
                                if (res.data.code == 1003) {
                                    that.$emit('fresh_analyst_list',{
                                        questionnaire_id:that.analyst_data.questionnaire_id
                                    });
                                    that.ajax_lock = false;
                                }else{
                                    that.ajax_lock = false;
                                }
                            },function(err){
                                console.log(err);
                            });    
                        }else if (action == 'cancel') {
                            
                        }
                    }
                });
                
            }
        }
    });
}());
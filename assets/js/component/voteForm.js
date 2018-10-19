(function(){
    Vue.component('vote-form',{
        template:
        '<el-card>\
            <div slot="header" class="clearfix" style="text-align:right;">\
                <el-button type="success" size="mini" v-if="vote_data.type == \'add\' " @click="saveVote" :disabled="ajax_lock">增加</el-button>\
                <el-button type="primary" size="mini" v-if="vote_data.type == \'edit\' && is_edit == false" @click="switchEdit" :disabled="ajax_lock">编辑</el-button>\
                <el-button type="primary" size="mini" v-if="vote_data.type == \'edit\' && is_edit == true" @click="switchEdit" :disabled="ajax_lock">确认编辑</el-button>\
                <el-button type="danger" size="mini" v-if="vote_data.type == \'edit\'" @click="delVotings" :disabled="ajax_lock">删除</el-button>\
            </div>\
            <el-form ref="vote_form" :model="vote_data" label-width="80px">\
                <el-form-item label="姓名" prop="voting_name" :rules="{required:true,message:\'请填写姓名\',trigger:\'blur\'}">\
                    <el-input v-model="vote_data.voting_name" placeholder="请填写姓名" :disabled="isDisable"></el-input>\
                </el-form-item>\
                <el-form-item label="部门" prop="voting_department" :rules="{required:true,message:\'请填写部门\',trigger:\'blur\'}">\
                    <el-input v-model="vote_data.voting_department" placeholder="请填写部门" :disabled="isDisable"></el-input>\
                </el-form-item>\
                <el-form-item label="介绍" prop="voting_introuce" :rules="[{required:true,message:\'请填写介绍\',trigger:\'blur\'},{max: 150, message: \'请填写介绍，建议在150字以内\', trigger: \'blur\'}]">\
                    <el-input v-model="vote_data.voting_introuce" placeholder="请填写介绍，建议在150字以内" :disabled="isDisable"></el-input>\
                </el-form-item>\
                <el-form-item label="图片">\
                    <el-upload :before-remove="beforeRemove" :on-exceed="handleExceed" multiple :limit="1" :file-list="fileList" action="#" :auto-upload="false" ref="upload" list-type="picture-card" :disabled="isDisable">\
                        <el-button size="small" type="primary">点击选择图片</el-button>\
                        <div slot="tip" class="el-upload__tip">请选择 1 张一寸照片只能上传jpg/png文件，且不超过500kb</div>\
                    </el-upload>\
                </el-form-item>\
            </el-form>\
        </el-card>',
        props:{
            vote_data:{
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
                fileList:[],
                ajax_lock:false,
            }
        },
        computed:{
            isDisable:function(){
                var that = this;
                if (that.dialog_form_type == 'view') {
                    return true;
                }
                if (that.vote_data.type == 'add') {
                    return false;
                }else if (that.vote_data.type == 'edit') {
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
            console.log(that.vote_data);
            console.log('dialog_form_type',that.dialog_form_type);
            if (that.dialog_form_type == 'view') {
                that.ajax_lock = true;
            }
            if (that.vote_data.type == 'edit') {
                var arr = [{
                    name:'img1',
                    url:that.vote_data.voting_picture
                }];
                that.fileList = arr;
            }
        },
        methods:{
            beforeRemove:function(file,fileList){
                var that = this;
                return that.$confirm('确定移除' + file.name);
            },
            handleExceed:function(file,fileList){
                var that = this;
                that.$message.warning('当前最多可上传1个图片文件');
            },
            switchEdit:function(){
                var that = this;
                if (that.is_edit) {
                    that.saveVote();
                }else{
                    that.is_edit = true;
                }
            },
            saveVote:function(){
                var that = this;
                that.$refs.vote_form.validate(function(valid){
                    if (valid) {
                        that.fileList = that.$refs.upload.uploadFiles;
                        if(that.fileList.length == 0){
                            that.$message.error('请选择 1 张图片上传');
                        }else{
                            if (that.vote_data.type == 'add') {
                                that.addEditVotings('add');
                            }else if (that.vote_data.type == 'edit') {
                                that.addEditVotings('edit');
                            }
                        }
                    }
                });
            },
            addEditVotings:function(type){
                var that = this;
                that.ajax_lock = true;
                var formdata = new FormData();
                formdata.append('questionnaire_id',that.vote_data.questionnaire_id);
                formdata.append('voting_name',that.vote_data.voting_name);
                formdata.append('voting_department',that.vote_data.voting_department);
                formdata.append('voting_introuce',that.vote_data.voting_introuce);
                if (that.fileList[0].raw != undefined) {
                    formdata.append('thumb',that.fileList[0].raw);
                }
                if (type == 'add') {
                    api.post('/admin/questionnaires/addEditVotings',formdata,function(res){
                        console.log(res);
                        if (res.data.code == 1001) {
                            that.$emit('fresh_vote_list',{
                                questionnaire_id:that.vote_data.questionnaire_id
                            });
                            that.ajax_lock = false;
                        }else if (res.data.code == 1002) {
                            that.ajax_lock = false;
                        }
                    },function(err){
                        console.log(err);
                        that.ajax_lock = false;
                    });
                }else if (type == 'edit') {
                    formdata.append('id',that.vote_data.id);
                    api.post('/admin/questionnaires/addEditVotings',formdata,function(res){
                        console.log(res);
                        if (res.data.code == 1001) {
                            that.$emit('fresh_vote_list',{
                                questionnaire_id:that.vote_data.questionnaire_id
                            });
                            that.ajax_lock = false;
                        }else if (res.data.code == 1002) {
                            that.ajax_lock = false;
                        }
                    },function(err){
                        console.log(err);
                        that.ajax_lock = false;
                    });
                }
            },
            delVotings:function(){
                var that = this;
                that.$confirm('此操作将永久删除该投票, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showClose:false,
                    type: 'warning',
                    callback:function(action){
                        if (action == 'confirm') {
                            that.ajax_lock = true;
                            api.post('/admin/questionnaires/delVotings',{
                                id:that.vote_data.id,
                                questionnaire_id:that.vote_data.questionnaire_id
                            },function(res){
                                console.log('delVotings',res);
                                if (res.data.code == 1003) {
                                    that.$emit('fresh_vote_list',{
                                        questionnaire_id:that.vote_data.questionnaire_id
                                    });
                                    that.ajax_lock = false;
                                }else{
                                    that.ajax_lock = false;
                                }
                            },function(err){
                                console.log(err);
                                that.ajax_lock = false;
                            });
                        }else if (action == 'cancel') {
                            
                        }
                    }
                })
               
            }
        }
    });
}());
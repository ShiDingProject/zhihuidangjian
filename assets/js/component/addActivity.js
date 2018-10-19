(function(){
    Vue.component('add-activity',{
        template:
        '<el-dialog title="发布活动" :visible="dialog_switch" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">\
                <el-form :model="activityForm" ref="activityForm" label-width="100px" class="demo-activityForm">\
                    <el-row>\
                        <el-col :span="12">\
                            <el-form-item label="标题" prop="title" :rules="{required:true, message:\'请填写标题\', trigger:\'blur\'}">\
                                <el-input v-model="activityForm.title" placeholder="填写标题"></el-input>\
                            </el-form-item>\
                        </el-col>\
                        <el-col :span="12"></el-col>\
                    </el-row>\
                    <el-row>\
                        <el-col :span="12">\
                            <el-form-item label="类型" prop="genre" :rules="{required:true,message:\'请填写类型\',trigger:\'blur\'}">\
                                <el-input v-model="activityForm.genre" placeholder="填写类型"></el-input>\
                            </el-form-item>\
                        </el-col>\
                        <el-col :span="12"></el-col>\
                    </el-row>\
                    <el-row>\
                        <el-col :span="8">\
                            <el-form-item label="组织者" prop="organization" :rules="{required:true,message:\'请选择颜色\',trigger:\'blur\'}">\
                                <el-select v-model="organization" placeholder="请选择">\
                                    <el-option v-for="item in organization" :key="item.value" :label="item.label" :value="item.value">\
                                    </el-option>\
                                </el-select>\
                            </el-form-item>\
                        </el-col>\
                        <el-col :span="8">\
                            <el-form-item label-width="10px" prop="organiser" :rules="{required:true,message:\'请选择颜色\',trigger:\'blur\'}">\
                                <el-select v-model="organiser" placeholder="请选择">\
                                    <el-option v-for="item in organiser" :key="item.value" :label="item.label" :value="item.value">\
                                    </el-option>\
                                </el-select>\
                            </el-form-item>\
                        </el-col>\
                    </el-row>\
                    <el-row>\
                        <el-col :span="12">\
                            <el-form-item label="电话" prop="phone" :rules="{required:true,message:\'请填写电话\',trigger:\'blur\'}">\
                                <el-input v-model="activityForm.phone" placeholder="填写电话"></el-input>\
                            </el-form-item>\
                        </el-col>\
                        <el-col :span="12"></el-col>\
                    </el-row>\
                    <el-row>\
                        <el-col :span="18">\
                            <el-form-item label="活动地址" prop="address" :rules="{required:true,message:\'请填写活动地址\',trigger:\'blur\'}">\
                                <el-input v-model="activityForm.address" placeholder="填写活动地址"></el-input>\
                            </el-form-item>\
                        </el-col>\
                        <el-col :span="6"></el-col>\
                    </el-row>\
                    <el-row>\
                        <el-col :span="18">\
                            <el-form-item label="活动时间" prop="time" :rules="{required:true,message:\'请填写活动时间\',trigger:\'blur\'}">\
                                <el-date-picker v-model="activityForm.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">\
                                </el-date-picker>\
                            </el-form-item>\
                        </el-col>\
                        <el-col :span="6"></el-col>\
                    </el-row>\
                    <el-row>\
                        <el-col :span="12">\
                            <el-form-item label="主图" prop="mainImg" :rules="{required:true,message:\'请选择主图\',trigger:\'blur\'}">\
                                    <el-button type="primary" @click="mainImg = true">选择图片</el-button>\
                            </el-form-item>\
                        </el-col>\
                        <el-col :span="12"></el-col>\
                    </el-row>\
                    <el-row>\
                        <el-col :span="20">\
                            <el-form-item label="详情图片" prop="imgList" :rules="{required:true,message:\'请添加详情图片\',trigger:\'blur\'}">\
                                <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">\
                                    <i class="el-icon-plus"></i>\
                                </el-upload>\
                            </el-form-item>\
                        </el-col>\
                        <el-col :span="4"></el-col>\
                    </el-row>\
                    <el-row>\
                        <el-col :span="18">\
                            <el-form-item label="详情内容" prop="info" :rules="{required:true,message:\'请填写详情内容\',trigger:\'blur\'}">\
                                <el-input type="" :rows="6" placeholder="请输入详情内容" v-model="activityForm.info">\
                                </el-input>\
                            </el-form-item>\
                        </el-col>\
                        <el-col :span="6"></el-col>\
                    </el-row>\
                    <el-form-item>\
                        <el-button type="primary" @click="submitFn(\'activityForm\')">提交</el-button>\
                    </el-form-item>\
                </el-form>\
            </el-dialog>',
        data:function(){
            return{
                activityForm:{
                    'name':'',
                    'Integral':'',
                    'color': '',
                    'phone': '',
                    'time': '',
                    'mainImg':'',
                    'imgList': '',
                    'info': ''
                },
                organization:[{
                    'value': 'ss',
                    'lable': 'ss'
                },{
                    'value': 'ss',
                    'lable': 'ss'
                }],
                organiser:[{
                    'value': 'ss',
                    'lable': 'ss'
                },{
                    'value': 'ss',
                    'lable': 'ss'
                }],
            }
        },
        props:{
            dialog_switch:{
                type:Boolean,
                required:true,
            },
        },
        methods:{
            submitFn:function(formName){
                var that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.$emit('output',{
                            tip:'发起活动添加',
                            data:that.that.formName
                        });
                    } else {
                      console.log('error submit!!');
                      return false;
                    }
                  });
            },
            handlePictureCardPreview:function(){

            },
            handleRemove:function(){

            }
        }
    });
}());
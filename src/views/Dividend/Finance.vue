<template>
    <!-- 财务信息 -->
    <div class="cdlbox cwxx">
        <div class="ggdlx2top1">
            财务信息
        </div>
        <div class="cwxxbox" v-if="show==1">
            <div class="cwxximg">
                <div><img src="../../img/icon-1.png" alt=""></div>
                <el-button size="medium xlyzbut" @click="modificationfun">前往补充</el-button>

            </div>
        </div>
        <div class="cwxxbox" v-if="show==2">
            <div class="cwxxboxsj">
                账号主体：{{cwxxboxsj.accountKind}}
            </div>
            <div class="cwxxboxsj">
                账号名称：{{cwxxboxsj.cardName}}
            </div>
            <div class="cwxxboxsj">
                收款银行：{{cwxxboxsj.cardSubBank}}
            </div>
            <div class="cwxxboxsj">
                开户银行：{{cwxxboxsj.cardOpenBank}}
            </div>
            <div class="cwxxboxsj">
                银行账号：{{cwxxboxsj.cardNumber}}
            </div>
            <el-button size="medium xlyzbut" @click="modificationfun">修改</el-button>
        </div>
        <div class="cwxxbox cwxxbox2" v-if="show==3">
            <el-form size="medium" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm cwxxbox2wid">
                <el-form-item label="主体资质" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="PUBLIC">对公账户</el-radio>
                        <el-radio label="PERSONAL">个人账号</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="账号名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="开户银行" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="建设银行" value="建设银行"></el-option>
                        <el-option label="中国农业银行" value="中国农业银行"></el-option>
                        <el-option label="中国工商银行" value="中国工商银行"></el-option>
                        <el-option label="中国建设银行" value="中国建设银行"></el-option>
                        <el-option label="中国邮政储蓄银行" value="中国邮政储蓄银行"></el-option>
                        <el-option label="中国银行" value="中国银行"></el-option>
                        <el-option label="招商银行" value="招商银行"></el-option>
                        <el-option label="交通银行" value="交通银行"></el-option>
                        <el-option label="浦发银行" value="浦发银行"></el-option>
                        <el-option label="中国光大银行" value="中国光大银行"></el-option>
                        <el-option label="中信银行" value="中信银行"></el-option>
                        <el-option label="平安银行" value="平安银行"></el-option>
                        <el-option label="中国民生银行" value="中国民生银行"></el-option>
                        <el-option label="华夏银行" value="华夏银行"></el-option>
                        <el-option label="广发银行" value="广发银行"></el-option>
                        <el-option label="福建农村信用社农商银行" value="福建农村信用社农商银行"></el-option>
                        <el-option label="汇丰银行" value="汇丰银行"></el-option>
                        <el-option label="厦门银行" value="厦门银行"></el-option>
                        <el-option label="东亚银行" value="东亚银行"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开户支行" prop="name">
                    <el-input v-model="ruleForm.cardSubBank"></el-input>
                </el-form-item>
                <el-form-item label="银行账号" prop="name">
                    <el-input v-model="ruleForm.cardNumber"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="ruleForm.phone" ref="content"></el-input>
                    <el-button v-show="codeshow" type="primary" @click="codeclk">获取验证码</el-button>
                    <el-button v-show="!codeshow" type="info">{{count}}</el-button>

                </el-form-item>
                <el-form-item label="验证码" prop="name">
                    <el-input v-model="ruleForm.code"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="danger" @click="csh()">返回</el-button>

                </el-form-item>
            </el-form>
        </div>
    </div>

</template>
<script>
import { isvalidPhone } from "../../utils/validate";
import { cwxxindexsj, phonecode, accountuesid } from "@/api/api";
//定义一个全局的变量，谁用谁知道
var validPhone = (rule, value, callback) => {
  console.log(rule);

  if (!value) {
    callback(new Error("请输入电话号码"));
  } else if (!isvalidPhone(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};
export default {
  data() {
    return {
      codeshow: true,
      count: "",
      timer: null,
      cwxxboxsj: {
        accountKind: "", //账号类别
        cardNumber: "", //银行卡号
        cardName: "", //银行卡名字
        cardOpenBank: "",
        cardSubBank: ""
      },
      usid: this.$store.state.user.userId,
      show: 1,
      ruleForm: {
        name: "",
        region: "", //银行选择
        resource: "", //主体资质
        cardNumber: "",
        cardSubBank: "",
        phone: "",
        code: ""
      },
      rules: {
        name: [
          { required: true, message: "内容不能为空", trigger: "blur" },
          { min: 1, max: 25, message: "长度在 1 到 25 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择开户银行", trigger: "change" }
        ],
        resource: [
          { required: true, message: "请选择主体资质", trigger: "change" }
        ],
        phone: [
          { required: true, trigger: "blur", validator: validPhone } //这里需要用到全局变量
        ]
      }
    };
  },
  methods: {
    //方法
    codeclk() {
      //获取验证码
      if (!isvalidPhone(this.ruleForm.phone)) {
        this.$notify.error({
          title: "获取失败",
          message: "请输入正确的手机号"
        });
        this.$refs.content.focus();
      } else {
        let data = {
          phone: this.ruleForm.phone, //手机号码
          userId: this.$store.state.user.userId
        };
        phonecode(data)
          .then(r => {
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.codeshow = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.codeshow = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
            if (r.data.success == true) {
              this.$notify({
                title: "成功",
                message: "验证码发送成功",
                type: "success"
              });
            } else {
              this.$notify({
                title: "失败",
                message: r.data.message.description,
                type: "warning"
              });
            }
          })
          .catch(response => {
            this.$notify.error({
              title: "错误",
              message: "服务器出错"
            });
          });
      }
    },
    modificationfun() {
      //切换状态
      this.show = 3;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            accountKind: this.ruleForm.resource,
            cardName: this.ruleForm.name,
            cardNumber: this.ruleForm.cardNumber,
            cardOpenBank: this.ruleForm.region,
            cardSubBank: this.ruleForm.cardSubBank,
            code: this.ruleForm.code,
            phone: this.ruleForm.phone,
            userId: this.$store.state.user.userId
          };
          accountuesid(data)
            .then(r => {
              console.log(r);
              if (r.data.success == true) {
                this.$notify({
                  title: "成功",
                  message: "设置财务信息成功",
                  type: "success"
                });
                this.show = 2;
                this.csh();
              } else {
                this.$notify({
                  title: "失败",
                  message: r.data.message.description,
                  type: "warning"
                });
              }
            })
            .catch(response => {
              this.$notify.error({
                title: "错误",
                message: "服务器出错"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.ruleForm = {
        name: "",
        region: "", //银行选择
        resource: "", //主体资质
        cardNumber: "",
        cardSubBank: "",
        phone: "",
        code: ""
      };
    },
    csh() {
      cwxxindexsj(this.usid)
        .then(r => {
          console.log(r);
          let data = r.data.data;
          var leixing;
          if (data != null) {
            this.show = 2;
            if (data.accountKind == "PUBLIC") {
              leixing = "对公账号";
            } else if (data.accountKind == "PERSONAL") {
              leixing = "个人账号";
            } else {
              leixing = "";
            }
            this.cwxxboxsj.accountKind = leixing;
            this.cwxxboxsj.cardNumber = data.cardNumber;
            this.cwxxboxsj.cardName = data.cardName;
            this.cwxxboxsj.cardOpenBank = data.cardOpenBank;
            this.cwxxboxsj.cardSubBank = data.cardSubBank;
          } else {
            this.show = 1;
            console.log("暂无数据");
          }
        })
        .catch(response => {
          this.$notify.error({
            title: "错误",
            message: "服务器出错"
          });
        });
    }
  },
  mounted: function() {
    this.csh();
    //挂载结束状态
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.cwxx {
  .ggdlx2top1 {
    background: #fff;

    height: 60px;
    border-bottom: 1px solid #e8f2f3;
    line-height: 60px;
    padding: 0px 0px 0px 20px;
    font-size: 16px;
  }
  .cwxxbox {
    background: #fff;
    padding: 50px;
    min-height: 600px;
  }
  .cwxxboxsj {
    margin-bottom: 30px;
    font-size: 14px;
  }
  .xlyzbut {
    background-color: rgb(0, 204, 203);
    color: #fff;
    width: 100px;
    border: 1px solid rgb(0, 204, 203);
  }
  .cwxximg {
    text-align: center;
    padding-top: 50px;
    img {
      margin-bottom: 20px;
    }
  }
  .cwxxbox2 {
    padding: 80px;
    .el-input {
      width: 300px;
    }
  }
}
</style>

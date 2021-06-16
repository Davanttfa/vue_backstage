<template>
    <div class="cdlbox shopuditxq">
        <div class="shopuditxqbox">
            <div class="gglhtindex-top">
                用户信息
            </div>
            <div class="shopuditxqbom">
                <el-row :gutter="60">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form ref="form" label-width="100px">
                                <el-form-item label="广告机类型:">
                                    <el-input size="small" :disabled="true" v-model="form.cardtype">

                                    </el-input>
                                </el-form-item>
                                <el-form-item label="地址:">
                                    <el-input size="small" :disabled="true" v-model="form.address"></el-input>
                                </el-form-item>
                                <el-form-item label="所属行业:">
                                    <el-input style="width:45%" size="small" :disabled="true" v-model="form.industryName"></el-input>
                                    <span class="spangang">-</span>
                                    <el-input style="width:45%" size="small" :disabled="true" v-model="form.industryBusinessName"></el-input>
                                </el-form-item>
                                <el-form-item label="所属区域:">
                                    <el-input style="width:26%" size="small" :disabled="true" v-model="form.provinceName"></el-input>
                                    <span class="spangang">-</span>
                                    <el-input style="width:27%" size="small" :disabled="true" v-model="form.cityName"></el-input>
                                    <span class="spangang">-</span>
                                    <el-input style="width:27%" size="small" :disabled="true" v-model="form.areaName"></el-input>
                                </el-form-item>
                                <el-form-item label="商圈:">
                                    <el-input size="small" :disabled="true" v-model="form.businessName"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <el-form ref="form" label-width="100px">
                                <el-form-item label="门店名称:">
                                    <el-input size="small" :disabled="true" v-model="form.name"></el-input>
                                </el-form-item>
                                <el-form-item label="台卡数量:">
                                    <el-input size="small" :disabled="true" v-model="form.cardNumber"></el-input>
                                </el-form-item>
                                <el-form-item label="联系人:">
                                    <el-input size="small" :disabled="true" v-model="form.owner"></el-input>
                                </el-form-item>
                                <el-form-item label="联系号码:">
                                    <el-input size="small" :disabled="true" v-model="form.phone"></el-input>
                                </el-form-item>
                                <el-form-item label="经纬度坐标:">
                                    <el-input size="small" :disabled="true" v-model="form.coordinate"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="shopuditxqbox" style="margin-top: 40px;">
            <div class="gglhtindex-top">
                证件信息 <span class="newqyzjxx">{{form.shopKind}}</span>
            </div>
            <div class="shopuditxqbom">
                <div class="fengexbox">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                营业执照
                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content bg-purple-light fengex"></div>
                        </el-col>
                    </el-row>
                </div>
                <div class="imgzlbox">
                    <el-row :gutter="60">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="sfsfzbox">
                                    <div class="sfsfzbox2">
                                        <img preview="0" :src="form.businessLicenceUrl" alt="">
                                        <!-- <img preview="0" src="../../img/banner2.jpg" alt=""> -->
                                    </div>
                                </div>
                            </div>
                            <div class="lookimg"> <i class="el-icon-zoom-in"></i> 点击图片放大</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light" style="padding-top: 50px">
                                <el-form ref="form" label-width="110px">
                                    <el-form-item label="营业执照名称:">
                                        <el-input size="small" :disabled="true" v-model="form.shopKindName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="注册号:">
                                        <el-input size="small" :disabled="true" v-model="form.registrationMark"></el-input>
                                    </el-form-item>

                                </el-form>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="fengexbox">
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                身份证信息
                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content bg-purple-light fengex"></div>
                        </el-col>
                    </el-row>
                </div>
                <div class="imgzlbox">
                    <el-row :gutter="60">
                        <el-col :span="15">
                            <div class="grid-content bg-purple">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple">
                                            <div class="scsfznewmd">
                                                <img preview="0" :src="form.idCardAUrl" alt="">
                                            </div>
                                            <div class="lookimg"> <i class="el-icon-zoom-in"></i> 点击图片放大</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple-light">
                                            <div class="scsfznewmd">
                                                <img preview="0" :src="form.idCardBUrl" alt="">
                                            </div>
                                            <div class="lookimg"> <i class="el-icon-zoom-in"></i> 点击图片放大</div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="9">
                            <div class="grid-content bg-purple-light" style="padding-top: 50px">
                                <el-form ref="form" label-width="80px">
                                    <el-form-item label="姓名:">
                                        <el-input size="small" :disabled="true" v-model="form.idCardName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="证件号码:">
                                        <el-input size="small" :disabled="true" v-model="form.idCard"></el-input>
                                    </el-form-item>

                                </el-form>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="fengexbox">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                门店图片
                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content bg-purple-light fengex"></div>
                        </el-col>
                    </el-row>
                </div>
                <div class="imgzlbox">
                    <div class="scsfznewmd2">
                        <img preview="0" :src="form.listShopPhoto" alt="">
                    </div>
                    <div class="lookimg"> <i class="el-icon-zoom-in"></i> 点击图片放大</div>

                </div>
                <div class="fengexbox">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                银行卡信息
                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div class="grid-content bg-purple-light fengex"></div>
                        </el-col>
                    </el-row>
                </div>
                <div class="imgzlbox">
                    <el-row :gutter="60">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="sfsfzbox">
                                    <div class="sfsfzbox2">
                                        <img preview="0" :src="form.cardPhotoUrl" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="lookimg"> <i class="el-icon-zoom-in"></i> 点击图片放大</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light" style="padding-top: 50px">
                                <el-form ref="form" label-width="110px">
                                    <el-form-item label="姓名:">
                                        <el-input size="small" :disabled="true" v-model="form.cardName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="银行卡号:">
                                        <el-input size="small" :disabled="true" v-model="form.bankCardNumber"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属银行:">
                                        <el-input size="small" :disabled="true" v-model="form.cardOpenBank"></el-input>
                                    </el-form-item>
                                    <el-form-item label="银行开户行:">
                                        <el-input size="small" :disabled="true" v-model="form.cardSubBank"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="shenhebut">
            <el-button type="primary" @click="open()">审核</el-button>
        </div>
        <el-dialog :title="shform.text" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
            <el-form class="shformbox" size="small" ref="form" :model="shform" label-width="80px">
                <el-form-item label="审核结果:">
                    <el-select v-model="shform.reviewStatus" placeholder="请选择审核结果">
                        <el-option label="通过" value="PASS"></el-option>
                        <el-option label="不通过" value="UNPASS"></el-option>
                    </el-select>
                </el-form-item>
                <div v-if="shform.reviewStatus=='PASS'">
                    <el-form-item label="店铺名称:">
                        <el-input v-model="shform.shopname"></el-input>
                    </el-form-item>
                    <el-form-item label="台卡数量:">
                        <el-input v-model="shform.cardnumber"></el-input>
                    </el-form-item>
                    <el-form-item label="门店类别:">
                        <el-select @change="shformlevel" v-model="shform.level" placeholder="请选择">
                            <el-option v-for="item in shform.classify" :key="item.id" :label="item.level" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div v-else-if="shform.reviewStatus=='UNPASS'">
                    <el-form-item label="失败原因:">
                        <el-input :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" type="textarea" v-model="shform.reason"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="reviewStatusfun">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { proxylowershopId, shoplevel, shopreview } from "@/api/api";

export default {
  data() {
    return {
      shopids: "", //商户ID
      dialogVisible: false, //审核弹窗
      shform: {
        cardnumber: "",
        shopname: "",
        classify: [],
        level: "",
        levelid: "",
        reviewStatus: "",
        reason: "" //失败原因
      },
      form: {
        name: "",
        shopKind: "", //商户类型
        cardtype: "智能桌面广告机",
        shopname: "", //商户名称
        address: "", //地址
        phone: "", //手机号码
        owner: "", //联系人
        cardNumber: "", //台卡数量
        industryName: "", //所属行业
        industryBusinessName: "", //所属行业
        businessName: "", //商圈,
        coordinate: "", //经纬度
        provinceName: "", //省
        cityName: "", //市
        areaName: "", //区
        businessLicenceUrl: "", //营业执照图
        registrationMark: "", //营业执照号码
        shopKindName: "", //营业执照名字
        idCardName: "", //身份证名字
        idCard: "", //身份证卡号
        idCardBUrl: "", //身份证背面
        idCardAUrl: "",
        listShopPhoto: "", //门店图片
        cardPhotoUrl: "", //银行卡图片
        cardName: "", //银行卡名字
        bankCardNumber: "", //银行卡卡号
        cardOpenBank: "", //银行开户行
        cardSubBank: "" //银行开户行
      }
    };
  },
  methods: {
    //方法
    shformlevel(value) {
      this.shform.level = value.level;
      this.shform.levelid = value.id;
    },
    reviewStatusfun() {
      //确定审核
      if (this.shform.reviewStatus == "PASS") {
        if (this.shform.levelid == "") {
          this.$message.error("请选择门店类别");
        } else {
          console.log("通过");
          let data = {
            cardNumber: this.shform.cardnumber,
            levelId: this.shform.levelid,
            level: this.shform.level,
            name: this.shform.shopname,
            reviewStatus: "PASS",
            shopId: this.shopids
          };
          shopreview(data)
            .then(r => {
              console.log(r);
              if (r.data.success == true) {
                this.$notify({
                  title: "成功",
                  message: "审核成功(审核通过)",
                  type: "success"
                });
                this.dialogVisible = false;
              } else {
                this.$notify.error({
                  title: "失败",
                  message: r.data.message.description,
                  type: "success"
                });
              }
            })
            .catch(r => {
              this.$message.error("服务器出错");
            });
        }
      } else if (this.shform.reviewStatus == "UNPASS") {
        if (this.shform.reason == "") {
          this.$message.error("请填写失败原因");
        } else {
          console.log("不通过");
          let data = {
            reason: this.shform.reason,
            reviewStatus: "UNPASS",
            shopId: this.shopids
          };
          shopreview(data)
            .then(r => {
              if (r.data.success == true) {
                this.$notify({
                  title: "成功",
                  message: "审核成功(审核不通过)",
                  type: "success"
                });
                this.dialogVisible = false;
              } else {
                this.$notify.error({
                  title: "失败",
                  message: r.data.message.description,
                  type: "success"
                });
              }
            })
            .catch(r => {
              this.$message.error("服务器出错");
            });
        }
      }
    },
    open() {
      //审核
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  mounted: function() {
    //挂载结束状态
    this.shopids = this.$route.query.id;
    proxylowershopId(this.shopids)
      .then(r => {
        console.log(r);
        let data = r.data.data;
        if (data.shopKind == "COMPANY") {
          this.form.shopKind = "企业";
        } else if (data.shopKind == "PERSONAL") {
          this.form.shopKind = "个体商户";
        }
        this.form.name = data.name; //门店名称
        this.shform.shopname = data.name; //审核弹窗商户
        this.form.address = data.address; //地址
        this.form.provinceName = data.provinceName; //
        this.form.cityName = data.cityName; //
        this.form.businessName = data.businessName; //
        this.form.owner = data.owner; //
        this.form.phone = data.phone; //
        this.form.cardNumber = data.cardNumber; //台卡数量
        this.shform.cardnumber = data.cardNumber; //审核弹窗初始化台卡
        this.form.industryName = data.industryName; //
        this.form.areaName = data.areaName; //
        this.form.industryBusinessName = data.industryBusinessName; //
        this.form.coordinate = data.latitude + " - " + data.longitude; //
        this.form.businessLicenceUrl = data.businessLicenceUrl; //
        this.form.shopKindName = data.shopKindName; //
        this.form.registrationMark = data.registrationMark; //
        this.form.idCardName = data.idCardName; //
        this.form.idCard = data.idCard; //
        this.form.listShopPhoto = data.protocolUrl;
        this.form.idCardAUrl = data.idCardAUrl;
        this.form.idCardBUrl = data.idCardBUrl;
        this.form.cardPhotoUrl = data.cardPhotoUrl;
        this.form.cardName = data.cardName; //银行卡名字
        this.form.bankCardNumber = data.bankCardNumber; //银行卡卡号
        this.form.cardOpenBank = data.cardOpenBank; //银行开户行
        this.form.cardSubBank = data.cardSubBank; //银行开户行
      })
      .catch(r => {
        this.$message.error("服务器出错");
      });
    shoplevel()
      .then(r => {
        console.log(r);
        this.shform.classify = r.data.rows;
      })
      .catch(r => {
        this.$message.error("服务器出错");
      });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.shformbox {
  padding: 30px;
  .el-select {
    width: 100%;
  }
  .el-input {
    width: 90%;
  }
  .el-textarea {
    width: 90%;
  }
}
.shopuditxq {
  .shopuditxqbox {
    width: 90%;
    margin: auto;
    min-width: 950px;
    background: #fff;
    .newqyzjxx {
      padding-left: 8px;
      padding-right: 8px;
      height: 30px;
      display: inline-block;
      text-align: center;
      line-height: 30px;
      margin-left: 20px;
      margin-top: 5px;
      border-radius: 6px;
      background-color: #00cccb;
      color: #fff;
    }
    .fengex {
      border-bottom: 1px solid #e1e6ef;
      height: 8px;
    }
    .imgzlbox {
      margin-top: 40px;
      margin-bottom: 40px;
    }
    .sfsfzbox {
      width: 350px;
      //   height: 300px;
      border: 1px dashed #999999;
      padding: 25px;
      margin: auto;
    }
    .sfsfzbox2 {
      width: 100%;
      height: 100%;
      border: 1px solid #5e5e5e;
      text-align: center;
      /* line-height: 380px; */
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .fengexbox {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .lookimg {
      font-size: 14px;
      color: #676a6c;
      margin-top: 20px;
      text-align: center;
      cursor: pointer;
    }
    .scsfznewmd {
      width: 200px;
      //   height: 150px;
      border: 1px solid #999999;
      padding: 20px;
      margin: auto;
      text-align: center;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
    .scsfznewmd2 {
      width: 65%;
      border: 1px solid #999999;
      padding: 20px;
      margin: auto;
      text-align: center;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
  }
  .gglhtindex-top {
    margin-top: 30px;
    height: 40px;
    background-color: #f6fafd;
    border-bottom: 1px solid #e1e6ef;
    padding: 0px 0px 0px 30px;
    color: #7d858c;
    line-height: 40px;
    font-size: 14px;
  }
  .shopuditxqbom {
    background: #fff;
    padding: 30px;
  }
  .el-input.is-disabled .el-input__inner {
    background: #fff;
    color: #606266;
  }
  .spangang {
    display: inline-block;
    width: 7%;
    text-align: center;
  }
  .shenhebut {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
    button {
      width: 80%;
      background: #00cccb;
      color: #fff;
      border: 1px solid #00cccb;
    }
  }
}
</style>

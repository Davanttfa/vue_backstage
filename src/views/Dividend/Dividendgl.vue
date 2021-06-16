<template>
    <div class="cdlbox shopmanage">
        <div class="topcss">
            <div class="topcss-top">
                <i class="el-icon-search"></i> 筛选查询
            </div>
            <div class="topcss-cen">
                选择月份:
                <div class="toptimecss">
                    <el-date-picker value-format="timestamp" v-model="timeinput" @change="timeinputfun(timeinput)" size="medium" type="month" placeholder="选择月">
                    </el-date-picker>
                </div>
                筛选排序:
                <div class="toptimecss">
                    <el-select clearable style="width:180px" @change="optionsetdj(setval)" size="medium" v-model="setval" placeholder="请选择">
                        <el-option v-for="item in optionset" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button class="searchbut" size="medium" type="" icon="el-icon-search" @click="search()">搜索</el-button>

            </div>
        </div>
        <div>
            <div class="listtablebox">
                <div class="ADOrdDet_head">
                    <i class="el-icon-date"></i>
                    邀请列表
                    <div class="zglht1-but lyzg2-btn" style="float: right;">
                    </div>
                </div>
                <div class="tableboxlistcss">
                    <div class="fenhongbox">
                        <div class="fenhongboxleft">
                            <span> 当月平台结算价 :{{financepricejg}}元/千次展示 商户按
                                <el-input ref="content" size="small" class="fenhongboxinput" placeholder="请输入价格" v-model="ratejg">
                                    <template slot="append">%</template>
                                </el-input>
                            </span>
                            <span>
                                结算金额(按展示千次价格)
                                <el-button size="small" type="primary" @click="orderclick()">生成订单</el-button>
                            </span>
                        </div>
                        <div class="fenhongboxright">
                            <span> 预计支出
                                <el-input :disabled="true" size="small" class="fenhongboxinput" placeholder="暂无数据" v-model="predicts">
                                    <template slot="append">¥</template>
                                </el-input>
                            </span>
                            <span>
                                <el-button size="small" type="primary" @click="savezd()">保存账单</el-button>
                            </span>
                        </div>

                    </div>
                    <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                        <el-table-column type="index" label="序号" width="50px">
                        </el-table-column>
                        <el-table-column prop="shopName" label="门店名称">
                        </el-table-column>
                        <el-table-column prop="owner" label="联系人">
                        </el-table-column>
                        <el-table-column prop="phone" label="联系电话">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                        <el-table-column prop="bindCardCount" label="已绑定台卡">
                        </el-table-column>
                        <el-table-column prop="operateUserName" label="邀请人">
                        </el-table-column>
                        <el-table-column prop="reachCount" label="达标次数">
                        </el-table-column>
                        <el-table-column prop="unReachCount" label="未达标次数">
                        </el-table-column>
                        <el-table-column prop="reachRate" label="达标率">
                        </el-table-column>
                        <el-table-column prop="baiduTotalNum" label="广告播放次数">
                        </el-table-column>
                        <el-table-column prop="thousandTimesPrice" label="千次展示价¥">
                        </el-table-column>
                        <el-table-column prop="cardOpenBank" label="开户行">
                        </el-table-column>
                        <el-table-column prop="cardSubBank" label="开户支行">
                        </el-table-column>
                        <el-table-column prop="cardNumber" label="收款账号">
                        </el-table-column>
                        <el-table-column prop="cardName" label="收款名称">
                        </el-table-column>
                        <el-table-column prop="amount" label="转账金额">
                        </el-table-column>
                        <el-table-column prop="" label="操作" width="150px" class="butcss">
                            <template slot-scope="scope">
                                <div v-if="scope.row.hasSend == null">
                                    请保存在操作
                                </div>
                                <div v-else-if="scope.row.hasSend == 'NO'">
                                    <el-button class="butmag2" @click="open2(scope.row.id)" size="small" type="primary">发送明细</el-button>
                                </div>
                                <div v-else-if="scope.row.hasSend == 'YES'">
                                    <el-button class="" type="info" size="small">已发送明细</el-button>
                                </div>
                                <div v-if="scope.row.hasTransfer == null">
                                </div>
                                <div v-else-if="scope.row.hasTransfer == 'NO'">
                                    <el-button class="butmag" @click="open1(scope.row.id)" size="small" type="primary">确认转账</el-button>
                                </div>
                                <div v-else-if="scope.row.hasTransfer == 'YES'">
                                    <el-button class="butmag3" type="info" size="small">已完成转账</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block" style="margin-top: 30px;">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNumbercs" :page-sizes="pageSizesList" :page-size="ajaxdata.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
  Dividendglfh,
  financeprice,
  predict,
  financebill,
  shopbillsend,
  shopbilltransfer
} from "@/api/api";
let moment = require("moment");

export default {
  data() {
    return {
      predicts: "", //预计支出
      financepricejg: 0, //默认价格
      optionset: [
        {
          value: "建设银行",
          label: "建设银行"
        },
        {
          value: "中国农业银行",
          label: "中国农业银行"
        },
        {
          value: "中国工商银行",
          label: "中国工商银行"
        },
        {
          value: "中国建设银行",
          label: "中国建设银行"
        },
        {
          value: "中国邮政储蓄银行",
          label: "中国邮政储蓄银行"
        },
        {
          value: "中国银行",
          label: "中国银行"
        },
        {
          value: "招商银行",
          label: "招商银行"
        },
        {
          value: "交通银行",
          label: "交通银行"
        },
        {
          value: "浦发银行",
          label: "浦发银行"
        },
        {
          value: "中国光大银行",
          label: "中国光大银行"
        },
        {
          value: "中信银行",
          label: "中信银行"
        },
        {
          value: "平安银行",
          label: "平安银行"
        },
        {
          value: "中国民生银行",
          label: "中国民生银行"
        },
        {
          value: "华夏银行",
          label: "华夏银行"
        },
        {
          value: "广发银行",
          label: "广发银行"
        },
        {
          value: "兴业银行",
          label: "兴业银行"
        },
        {
          value: "福建农村信用社农商银行",
          label: "福建农村信用社农商银行"
        },
        {
          value: "汇丰银行",
          label: "汇丰银行"
        },
        {
          value: "厦门银行",
          label: "厦门银行"
        },
        {
          value: "东亚银行",
          label: "东亚银行"
        }
      ],
      setval: "",
      pageNumbercs: 0, //初始页码
      pageSize: 10, //初始分页数量
      pageSizesList: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber: 0, //总数据
      ratejg: "",
      ajaxdata: {
        // 请求数据的申请
        proxyId: this.$store.state.user.proxyId,
        pageSize: 10,
        pageNumber: 0,
        inYear: undefined,
        inMonth: undefined,
        rate: "", //千次展示价
        cardOpenBank: undefined //开户银行
      },
      tableData3: [], //存放table数据的地方
      timeinput: undefined //时间选择查询
    };
  },
  methods: {
    orderclick() {
      //生成订单
      if (this.ratejg == "") {
        this.$message({
          showClose: true,
          message: "当月平台结算价不能为空",
          type: "error"
        });
        this.$refs.content.focus();
      } else {
        this.ajaxdata.rate = this.ratejg / 100;
        this.table();
        this.predictfun();
      }
    },
    predictfun() {
      //预计支出
      let data = {
        rate: this.ajaxdata.rate, //千次展示价
        proxyId: this.ajaxdata.proxyId,
        inYear: this.ajaxdata.inYear,
        inMonth: this.ajaxdata.inMonth
      };
      predict(data)
        .then(response => {
          console.log(response);

          this.predicts = response.data.data;
        })
        .catch(response => {
          this.$message.error("服务器出错");
        });
    },
    timeinputfun(data) {
      let then = this;
      function getMyDate(str) {
        var oDate = new Date(str),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth() + 1,
          oDay = oDate.getDate(),
          oHour = oDate.getHours(),
          oMin = oDate.getMinutes(),
          oSen = oDate.getSeconds(),
          oTime = oYear + "-" + getzf(oMonth) + "-" + getzf(oDay); //最后拼接时间
        then.ajaxdata.inYear = oYear;
        then.ajaxdata.inMonth = getzf(oMonth);
      }
      //补0操作
      function getzf(num) {
        if (parseInt(num) < 10) {
          num = "0" + num;
        }
        return num;
      }
      getMyDate(data);
    },
    optionsetdj(setval) {
      //赛选状态查询
      if (setval == "") {
        this.ajaxdata.cardOpenBank = undefined;
        this.table();
      } else {
        this.ajaxdata.cardOpenBank = setval;
        if (this.ratejg == "") {
          this.$message({
            showClose: true,
            message: "当月平台结算价不能为空",
            type: "error"
          });
          this.$refs.content.focus();
        } else {
          this.table();
        }
      }
    },
    search() {
      //搜索
      //   if (this.timeinput == undefined) {
      //     this.ajaxdata.inYear = undefined;
      //     this.ajaxdata.inMonth = undefined;
      //   }
      if (this.ratejg == "") {
        this.$message({
          showClose: true,
          message: "当月平台结算价不能为空",
          type: "error"
        });
        this.$refs.content.focus();
      } else {
        this.table();
        this.cshjg();
        this.predictfun();
      }
    },
    handleSizeChange(val) {
      //表格 条数选择
      // this.$message('这是一条消息提示');
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.ajaxdata.pageSize = val;
      this.table();
    },
    handleCurrentChange(val) {
      //表格页面点击
      console.log(`当前页: ${val}`);
      this.pageNumbercs = val;
      this.ajaxdata.pageNumber = (val - 1) * this.pageSize;
      this.table();
    },
    table() {
      //表格数据接口
      Dividendglfh(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
        })
        .catch(response => {
          this.$message.error("服务器出错");
        });
    },
    cshjg() {
      let financepricedata = {
        proxyId: this.ajaxdata.proxyId,
        inYear: this.ajaxdata.inYear,
        inMonth: this.ajaxdata.inMonth
      };
      financeprice(financepricedata)
        .then(response => {
          if (response.data.data.thousandTimesPrice != null) {
            this.financepricejg = response.data.data.thousandTimesPrice;
          } else {
            this.financepricejg = 0;
          }
        })
        .catch(response => {
          this.$message.error("服务器出错");
        });
    },
    savezd() {
      let data = {
        rate: this.ajaxdata.rate, //千次展示价
        cardOpenBank: this.ajaxdata.cardOpenBank, //开户银行
        proxyId: this.ajaxdata.proxyId,
        inYear: this.ajaxdata.inYear,
        inMonth: this.ajaxdata.inMonth
      };
      financebill(data)
        .then(response => {
          console.log(response);
          if (response.data.success == true) {
            this.$notify({
              title: "成功",
              message: "保存账单成功",
              type: "success"
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: response.data.message.description
            });
          }
        })
        .catch(response => {
          this.$message.error("服务器出错");
        });
    },
    open2(id) {
      //点击发送明细
      this.$confirm("是否确定发送明细?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          shopbillsend(id)
            .then(r => {
              console.log(r);
              if (r.data.success == true) {
                this.$notify({
                  title: "成功",
                  message: "发送明细成功",
                  type: "success"
                });
                this.table();
              } else {
                this.$notify.error({
                  title: "错误",
                  message: r.data.message.description
                });
              }
            })
            .catch(() => {
              this.$message.error("服务器出错");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发送"
          });
        });
    },
    open1(id) {
      //确认转账
      this.$confirm("是否确定转账?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          shopbilltransfer(id)
            .then(r => {
              console.log(r);
              if (r.data.success == true) {
                this.$notify({
                  title: "成功",
                  message: "转账成功",
                  type: "success"
                });
                this.table();
              } else {
                this.$notify.error({
                  title: "错误",
                  message: r.data.message.description
                });
              }
            })
            .catch(() => {
              this.$message.error("服务器出错");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消转账"
          });
        });
    }
    //方法
  },
  mounted: function() {
    //挂载结束状态
    //设置默认事件
    let nian = moment().format("YYYY");
    this.ajaxdata.inYear = nian;
    let yue = moment()
      .subtract(1, "months")
      .format("MM");
    console.log(yue);

    this.ajaxdata.inMonth = yue;
    //设置默认事件
    this.cshjg(); //初始化价格
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.shopmanage {
  color: #676a6c;
}
.MACbinding {
  padding: 10px;
}
.fenhongbox {
  margin-bottom: 40px;
  .fenhongboxinput {
    width: 180px;
    margin-left: 20px;
    margin-right: 25px;
  }
  .el-input-group__append {
    color: #ffffff;
    background: #00cccb;
  }
  .el-button--primary {
    color: #ffffff;
    background: #00cccb;
    border: 1px solid #00cccb;
    margin-left: 10px;
  }
}
.fenhongboxright {
  float: right;
}
.fenhongboxleft {
  float: left;
}
.fenhongbox::after {
  content: ".";
  clear: both;
  display: block;
  overflow: hidden;
  font-size: 0;
  height: 0;
}
.butmag {
  margin-top: 10px;
  background: #00cccb;
  border: 1px solid #00cccb;
  color: #fff;
}
.butmag3 {
  margin-top: 10px;
}
.butmag2 {
  background: #00cccb;
  color: #fff;
  border: 1px solid #00cccb;
}
</style>
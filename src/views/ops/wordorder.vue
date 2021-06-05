<template>
    <div class="cdlbox shopmanage">
        <div class="ADOrdDet_head" style="background: none;padding-left: 10px;">
            <span id="zglhtcwg1" :class="show==1?'gongdangltopbutzt':'gongdangltopbut'" @click="tab1">
                <svg-icon icon-class="user" /> 安装工单
            </span>
            <span id="zglhtcwg2" :class="show==2?'gongdangltopbutzt':'gongdangltopbut'" @click="tab2">
                <svg-icon icon-class="password" /> 维护工单
            </span>
        </div>
        <div class="topcss">
            <div class="topcss-top">
                <i class="el-icon-search"></i> 筛选查询
            </div>
            <div class="topcss-cen">
                输入搜索:
                <el-input class="topinputcss" placeholder="申请人关键词" size="medium" prefix-icon="el-icon-search" v-model="searchinput" clearable>
                </el-input>
                入驻时间:
                <div class="toptimecss">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="timeinput" size="medium" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                    </el-date-picker>
                </div>
                状态：
                <div class="toptimecss">
                    <el-select clearable style="width:120px" @change="optionsetdj(setval)" size="medium" v-model="setval" placeholder="请选择">
                        <el-option v-for="item in optionset" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button class="searchbut" size="medium" type="" icon="el-icon-search" @click="search()">搜索</el-button>

            </div>
        </div>
        <div v-if="show==1?true:false">
            <div class="listtablebox">
                <div class="ADOrdDet_head">
                    <i class="el-icon-date"></i>
                    {{gdzt}}
                    <div class="zglht1-but lyzg2-btn" style="float: right;">
                    </div>
                </div>
                <div class="tableboxlistcss">
                    <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                        <el-table-column prop="workOrderId" label="工单编号" width="50px">
                        </el-table-column>
                        <el-table-column prop="dispatchUserName" label="发起人">
                        </el-table-column>
                        <el-table-column prop="userName" label="工单负责人">
                        </el-table-column>
                        <el-table-column prop="workOrderType" label="工单类型" width="100px">
                            <template slot-scope="scope">
                                <div>
                                    安装工单
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="shopName" label="门店">
                        </el-table-column>
                        <el-table-column prop="cardNumber" label="安装数量" width="100px">
                        </el-table-column>
                        <el-table-column prop="" label="配件数量">
                            <template slot-scope="scope">
                                <div class="">
                                    充电排插 {{scope.row.chargerSocket}} , DC充电器 {{scope.row.chargerDC }} ,充电头 {{scope.row.chargerHead}} ,数据线 {{scope.row.chargerThread}} ,充电宝 {{scope.row.chargerArtifact}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createdTime" label="申请时间">
                            <template slot-scope="scope">
                                <div :data-id=scope.row.createdTime>{{ scope.row.createdTime| dateformat('YYYY-MM-DD') }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="startDate" label="维护时间" width="180px">
                            <template slot-scope="scope">
                                <div :data-id=scope.row.startDate>{{ scope.row.startDate| dateformat('YYYY-MM-DD') }} - {{ scope.row.endDate| dateformat('YYYY-MM-DD') }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="note" label="备注">
                        </el-table-column>
                        <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <div v-if="scope.row.workOrderStatus=='REVOKE'">
                                    已撤销
                                </div>
                                <div v-else-if="scope.row.workOrderStatus=='REVIEW'||scope.row.workOrderStatus=='WAIT'">
                                    <el-button size="small" @click="recall(scope.row.workOrderId)">撤回工单</el-button>
                                </div>
                                <div v-else-if="scope.row.workOrderStatus=='COMPLETE'">
                                    已完成
                                </div>
                                <div v-else-if="scope.row.workOrderStatus=='UNPASS'">
                                    审核失败
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="状态">
                            <template slot-scope="scope">
                                <div>
                                    <div v-if="scope.row.workOrderStatus=='REVOKE'">
                                        已撤销
                                    </div>
                                    <div v-else-if="scope.row.workOrderStatus=='WAIT'">
                                        进行中
                                    </div>
                                    <div v-else-if="scope.row.workOrderStatus=='COMPLETE'">
                                        已完成
                                    </div>
                                    <div v-else-if="scope.row.workOrderStatus=='UNPASS'">
                                        审核失败
                                    </div>
                                    <div v-else-if="scope.row.workOrderStatus=='REVIEW'">
                                        <el-button size="small" @click="reviewStatus(scope.row.workOrderId)">审核</el-button>
                                    </div>
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
        <div v-if="show==2?true:false" key="table2">
            <div class="listtablebox">
                <div class="ADOrdDet_head">
                    <i class="el-icon-date"></i>
                    {{gdzt}}
                    <div class="zglht1-but lyzg2-btn" style="float: right;">
                    </div>
                </div>
                <div class="tableboxlistcss">
                    <el-table ref="multipleTable" border :data="tableData2" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                        <el-table-column prop="workOrderId" label="工单编号">
                        </el-table-column>
                        <el-table-column prop="dispatchUserName" label="发起人">
                        </el-table-column>
                        <el-table-column prop="userName" label="工单负责人">
                        </el-table-column>
                        <el-table-column prop="workOrderType" label="工单类型" width="100px">
                            <template slot-scope="scope">
                                <div>
                                    运维工单
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createdTime" label="建立时间">
                            <template slot-scope="scope">
                                <div :data-id=scope.row.createdTime>{{ scope.row.createdTime| dateformat('YYYY-MM-DD') }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="startDate" label="维护时间" width="180px">
                            <template slot-scope="scope">
                                <div :data-id=scope.row.startDate>{{ scope.row.startDate| dateformat('YYYY-MM-DD') }} - {{ scope.row.endDate| dateformat('YYYY-MM-DD') }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="note" label="备注">
                        </el-table-column>
                        <el-table-column prop="" label="状态">
                            <template slot-scope="scope">
                                <div>
                                    <div v-if="scope.row.workOrderStatus=='REVOKE'">
                                        已撤销
                                    </div>
                                    <div v-else-if="scope.row.workOrderStatus=='WAIT'">
                                        进行中
                                    </div>
                                    <div v-else-if="scope.row.workOrderStatus=='COMPLETE'">
                                        已完成
                                    </div>
                                    <div v-else-if="scope.row.workOrderStatus=='UNPASS'">
                                        审核失败
                                    </div>
                                    <div v-else-if="scope.row.workOrderStatus=='REVIEW'">
                                        审核中
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <div v-if="scope.row.workOrderStatus=='REVOKE'">
                                    已撤销
                                </div>
                                <div v-else-if="scope.row.workOrderStatus=='REVIEW'||scope.row.workOrderStatus=='WAIT'">
                                    <el-button size="small" @click="recall(scope.row.workOrderId)">撤回工单</el-button>
                                </div>
                                <div v-else-if="scope.row.workOrderStatus=='COMPLETE'">
                                    <el-button size="small" @click="details(scope.row.workOrderId)">查看详情</el-button>
                                </div>
                                <div v-else-if="scope.row.workOrderStatus=='UNPASS'">
                                    审核失败
                                </div>

                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block" style="margin-top: 30px;">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNumbercs" :page-sizes="pageSizesList" :page-size="ajaxdata.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber2">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="维护详情" :visible.sync="dialogVisible" width="700px" top="200px" :before-close="handleClose">
            <div class="wordordercss">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <span class="wordspan">建立时间 :</span> {{detailsdata.createdTime| dateformat('YYYY-MM-DD') }}
                        </div>
                        <div class="grid-content bg-purple">
                            <span class="wordspan"> 工单编号 :</span> {{detailsdata.workOrderId}}
                        </div>
                        <div class="grid-content bg-purple">
                            <span class="wordspan"> 门店名称 :</span> {{detailsdata.shopName}}
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <span class="wordspan"> 发起人:</span> {{detailsdata.dispatchUserName }}
                        </div>
                        <div class="grid-content bg-purple-light">
                            <span class="wordspan"> 工单负责人: </span> {{detailsdata.userName}}
                        </div>
                        <div class="grid-content bg-purple-light">
                            <span class="wordspan"> 维护时间:</span> {{detailsdata.startDate| dateformat('YYYY-MM-DD') }} - {{detailsdata.createdTime| dateformat('YYYY-MM-DD') }}
                        </div>
                    </el-col>
                </el-row>
                <div class="" style="margin-top:30px">
                    <div class="grid-content1">
                        <span class="wordspan">损坏:</span>
                        <el-input size="small" class="wordinput" placeholder="暂无数据" v-model="detailsdata.damage" :disabled="true">
                        </el-input>
                    </div>
                    <div class="grid-content1">
                        <span class="wordspan"> 丢失:</span>
                        <el-input size="small" class="wordinput" placeholder="暂无数据" v-model="detailsdata.lose" :disabled="true">
                        </el-input>
                    </div>
                    <div class="grid-content1">
                        <span class="wordspan"> 回收:</span>
                        <el-input size="small" class="wordinput" placeholder="暂无数据" v-model="detailsdata.takeBack" :disabled="true">
                        </el-input>
                    </div>
                    <div class="grid-content1">
                        <span class="wordspan"> 配件情况:</span>
                        <el-input size="small" class="wordinput" placeholder="暂无数据" v-model="detailsdata.partsNote" :disabled="true">
                        </el-input>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
  workorderinstall,
  workordermaintain,
  recalls,
  reviewinstall,
  ordermaintain
} from "@/api/api";

export default {
  data() {
    return {
      detailsdata: {
        //查看详情数据
        createdTime: "暂无",
        startDate: "", //开始时间
        endDate: "", //结束时间
        partsNote: "", //备件情况
        workOrderId: "", //工单ID
        userName: "", //工单负责人
        shopName: "", //门店
        damage: "", //损坏
        lose: "", //丢失
        takeBack: "", //回收
        dispatchUserName: "" //发起人
      },
      gdzt: "安装工单列表",
      gongdangltopbut: "gongdangltopbut",
      show: "1",
      optionset: [
        {
          value: "ALL",
          label: "默认"
        },
        {
          value: "COMPLETE",
          label: "完成"
        },
        {
          value: "WAIT",
          label: "进行中"
        },
        {
          value: "UNPASS",
          label: "未通过"
        },
        {
          value: "REVIEW",
          label: "审核中"
        },
        {
          value: "REVOKE",
          label: "已撤销"
        }
      ],
      setval: "",
      options: [],
      shopids: "",
      pageNumbercs: 0, //初始页码
      pageSize: 10, //初始分页数量
      pageSizesList: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber: 0, //总数据
      totalDataNumber2: 0, //总数据2
      dialogVisible: false, //运维详情显示
      ajaxdata: {
        // 请求数据的申请
        proxyId: this.$store.getters.proxyId,
        pageSize: 10,
        pageNumber: 0,
        name: undefined,
        beginDate: undefined,
        endDate: undefined,
        workOrderStatus: undefined //查询状态
      },
      putdata: {
        id: undefined,
        reviewStatus: undefined,
        proxyId: this.$store.getters.proxyId,
        reviewUserId: undefined
      },
      tableData3: [], //存放table数据的地方
      tableData2: [], //存放table数据的地方
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchinput: undefined, //名字查询
      timeinput: undefined //时间选择查询
    };
  },
  methods: {
    handleClose(done) {
      //关闭详情
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    tab1() {
      //头部切换
      this.searchinput = "";
      this.timeinput = "";
      this.show = "1";
      this.gdzt = "安装工单列表";
      this.setval = "";
      this.ajaxdata = {
        // 请求数据的申请
        proxyId: this.$store.getters.proxyId,
        pageSize: 10,
        pageNumber: 0,
        name: undefined,
        beginDate: undefined,
        endDate: undefined,
        workOrderStatus: undefined //查询状态
      };
      this.pageNumbercs = 0;
      this.table();
    },
    tab2() {
      //头部切换
      this.setval = "";
      this.searchinput = "";
      this.timeinput = "";
      this.show = "2";
      this.gdzt = " 维护工单列表";
      this.ajaxdata = {
        // 请求数据的申请
        proxyId: this.$store.getters.proxyId,
        pageSize: 10,
        pageNumber: 0,
        name: undefined,
        beginDate: undefined,
        endDate: undefined,
        workOrderStatus: undefined //查询状态
      };
      this.pageNumbercs = 0;
      this.table2();
    },
    details(id) {
      ordermaintain(id)
        .then(r => {
          if (r.data.success == true) {
            console.log(r);
            this.detailsdata.dispatchUserName = r.data.data.dispatchUserName;
            this.detailsdata.userName = r.data.data.userName;
            this.detailsdata.workOrderId = r.data.data.workOrderId;
            this.detailsdata.createdTime = r.data.data.createdTime;
            this.detailsdata.lose = r.data.data.lose;
            this.detailsdata.shopName = r.data.data.shopName;
            this.detailsdata.endDate = r.data.data.endDate;
            this.detailsdata.startDate = r.data.data.startDate;
            this.detailsdata.damage = r.data.data.damage;
            this.detailsdata.takeBack = r.data.data.takeBack;
            this.detailsdata.partsNote = r.data.data.partsNote;
            this.dialogVisible = true;
          }
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    recall(id) {
      //撤销工单
      let recalldata = {
        workOrderId: id,
        proxyId: this.$store.getters.proxyId
      };
      recalls(recalldata)
        .then(r => {
          if (r.data.success == true) {
            this.$notify({
              title: "成功",
              message: "撤销工单成功",
              type: "success"
            });
            this.table();
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
    },
    reviewStatus(id) {
      //审核状态
      if (this.$store.getters.userType != "PROXY") {
        this.putdata.reviewUserId = this.$store.getters.userId;
      }
      console.log(this.$store.getters.userId);
      this.putdata.id = id;
      //审核
      this.$confirm("是否审核通过？", "审核", {
        distinguishCancelAndClose: true,
        confirmButtonText: "通过",
        cancelButtonText: "不通过"
      })
        .then(() => {
          this.putdata.reviewStatus = "PASS";
          reviewinstall(this.putdata)
            .then(r => {
              if (r.data.success == true) {
                this.$notify({
                  title: "审核成功",
                  message: "审核通过",
                  type: "success"
                });
                this.table();
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
        })
        .catch(action => {
          this.putdata.reviewStatus = "UNPASS";
          if (action === "cancel") {
            reviewinstall(this.putdata)
              .then(r => {
                if (r.data.success == true) {
                  this.$notify({
                    title: "审核成功",
                    message: "审核不通过",
                    type: "warning"
                  });
                  this.table();
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
          } else {
            this.$message({
              type: "info",
              message: "取消"
            });
          }
        });
    },
    optionsetdj(setval) {
      //赛选状态查询
      if (setval == "ALL") {
        this.ajaxdata.workOrderStatus = undefined;
        this.table();
        this.table2();
      } else {
        this.ajaxdata.workOrderStatus = setval;
        this.table2();
        this.table();
      }
    },
    urlgo(shopid) {
      //查看详情页面跳转
    },
    search() {
      //搜索
      if (this.searchinput != "" && this.searchinput != undefined) {
        this.ajaxdata.name = this.searchinput;
      } else {
        this.ajaxdata.name = undefined;
      }
      if (this.timeinput != undefined && this.searchinput != "undefined") {
        this.ajaxdata.beginDate = this.timeinput[0];
        this.ajaxdata.endDate = this.timeinput[1];
      } else {
        this.ajaxdata.beginDate = undefined;
        this.ajaxdata.endDate = undefined;
      }
      this.table();
      this.table2();
    },
    handleSizeChange(val) {
      //表格 条数选择
      // this.$message('这是一条消息提示');
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.ajaxdata.pageSize = val;
      this.table();
      this.table2();
    },
    handleCurrentChange(val) {
      //表格页面点击
      console.log(`当前页: ${val}`);
      this.pageNumbercs = val;
      this.ajaxdata.pageNumber = (val - 1) * this.pageSize;
      this.table();
      this.table2();
    },
    formatSex: function(row, column, cellValue, index) {
      if (cellValue == "PASS") {
        return "通过";
      } else if (cellValue == "REVIEW") {
        return "审核中";
      } else if (cellValue == "UNPASS") {
        return "不通过";
      }
    },
    table() {
      //表格数据接口
      workorderinstall(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
        })
        .catch(response => {
          console.log(response);
        });
    },
    table2() {
      //表格数据接口
      workordermaintain(this.ajaxdata)
        .then(response => {
          this.tableData2 = response.data.rows;
          this.totalDataNumber2 = response.data.total;
        })
        .catch(response => {
          console.log(response);
        });
    }

    //方法
  },
  mounted: function() {
    this.table();
    // this.table2()
    //挂载结束状态
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
.gongdangltopbut {
  font-size: 18px;
  font-weight: bold;
  font-family: "微软雅黑";
  color: #b7b7b7;
  display: inline-block;
  margin-left: 10px;
  margin-right: 50px;
  cursor: pointer;
  /* border-bottom: 2px solid #b7b7b7; */
}
.ADOrdDet_head {
  height: 60px;
  /* border-bottom: 1px solid #e8f2f3!important; */
  line-height: 50px;
  padding: 0px 0px 0px 0px;
  font-size: 16px;
  background: #fff;
}
.gongdangltopbutzt {
  font-size: 18px;
  font-weight: bold;
  font-family: "\5FAE\8F6F\96C5\9ED1";
  display: inline-block;
  margin-left: 10px;
  margin-right: 50px;
  cursor: pointer;
  color: #000;
}
.wordordercss {
  padding-left: 20px;
  padding-right: 20px;
  .grid-content {
    margin-bottom: 20px;
  }
  .grid-content1 {
    margin-bottom: 30px;
  }
  .wordinput {
    width: 250px;
    margin-left: 10px;
  }
  .wordspan {
    display: inline-block;
    width: 80px;
  }
}
</style>


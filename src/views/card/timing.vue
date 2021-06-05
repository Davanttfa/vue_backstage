<template>
    <div class="cdlbox timing">
        <div class="topcss">
            <div class="topcss-top">
                <i class="el-icon-search"></i> 筛选查询
            </div>
            <div class="topcss-cen">
                输入搜索:
                <el-input class="topinputcss" placeholder="输入门店关键词" size="medium" prefix-icon="el-icon-search" v-model="searchinput" clearable>
                </el-input>
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
                    <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                        <el-table-column type="index" label="序号" width="50px">
                        </el-table-column>
                        <el-table-column prop="shopName" label="门店名称">
                        </el-table-column>
                        <el-table-column prop="shopTime" label="休眠设置" :formatter="dormant">

                        </el-table-column>
                        <el-table-column prop="shopTime" label="重启设置" :formatter="restart">
                        </el-table-column>

                        <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <div>
                                    <span class="caozuo" @click="setup(scope.row.shopId)">设置</span>
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
        <el-dialog class="upyunweibox timingsz" title="定时设置" :visible.sync="dialogVisible" width="800px" top="200px" :before-close="handleClose">
            <div class="shopnamebox">
                <img src="" alt=""> 门店: <span class="shopname">{{timingsz.shopname}}</span>
            </div>
            <div class="timingtablebox">
                <el-table size="small" ref="multipleTable" border :data="tableData2" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                    <el-table-column prop="timingindex" label="定时休眠">
                    </el-table-column>
                    <el-table-column prop="bright" label="亮屏时间">
                        <template slot-scope="scope">
                            <el-time-picker format="HH:mm" value-format="HH:mm" :disabled='scope.row.zt' size="medium" v-model="scope.row.bright" placeholder="选择时间">
                            </el-time-picker>
                        </template>

                    </el-table-column>
                    <el-table-column prop="dormancy " label="休眠时间">
                        <template slot-scope="scope">
                            <el-time-picker format="HH:mm" value-format="HH:mm" :disabled='scope.row.zt' size="medium" v-model="scope.row.dormancy" placeholder="选择时间">
                            </el-time-picker>
                        </template>
                    </el-table-column>

                    <el-table-column prop="index" label="操作">
                        <template slot-scope="scope">
                            <div v-if="scope.row.up==true">
                                <span class="caozuo" @click="uptime(scope.row.index)"> <i class="el-icon-edit"></i></span>
                            </div>
                            <div v-else>
                                <el-button size="small" @click="uptime1(scope.row.index)">保存</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="timingtablebox" style="margin-top: 40px;">
                <el-table size="small" ref="multipleTable" border :data="tableData1" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                    <el-table-column prop="timingindex" label="定时重启">
                    </el-table-column>
                    <el-table-column prop="restart" label="重启时间">
                        <template slot-scope="scope">
                            <el-time-picker format="HH:mm" value-format="HH:mm" :disabled='scope.row.zt' size="medium" v-model="scope.row.restart" placeholder="选择时间">
                            </el-time-picker>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作">
                        <template slot-scope="scope">
                            <div v-if="scope.row.up==true">
                                <span class="caozuo" @click="uptime2(scope.row.index)"> <i class="el-icon-edit"></i></span>
                            </div>
                            <div v-else>
                                <el-button size="small" @click="uptime3(scope.row.index)">保存</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { timingajax, timeshez, timecq } from "@/api/api";
export default {
  data() {
    return {
      dialogVisible: false, //弹窗显示开关
      shopids: "",
      pageNumbercs: 0, //初始页码
      pageSize: 10, //初始分页数量
      pageSizesList: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber: 0, //总数据
      ajaxdata: {
        // 请求数据的申请
        proxyId: this.$store.state.user.proxyId,
        pageSize: 10,
        pageNumber: 0,
        name: undefined
      },
      tableData3: [], //存放table数据的地方
      tableData2: [
        {
          index: 0,
          timingindex: "任务1",
          bright: "",
          dormancy: "",
          zt: true,
          up: true
        },
        {
          index: 1,
          timingindex: "任务2",
          bright: "",
          dormancy: "",
          zt: true,
          up: true
        },
        {
          index: 2,
          timingindex: "任务3",
          bright: "",
          dormancy: "",
          zt: true,
          up: true
        }
      ],
      tableData1: [
        {
          index: 0,
          timingindex: "任务1",
          restart: "",
          zt: true,
          up: true
        },
        {
          index: 1,
          timingindex: "任务2",
          restart: "",
          zt: true,
          up: true
        },
        {
          index: 2,
          timingindex: "任务3",
          restart: "",
          zt: true,
          up: true
        }
      ],
      searchinput: undefined, //名字查询
      timingsz: {
        //设置弹窗数据
        shopname: "猪猪侠"
      }
    };
  },
  methods: {
    handleClose(done) {
      //关闭弹窗
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    optionsetdj(setval) {
      //赛选状态查询
      if (setval == "ALL") {
        this.ajaxdata.reviewStatus = undefined;
        this.table();
      } else {
        this.ajaxdata.reviewStatus = setval;
        this.table();
      }
    },
    setup(shopid) {
      //设置
      for (var i = 0; i < this.tableData1.length; i++) {
        this.tableData1[i].restart = "";
        this.tableData2[i].bright = "";
        this.tableData2[i].dormancy = "";
      }

      const self = this;
      timeshez(shopid)
        .then(response => {
          console.log(response);
          response.data.data.shopTime.forEach(function(e, i) {
            if (e.type == "RESTART") {
              //重启
              if (e.orderId == "1") {
                self.tableData1[0].restart = e.openTime;
              } else if (e.orderId == "2") {
                self.tableData1[1].restart = e.openTime;
              } else if (e.orderId == "3") {
                self.tableData1[2].restart = e.openTime;
              }
            } else if (e.type == "SCREEN") {
              //休眠
              if (e.orderId == "1") {
                self.tableData2[0].bright = e.openTime;
                self.tableData2[0].dormancy = e.closeTime;
              } else if (e.orderId == "2") {
                self.tableData2[1].bright = e.openTime;
                self.tableData2[1].dormancy = e.closeTime;
              } else if (e.orderId == "3") {
                self.tableData2[2].bright = e.openTime;
                self.tableData2[2].dormancy = e.closeTime;
              }
            }
          });
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
      this.dialogVisible = true;
      this.shopids = shopid;
    },
    uptime(id) {
      console.log(id);
      this.tableData2[id].zt = false;
      this.tableData2[id].up = false;
    },
    uptime1(id) {
      this.tableData2[id].zt = true;
      this.tableData2[id].up = true;
      let data = {
        shopId: this.shopids,
        openTime: this.tableData2[id].bright,
        closeTime: this.tableData2[id].dormancy,
        orderId: id + 1,
        shopTimeType: "SCREEN"
      };
      timecq(data)
        .then(r => {
          if (r.data.success == true) {
            this.$notify({
              title: "成功",
              message: "休眠定时设置成功",
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
    uptime2(id) {
      console.log(id);
      this.tableData1[id].zt = false;
      this.tableData1[id].up = false;
    },
    uptime3(id) {
      this.tableData1[id].zt = true;
      this.tableData1[id].up = true;
      let data = {
        shopId: this.shopids,
        openTime: this.tableData1[id].restart,
        orderId: id + 1,
        shopTimeType: "RESTART"
      };
      timecq(data)
        .then(r => {
          if (r.data.success == true) {
            this.$notify({
              title: "成功",
              message: "重启定时设置成功",
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
    search() {
      //搜索
      if (this.searchinput != "" && this.searchinput != undefined) {
        this.ajaxdata.name = this.searchinput;
      } else {
        this.ajaxdata.name = undefined;
      }
      this.table();
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
    restart: function(row, column, cellValue, index) {
      //重启
      var vals = "";
      cellValue.forEach(function(e, i) {
        if (e.type == "RESTART") {
          vals += e.openTime + " /  ";
        }
      });
      let sl = vals.split("/").length - 1;

      if (sl <= 1) {
        vals = vals.replace("/", "");
      }
      return vals;
    },
    dormant: function(row, column, cellValue, index) {
      //休眠
      var val = "";
      cellValue.forEach(function(e, i) {
        if (e.openTime == null) {
          e.openTime = "";
        }
        if (e.closeTime == null) {
          e.closeTime = "";
        }
        if (e.type == "SCREEN") {
          if (cellValue.length > 1) {
            val += e.openTime + "-" + e.closeTime + " / ";
          } else {
            val += e.openTime + "-" + e.closeTime;
          }
        }
      });
      return val;
    },
    table() {
      //表格数据接口
      timingajax(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    }
    //方法
  },
  mounted: function() {
    this.table();
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
.timing {
  .upyunweibox {
    .el-dialog__header {
      text-align: center;
      background: #a6e0d6;
      font-size: 16px;
    }
    .el-dialog__close {
      color: #fff;
    }
    .shopnamebox {
      font-size: 18px;
    }
    .shopname {
      font-size: 18px;
      font-weight: bold;
    }
    .timingtablebox {
      margin-bottom: 20px;
      margin-top: 20px;
    }
    .caozuo {
      font-size: 16px;
    }
    .el-date-editor {
      width: 120px;
      text-align: center;
    }
  }
  .el-input.is-disabled .el-input__inner {
    text-align: center;
  }
}
.el-time-spinner__item {
  line-height: 20px;
}
</style>


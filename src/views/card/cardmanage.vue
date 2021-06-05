<template>
    <div class="cdlbox shopmanage">
        <div class="topcss">
            <div class="topcss-top">
                <i class="el-icon-search"></i> 筛选查询
            </div>
            <div class="topcss-cen">
                输入搜索:
                <el-input class="topinputcss" placeholder="输入门店关键词" size="medium" prefix-icon="el-icon-search" v-model="searchinput" clearable>
                </el-input>
                入驻时间:
                <div class="toptimecss">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="timeinput" size="medium" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                    </el-date-picker>
                </div>
                台卡状态：
                <div class="toptimecss">
                    <el-select clearable style="width:120px" @change="optionsetdj(setval)" size="medium" v-model="setval" placeholder="请选择">
                        <el-option v-for="item in optionset" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                负责人
                <div class="toptimecss">
                    <el-select clearable style="width:120px" @change="optionsetdj1(setval1)" size="medium" v-model="setval1" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.id" :label="item.option" :value="item.id">
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
                    <div class="zglht1-but lyzg2-btn" style="float: right; margin-top: 5px;">
                        <el-button type="primary" size="small" @click="exportExcel">导出当前页报表</el-button>
                        <el-button type="primary" size="small" @click="restart(cardidss)">当前页批量重启</el-button>

                    </div>
                </div>
                <div class="tableboxlistcss">
                    <el-table id="table" ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                        <el-table-column type="index" label="序号" width="50px">
                        </el-table-column>
                        <el-table-column prop="cardId" label="台卡ID" width="80px">
                        </el-table-column>
                        <el-table-column prop="shopName" label="所属门店">
                        </el-table-column>
                        <el-table-column prop="principalName" label="负责人">
                        </el-table-column>
                        <el-table-column prop="bindTime" label="绑定时间">
                            <template slot-scope="scope">
                                <div :data-id=scope.row.enterTime>{{ scope.row.bindTime| dateformat('YYYY-MM-DD') }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="storageTime" label="入库时间">
                            <template slot-scope="scope">
                                <div :data-id=scope.row.enterTime>{{ scope.row.storageTime| dateformat('YYYY-MM-DD') }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="macAddress" label="MAC地址">
                        </el-table-column>
                        <el-table-column prop="cardNumber" label="桌号" width="80px">
                        </el-table-column>
                        <el-table-column prop="cardStatus" label="台卡状态">
                            <template slot-scope="scope">
                                <div v-if="scope.row.cardStatus=='OFF'">
                                    离线
                                </div>
                                <div v-else>
                                    在线
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="关机/重启" width="180px">
                            <template slot-scope="scope">
                                <div>
                                    <el-button type="primary" size="small" plain @click="restart(scope.row.cardId)">重启</el-button>
                                    <el-button type="danger" size="small" plain @click="shutdown(scope.row.cardId)">关机</el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <div>
                                    <span class="caozuo" @click="urlgo(scope.row.cardId)">查看广告</span>
                                </div>
                            </template>
                        </el-table-column> -->
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
import { cardlist, userlist, cardshutdown, cardrestart } from "@/api/api";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      optionset: [
        {
          value: "ALL",
          label: "默认"
        },
        {
          value: "ON",
          label: "在线"
        },
        {
          value: "OFF",
          label: "离线"
        }
      ],
      cardidss: "", //批量重启台卡ID
      setval: "", //赛选在线离线下拉
      setval1: "", //负责人下拉
      options: [],
      principalId: "", //负责人
      pageNumbercs: 0, //初始页码
      pageSize: 10, //初始分页数量
      pageSizesList: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber: 0, //总数据
      ajaxdata: {
        // 请求数据的申请
        proxyId: this.$store.state.user.proxyId,
        pageSize: 10,
        pageNumber: 0,
        name: undefined,
        beginDate: undefined,
        endDate: undefined,
        cardStatus: undefined, //查询状态
        principalId: undefined //负责人ID
      },
      tableData3: [], //存放table数据的地方
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
    exportExcel() {
      //到处exportExcel
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector("#table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "台卡管理报表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    shutdown(id) {
      //关机
      this.$confirm("此操作将关闭当前台卡, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          cardshutdown(id)
            .then(r => {
              if (r.data.success == true) {
                this.$notify({
                  title: "成功",
                  message: "关闭台卡成功",
                  type: "success"
                });
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
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关机"
          });
        });
    },
    restart(id) {
      //重启
      this.$confirm("此操作将重启当前台卡, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          cardrestart(id)
            .then(r => {
              if (r.data.success == true) {
                this.$notify({
                  title: "成功",
                  message: "重启台卡成功",
                  type: "success"
                });
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
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重启"
          });
        });
    },
    optionsetdj(setval) {
      //赛选状态查询
      if (setval == "ALL") {
        this.ajaxdata.cardStatus = undefined;
        this.table();
      } else {
        this.ajaxdata.cardStatus = setval;
        this.table();
      }
    },
    optionsetdj1(setval1) {
      if (setval1 == "ALL") {
        this.ajaxdata.principalId = undefined;
        this.table();
      } else {
        this.ajaxdata.principalId = setval1;
        this.table();
      }
    },
    urlgo(cardId) {
      //查看详情页面跳转
      this.$router.push("/card/carddetails?id=" + cardId);
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
      cardlist(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
          for (var value of response.data.rows) {
            this.cardidss += value.cardId + ",";
          }
          this.cardidss = this.cardidss.substr(0, this.cardidss.length - 1);
          console.log(this.cardidss);
        })
        .catch(response => {
          console.log(response);
        });
    }
    //方法
  },
  mounted: function() {
    //挂载结束状态
    this.table();
    userlist(this.ajaxdata.proxyId)
      .then(response => {
        this.options = response.data.rows;
      })
      .catch(r => {
        this.$message.error("服务器出错");
      });
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
</style>
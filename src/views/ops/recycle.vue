<template>
    <div class="cdlbox shopmanage">
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
                审核状态：
                <div class="toptimecss">
                    <el-select clearable style="width:120px" @change="optionsetdj(setval)" size="medium" v-model="setval" placeholder="请选择">
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
                    <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                        <el-table-column type="index" label="序号" width="50px">
                        </el-table-column>
                        <el-table-column prop="macAddress" label="MAC地址">
                        </el-table-column>
                        <el-table-column prop="userName" label="申请人">
                        </el-table-column>
                        <el-table-column prop="shopName" label="所属门店">
                        </el-table-column>
                        <el-table-column prop="createTime" label="申请时间">
                            <template slot-scope="scope">
                                <div :data-id=scope.row.enterTime>{{ scope.row.enterTime| dateformat('YYYY-MM-DD') }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <div v-if="scope.row.reviewStatus=='UNPASS'">
                                    <span class="caozuo2">未通过</span>
                                </div>
                                <div v-else-if="scope.row.reviewStatus=='PASS'">
                                    <span class="caozuo1">已通过</span>
                                </div>
                                <div v-else-if="scope.row.reviewStatus=='REVIEW'">
                                    <el-button size="small" @click="reviewStatus(scope.row.id)">审核</el-button>
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
import { recycle, recyclesh } from "@/api/api";
export default {
  data() {
    return {
      optionset: [
        {
          value: "ALL",
          label: "默认"
        },
        {
          value: "REVIEW",
          label: "申请中"
        },
        {
          value: "PASS",
          label: "通过"
        },
        {
          value: "UNPASS",
          label: "未通过"
        }
      ],
      setval: "",
      options: [],
      shopids: "",
      pageNumbercs: 0, //初始页码
      pageSize: 10, //初始分页数量
      pageSizesList: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber: 0, //总数据
      ajaxdata: {
        // 请求数据的申请
        proxyId: this.$store.getters.proxyId,
        pageSize: 10,
        pageNumber: 0,
        reviewStatus: "PASS",
        name: undefined,
        beginDate: undefined,
        endDate: undefined,
        reviewStatus: undefined //查询状态
      },
      putdata: {
        id: undefined,
        reviewStatus: undefined,
        proxyId: this.$store.getters.proxyId,
        reviewUserId: undefined
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
    reviewStatus(id) {
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
          recyclesh(this.putdata)
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
            recyclesh(this.putdata)
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
        this.ajaxdata.reviewStatus = undefined;
        this.table();
      } else {
        this.ajaxdata.reviewStatus = setval;
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
      recycle(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
        })
        .catch(response => {
          console.log(response);
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
</style>

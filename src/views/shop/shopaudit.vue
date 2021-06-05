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
                        <el-table-column prop="name" label="归属商户">
                        </el-table-column>
                        <el-table-column prop="shopName" label="门店名称">
                        </el-table-column>
                        <el-table-column prop="cardType" label="广告机类型">
                            <template slot-scope="scope">
                                <div>桌面智能广告机</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cardNumber" label="台卡数量">
                        </el-table-column>
                        <el-table-column prop="enterTime" label="申请时间">
                            <template slot-scope="scope">
                                <div :data-id=scope.row.enterTime>{{ scope.row.enterTime| dateformat('YYYY-MM-DD') }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="门店地址">
                        </el-table-column>
                        <el-table-column prop="proxyName" label="代理商">
                        </el-table-column>
                        <el-table-column prop="contact" label="联系人">
                        </el-table-column>
                        <el-table-column prop="phone" label="联系人手机">
                        </el-table-column>
                        <el-table-column class="reviewStatus" prop="reviewStatus" label="状态" :formatter="formatSex">

                        </el-table-column>
                        <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <div>
                                    <span class="caozuo" @click="urlgo(scope.row.shopId)">查看详情</span>
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
import { userlist, userbj, cardbd, carbdck, shopaudit } from "@/api/api";
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
          label: "审核中"
        },
        {
          value: "PASS",
          label: "通过"
        },
        {
          value: "UNPASS",
          label: "不通过"
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
        proxyId: this.$store.state.user.proxyId,
        pageSize: 10,
        pageNumber: 0,
        name: undefined,
        beginDate: undefined,
        endDate: undefined,
        reviewStatus: undefined //查询状态
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
      shopaudit(this.ajaxdata)
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
</style>

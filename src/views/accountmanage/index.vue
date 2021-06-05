<template>
    <div class="cdlbox shopmanage">
        <div class="topcss">
            <div class="topcss-top">
                <i class="el-icon-search"></i> 筛选查询
            </div>
            <div class="topcss-cen">
                选择月份:
                <div class="toptimecss">
                    <el-date-picker value-format="yyyy-MM" v-model="timeinput" size="medium" type="month" placeholder="选择月">
                    </el-date-picker>
                </div>
                筛选排序:
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
                        <el-table-column prop="nickname" label="业务员">
                        </el-table-column>
                        <el-table-column prop="shopCount" label="本月邀请门店">
                        </el-table-column>
                        <el-table-column prop="shopCardCount" label="申请台卡总数">
                        </el-table-column>
                        <el-table-column prop="passCount" label="通过审核门店">
                        </el-table-column>
                        <el-table-column prop="reviewCount" label="未审核门店">
                        </el-table-column>
                        <el-table-column prop="unpassCount" label="审核失败门店">
                        </el-table-column>
                        <el-table-column prop="shopAverageCount" label="平均每天邀请门店">
                        </el-table-column>
                        <el-table-column prop="completeCardNumber" label="已铺设台卡">
                        </el-table-column>
                        <el-table-column prop="uncompleteCardNumber" label="未铺设台卡">
                        </el-table-column>
                        <el-table-column prop="completeInstallCount" label="完成安装工单">
                        </el-table-column>
                        <el-table-column prop="completeCardNumber" label="已铺设台卡">
                        </el-table-column>
                        <el-table-column prop="completeMaintainCount" label="完成维护工单">
                        </el-table-column>
                        <el-table-column prop="uncompleteCardNumber" label="未完成安装工单">
                        </el-table-column>
                        <el-table-column prop="uncompleteMaintainCount" label="未完成维护工单">
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
import { accountmanage } from "@/api/api";
export default {
  data() {
    return {
      optionset: [
        {
          value: "ALL",
          label: "默认"
        },
        {
          value: "PASS_COUNT",
          label: "按通过审核数量"
        },
        {
          value: "COMPLETE_CARD_NUMBER",
          label: "按完成台卡绑定数量"
        },
        {
          value: "COMPLETE_INSTALL_COUNT",
          label: "按完成安装工单数量"
        },
        {
          value: "COMPLETE_MAINTAIN_COUNT",
          label: "按完成维护工单数量"
        },
        {
          value: "SHOP_COUNT",
          label: "按邀请门店数量排序"
        },
        {
          value: "SHOP_AVERAGE_COUNT",
          label: "按平均每天邀请数量(门店)"
        }
      ],
      setval: "",
      pageNumbercs: 0, //初始页码
      pageSize: 10, //初始分页数量
      pageSizesList: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber: 0, //总数据
      ajaxdata: {
        // 请求数据的申请
        proxyId: this.$store.state.user.proxyId,
        pageSize: 10,
        pageNumber: 0,
        operateUserOderRule: undefined, //下拉赛选
        date: undefined //时间赛选
      },
      tableData3: [], //存放table数据的地方
      timeinput: undefined //时间选择查询
    };
  },
  methods: {
    optionsetdj(setval) {
      //赛选状态查询
      if (setval == "ALL") {
        this.ajaxdata.operateUserOderRule = undefined;
        this.table();
      } else {
        this.ajaxdata.operateUserOderRule = setval;
        this.table();
      }
    },
    search() {
      //搜索
      if (this.timeinput != undefined && this.searchinput != "undefined") {
        this.ajaxdata.date = this.timeinput;
      } else {
        this.ajaxdata.date = undefined;
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
    table() {
      //表格数据接口
      accountmanage(this.ajaxdata)
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

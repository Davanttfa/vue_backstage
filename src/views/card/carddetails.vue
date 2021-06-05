<template>
    <div class="cdlbox shopmanage">
        <div>
            <div class="listtablebox">
                <div class="ADOrdDet_head">
                    <i class="el-icon-date"></i>
                    查看广告
                    <div class="zglht1-but lyzg2-btn" style="float: right;">
                    </div>
                </div>
                <div class="tableboxlistcss">
                    <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                        <el-table-column type="index" label="序号" width="50px">
                        </el-table-column>
                        <el-table-column prop="name" label="用户">
                        </el-table-column>
                        <el-table-column prop="name" label="商户类型">
                        </el-table-column>
                        <el-table-column prop="shopName" label="门店名称">
                        </el-table-column>
                        <el-table-column prop="principalName" label="门店负责人">
                            <template slot-scope="scope">
                                <div class="">{{scope.row.principalName}}</div>
                                <el-button class="buttonxl" size="mini" @click="redact(scope.row.shopId)">编辑</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cardNumber" label="台卡数量">
                        </el-table-column>
                        <el-table-column prop="enterTime" label="入驻时间">
                            <template slot-scope="scope">
                                <div :data-id=scope.row.enterTime>{{ scope.row.enterTime| dateformat('YYYY-MM-DD') }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="门店地址">
                        </el-table-column>
                        <el-table-column prop="contact" label="联系人">
                        </el-table-column>
                        <el-table-column prop="operateUserName" label="业务员">
                        </el-table-column>
                        <el-table-column prop="phone" label="联系人手机">
                        </el-table-column>
                        <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <div>
                                    <span class="caozuo" @click="shopurlClick(scope.row.shopId,scope.row.name,scope.row.shopName)">绑定台卡</span>
                                    <span class="caozuo" style="margin-left: 5px;">查看</span>
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
import { shopindextable, userlist, userbj, cardbd, carbdck } from "@/api/api";
export default {
  data() {
    return {
      cards: "", //url台卡ID
      pageNumbercs: 0, //初始页码
      pageSize: 10, //初始分页数量
      pageSizesList: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber: 0, //总数据
      ajaxdata: {
        // 请求数据的申请
        proxyId: this.$store.state.user.proxyId,
        pageSize: 10,
        pageNumber: 0,
        reviewStatus: "PASS",
        name: undefined,
        beginDate: undefined,
        endDate: undefined
      },
      tableData3: [] //存放table数据的地方
    };
  },
  methods: {
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
      shopindextable(this.ajaxdata)
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
    this.cards = this.$route.query.id; //url台卡ID
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
